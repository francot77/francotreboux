import { afterEach, describe, expect, it, vi } from 'vitest';
import { POST } from './contact';

const { sendMail } = vi.hoisted(() => ({ sendMail: vi.fn().mockResolvedValue({}) }));
vi.mock('nodemailer', () => ({
	default: { createTransport: vi.fn(() => ({ sendMail })) },
}));

const valid = { name: 'Ada Lovelace', email: 'ada@example.com', message: 'A message with enough length', website: '', subjectTag: 'test' };

afterEach(() => {
	vi.unstubAllEnvs();
	sendMail.mockClear();
});

describe('contact API localization contract', () => {
	it('reports a localized configuration error when SMTP is unavailable', async () => {
		const response = await POST({ request: new Request('http://localhost/api/contact', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...valid, locale: 'en' }) }), clientAddress: 'api-test-en' } as never);
		expect(response.status).toBe(503);
		expect(await response.json()).toEqual({ ok: false, delivered: false, message: 'The contact form is not configured to receive messages.' });
		expect(sendMail).not.toHaveBeenCalled();
	});

	it('reports delivery failures without exposing provider details', async () => {
		vi.stubEnv('SMTP_HOST', 'smtp.example.com');
		vi.stubEnv('CONTACT_TO', 'owner@example.com');
		vi.stubEnv('CONTACT_FROM', 'portfolio@example.com');
		sendMail.mockRejectedValueOnce(new Error('private SMTP credentials or provider details'));

		const response = await POST({ request: new Request('http://localhost/api/contact', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...valid, locale: 'es' }) }), clientAddress: 'api-test-smtp-failure' } as never);
		expect(response.status).toBe(503);
		expect(await response.json()).toEqual({ ok: false, delivered: false, message: 'No se pudo entregar el mensaje. Intenta nuevamente más tarde.' });
	});

	it('confirms delivery only after SMTP accepts the message', async () => {
		vi.stubEnv('SMTP_HOST', 'smtp.example.com');
		vi.stubEnv('CONTACT_TO', 'owner@example.com');
		vi.stubEnv('CONTACT_FROM', 'portfolio@example.com');

		const response = await POST({ request: new Request('http://localhost/api/contact', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...valid, locale: 'en' }) }), clientAddress: 'api-test-success' } as never);
		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({ ok: true, delivered: true });
	});

	it('rejects unsupported locales before validation', async () => {
		const response = await POST({ request: new Request('http://localhost/api/contact', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...valid, locale: 'fr' }) }), clientAddress: 'api-test-fr' } as never);
		expect(response.status).toBe(400);
		expect((await response.json()).message).toBe('Unsupported locale.');
	});

	it('localizes validation feedback for English', async () => {
		const response = await POST({ request: new Request('http://localhost/api/contact', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...valid, locale: 'en', name: 'A' }) }), clientAddress: 'api-test-validation' } as never);
		expect(response.status).toBe(400);
		expect((await response.json()).message).toBe('Please enter a valid name.');
	});

	it('accepts form submissions with omitted locale using the Spanish default', async () => {
		const body = new URLSearchParams(valid);
		const response = await POST({ request: new Request('http://localhost/api/contact', { method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body }), clientAddress: 'api-test-form-default' } as never);
		expect(response.status).toBe(503);
		expect(await response.json()).toMatchObject({ ok: false, delivered: false });
	});

	it('accepts honeypot submissions without attempting delivery', async () => {
		const response = await POST({ request: new Request('http://localhost/api/contact', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...valid, locale: 'en', website: 'bot.example' }) }), clientAddress: 'api-test-honeypot' } as never);
		expect(response.status).toBe(200);
		expect(await response.json()).toMatchObject({ ok: false, delivered: false });
	});
});
