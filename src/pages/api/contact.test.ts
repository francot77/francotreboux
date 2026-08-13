import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { POST } from './contact';

const { sendMail } = vi.hoisted(() => ({ sendMail: vi.fn().mockResolvedValue({}) }));
vi.mock('nodemailer', () => ({
	default: { createTransport: vi.fn(() => ({ sendMail })) },
}));

const valid = { name: 'Ada Lovelace', email: 'ada@example.com', message: 'A message with enough length', website: '', subjectTag: 'test' };

function request(body: unknown, origin = 'https://francotreboux.vercel.app') {
	const request = new Request('http://localhost/api/contact', {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify(body),
	});
	const getHeader = request.headers.get.bind(request.headers);
	vi.spyOn(request.headers, 'get').mockImplementation((name) => name.toLowerCase() === 'origin' ? origin : getHeader(name));
	return request;
}

afterEach(() => {
	vi.unstubAllEnvs();
	sendMail.mockClear();
});

	describe('contact API localization contract', () => {
		beforeEach(() => {
			vi.stubEnv('NODE_ENV', 'test');
		});

		it('accepts the local development origin', async () => {
			vi.stubEnv('VERCEL_URL', 'http://localhost');
			const response = await POST({ request: request({ ...valid, locale: 'en' }, 'http://localhost'), clientAddress: 'api-test-origin-local' } as never);
			expect(response.status).toBe(503);
		});

		it('accepts the configured production site origin', async () => {
			const response = await POST({ request: request({ ...valid, locale: 'en' }, 'https://francotreboux.vercel.app'), clientAddress: 'api-test-origin-production' } as never);
			expect(response.status).toBe(503);
		});

		it('rejects an untrusted origin before parsing or delivery', async () => {
			const response = await POST({ request: request({ ...valid, locale: 'en' }, 'https://attacker.example'), clientAddress: 'api-test-origin-rejected' } as never);
			expect(response.status).toBe(403);
			expect(await response.json()).toEqual({ ok: false, message: 'Forbidden origin.' });
			expect(sendMail).not.toHaveBeenCalled();
		});

		it('rejects requests without an origin', async () => {
			const noOriginRequest = new Request('http://localhost/api/contact', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ ...valid, locale: 'en' }),
			});
			const response = await POST({
				request: noOriginRequest,
				clientAddress: 'api-test-origin-missing',
			} as never);
			expect(response.status).toBe(403);
			expect(sendMail).not.toHaveBeenCalled();
		});

		it('reports a localized configuration error when SMTP is unavailable', async () => {
			const response = await POST({ request: request({ ...valid, locale: 'en' }), clientAddress: 'api-test-en' } as never);
		expect(response.status).toBe(503);
		expect(await response.json()).toEqual({ ok: false, delivered: false, message: 'The contact form is not configured to receive messages.' });
		expect(sendMail).not.toHaveBeenCalled();
	});

	it('reports delivery failures without exposing provider details', async () => {
		vi.stubEnv('SMTP_HOST', 'smtp.example.com');
		vi.stubEnv('CONTACT_TO', 'owner@example.com');
		vi.stubEnv('CONTACT_FROM', 'portfolio@example.com');
		sendMail.mockRejectedValueOnce(new Error('private SMTP credentials or provider details'));

			const response = await POST({ request: request({ ...valid, locale: 'es' }), clientAddress: 'api-test-smtp-failure' } as never);
		expect(response.status).toBe(503);
		expect(await response.json()).toEqual({ ok: false, delivered: false, message: 'No se pudo entregar el mensaje. Intenta nuevamente más tarde.' });
	});

	it('confirms delivery only after SMTP accepts the message', async () => {
		vi.stubEnv('SMTP_HOST', 'smtp.example.com');
		vi.stubEnv('CONTACT_TO', 'owner@example.com');
		vi.stubEnv('CONTACT_FROM', 'portfolio@example.com');

			const response = await POST({ request: request({ ...valid, locale: 'en' }), clientAddress: 'api-test-success' } as never);
		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({ ok: true, delivered: true });
	});

	it('rejects unsupported locales before validation', async () => {
			const response = await POST({ request: request({ ...valid, locale: 'fr' }), clientAddress: 'api-test-fr' } as never);
		expect(response.status).toBe(400);
		expect((await response.json()).message).toBe('Unsupported locale.');
	});

	it('localizes validation feedback for English', async () => {
			const response = await POST({ request: request({ ...valid, locale: 'en', name: 'A' }), clientAddress: 'api-test-validation' } as never);
		expect(response.status).toBe(400);
		expect((await response.json()).message).toBe('Please enter a valid name.');
	});

	it('accepts form submissions with omitted locale using the Spanish default', async () => {
		const body = new URLSearchParams(valid);
		const formRequest = new Request('http://localhost/api/contact', { method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body });
		const getHeader = formRequest.headers.get.bind(formRequest.headers);
		vi.spyOn(formRequest.headers, 'get').mockImplementation((name) => name.toLowerCase() === 'origin' ? 'https://francotreboux.vercel.app' : getHeader(name));
		const response = await POST({ request: formRequest, clientAddress: 'api-test-form-default' } as never);
		expect(response.status).toBe(503);
		expect(await response.json()).toMatchObject({ ok: false, delivered: false });
	});

	it('accepts honeypot submissions without attempting delivery', async () => {
			const response = await POST({ request: request({ ...valid, locale: 'en', website: 'bot.example' }), clientAddress: 'api-test-honeypot' } as never);
		expect(response.status).toBe(200);
		expect(await response.json()).toMatchObject({ ok: false, delivered: false });
	});
});
