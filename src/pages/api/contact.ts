import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

type ContactPayload = {
	name: string;
	email: string;
	message: string;
	website?: string;
	subjectTag?: string;
	locale: 'es' | 'en';
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
		locale: asString(raw.locale) === 'en' ? 'en' : 'es',
	};
}

function message(locale: 'es' | 'en', es: string, en: string): string { return locale === 'en' ? en : es; }

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

type DeliveryResult = 'delivered' | 'not-configured' | 'failed';

async function sendEmail(payload: ContactPayload): Promise<DeliveryResult> {
	const host = process.env.SMTP_HOST;
	const port = Number(process.env.SMTP_PORT ?? '587');
	const user = process.env.SMTP_USER;
	const pass = process.env.SMTP_PASS;
	const to = process.env.CONTACT_TO;
	const from = process.env.CONTACT_FROM ?? to;
	if (!host || !to || !from) return 'not-configured';

	const transporter = nodemailer.createTransport({
		host,
		port,
		secure: port === 465,
		auth: user && pass ? { user, pass } : undefined,
	});

	const tag = payload.subjectTag ? `[${payload.subjectTag}] ` : '';
	const subject = `${tag}${payload.locale === 'en' ? 'New message from the portfolio' : 'Nuevo mensaje desde el portfolio'}`;
	const text = [
		`${payload.locale === 'en' ? 'Name' : 'Nombre'}: ${payload.name}`,
		`Email: ${payload.email}`,
		'',
		payload.message,
	].join('\n');

	try {
		await transporter.sendMail({
			to,
			from,
			replyTo: payload.email,
			subject,
			text,
		});
	} catch {
		return 'failed';
	}

	return 'delivered';
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
	if (raw.locale && raw.locale !== 'es' && raw.locale !== 'en') {
		return new Response(JSON.stringify({ ok: false, message: 'Unsupported locale.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
	}
	const payload = normalizePayload(raw);

	if (payload.website) {
		return new Response(JSON.stringify({ ok: false, delivered: false, message: message(payload.locale, 'No se pudo enviar el mensaje.', 'The message could not be sent.') }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	if (payload.name.length < 2) {
		return new Response(JSON.stringify({ ok: false, message: message(payload.locale, 'Ingresa un nombre válido.', 'Please enter a valid name.') }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	if (!isValidEmail(payload.email)) {
		return new Response(JSON.stringify({ ok: false, message: message(payload.locale, 'Ingresa un email válido.', 'Please enter a valid email.') }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	if (payload.message.length < 10) {
		return new Response(JSON.stringify({ ok: false, message: message(payload.locale, 'El mensaje debe tener al menos 10 caracteres.', 'Message must be at least 10 characters long.') }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	const delivery = await sendEmail(payload);
	if (delivery !== 'delivered') {
		return new Response(JSON.stringify({
			ok: false,
			delivered: false,
			message: message(
				payload.locale,
				delivery === 'not-configured'
					? 'El formulario de contacto no está configurado para recibir mensajes.'
					: 'No se pudo entregar el mensaje. Intenta nuevamente más tarde.',
				delivery === 'not-configured'
					? 'The contact form is not configured to receive messages.'
					: 'The message could not be delivered. Please try again later.',
			),
		}), {
			status: 503,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	return new Response(JSON.stringify({ ok: true, delivered: true }), {
		status: 200,
		headers: { 'Content-Type': 'application/json' },
	});
};
