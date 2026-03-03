import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

type ContactPayload = {
	name: string;
	email: string;
	message: string;
	website?: string;
	subjectTag?: string;
};

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimit = new Map<string, { count: number; resetAt: number }>();

function asString(value: unknown): string {
	if (typeof value === 'string') return value;
	if (value == null) return '';
	return String(value);
}

function normalizePayload(raw: Record<string, unknown>): ContactPayload {
	return {
		name: asString(raw.name).trim(),
		email: asString(raw.email).trim(),
		message: asString(raw.message).trim(),
		website: asString(raw.website).trim(),
		subjectTag: asString(raw.subjectTag).trim(),
	};
}

function isValidEmail(email: string): boolean {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function rateLimitCheck(key: string): boolean {
	const now = Date.now();
	const current = rateLimit.get(key);
	if (!current || current.resetAt <= now) {
		rateLimit.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
		return true;
	}
	if (current.count >= RATE_LIMIT_MAX) return false;
	current.count += 1;
	return true;
}

async function parseBody(request: Request): Promise<Record<string, unknown>> {
	const contentType = request.headers.get('content-type') ?? '';
	if (contentType.includes('application/json')) {
		const json = (await request.json().catch(() => ({}))) as unknown;
		if (json && typeof json === 'object') return json as Record<string, unknown>;
		return {};
	}
	if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
		const form = await request.formData();
		return Object.fromEntries(form.entries()) as Record<string, unknown>;
	}
	return {};
}

async function sendEmail(payload: ContactPayload): Promise<boolean> {
	const host = process.env.SMTP_HOST;
	const port = Number(process.env.SMTP_PORT ?? '587');
	const user = process.env.SMTP_USER;
	const pass = process.env.SMTP_PASS;
	const to = process.env.CONTACT_TO;
	const from = process.env.CONTACT_FROM ?? to;
	if (!host || !to || !from) return false;

	const transporter = nodemailer.createTransport({
		host,
		port,
		secure: port === 465,
		auth: user && pass ? { user, pass } : undefined,
	});

	const tag = payload.subjectTag ? `[${payload.subjectTag}] ` : '';
	const subject = `${tag}Nuevo mensaje desde el portfolio`;
	const text = [
		`Nombre: ${payload.name}`,
		`Email: ${payload.email}`,
		'',
		payload.message,
	].join('\n');

	await transporter.sendMail({
		to,
		from,
		replyTo: payload.email,
		subject,
		text,
	});

	return true;
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
	const key = clientAddress ?? 'unknown';
	if (!rateLimitCheck(key)) {
		return new Response(JSON.stringify({ ok: false, message: 'Demasiados intentos. Intenta más tarde.' }), {
			status: 429,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	const raw = await parseBody(request);
	const payload = normalizePayload(raw);

	if (payload.website) {
		return new Response(JSON.stringify({ ok: true, delivered: false }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	if (payload.name.length < 2) {
		return new Response(JSON.stringify({ ok: false, message: 'Ingresa un nombre válido.' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	if (!isValidEmail(payload.email)) {
		return new Response(JSON.stringify({ ok: false, message: 'Ingresa un email válido.' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	if (payload.message.length < 10) {
		return new Response(JSON.stringify({ ok: false, message: 'El mensaje debe tener al menos 10 caracteres.' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	const delivered = await sendEmail(payload).catch(() => false);

	return new Response(JSON.stringify({ ok: true, delivered }), {
		status: 200,
		headers: { 'Content-Type': 'application/json' },
	});
};

