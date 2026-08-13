import { describe, expect, it } from 'vitest';
import { POST } from './contact';

const valid = { name: 'Ada Lovelace', email: 'ada@example.com', message: 'A message with enough length', website: '', subjectTag: 'test' };

describe('contact API localization contract', () => {
	it('accepts JSON English submissions and preserves the success status contract', async () => {
		const response = await POST({ request: new Request('http://localhost/api/contact', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...valid, locale: 'en' }) }), clientAddress: 'api-test-en' } as never);
		expect(response.status).toBe(200);
		expect(await response.json()).toMatchObject({ ok: true, delivered: false });
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
		expect(response.status).toBe(200);
		expect(await response.json()).toMatchObject({ ok: true, delivered: false });
	});

	it('accepts honeypot submissions without attempting delivery', async () => {
		const response = await POST({ request: new Request('http://localhost/api/contact', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...valid, locale: 'en', website: 'bot.example' }) }), clientAddress: 'api-test-honeypot' } as never);
		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({ ok: true, delivered: false });
	});
});
