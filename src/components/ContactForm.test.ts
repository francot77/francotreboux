import { describe, expect, it } from 'vitest';
import ContactForm from './ContactForm.astro';
import { renderAstro } from '../test/renderAstro';

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
});

