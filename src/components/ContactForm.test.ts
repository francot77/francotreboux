import { describe, expect, it } from 'vitest';
import ContactForm from './ContactForm.astro';
import { renderAstro } from '../test/renderAstro';
import { resolveContactResponse } from './contactFeedback';

describe('ContactForm', () => {
	it('renders required fields and honeypot', async () => {
		const fragment = await renderAstro(ContactForm, {
			props: { subjectTag: 'test' },
		});

		const form = fragment.querySelector('form');
		expect(form).not.toBeNull();
		expect(form?.getAttribute('name')).toBe('contact');

		expect(fragment.querySelector('input[name="name"]')).not.toBeNull();
		expect(fragment.querySelector('input[name="email"]')).not.toBeNull();
		expect(fragment.querySelector('textarea[name="message"]')).not.toBeNull();
		expect(fragment.querySelector('input[name="website"]')).not.toBeNull();
	});

	it('renders English action, route, and locale field', async () => {
		const fragment = await renderAstro(ContactForm, { props: { locale: 'en' } });
		expect(fragment.querySelector('form')?.getAttribute('action')).toBe('/en/contact?enviado=1');
		expect(fragment.querySelector('input[name="locale"]')?.getAttribute('value')).toBe('en');
		expect(fragment.querySelector('button')?.textContent).toContain('Send message');
	});

	it('preserves the contact success query only for the equivalent route', async () => {
		const fragment = await renderAstro(ContactForm, { props: { locale: 'en' } });
		expect(fragment.querySelector('form')?.getAttribute('action')).toBe('/en/contact?enviado=1');
	});

	it('treats an undelivered 200 response as a localized failure', () => {
		expect(resolveContactResponse({ ok: true, delivered: false }, 'en')).toEqual({ ok: false, message: 'Could not send. Please try again.' });
		expect(resolveContactResponse({ ok: true, delivered: false }, 'es')).toEqual({ ok: false, message: 'No se pudo enviar. Intenta nuevamente.' });
	});
});
