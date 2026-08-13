import { describe, expect, it } from 'vitest';
import HowIWork from './HowIWork.astro';
import { renderAstro } from '../test/renderAstro';

describe('HowIWork', () => {
	it('renders the localized engineering process in English', async () => {
		const fragment = await renderAstro(HowIWork, { props: { locale: 'en' } });

		expect(fragment.querySelectorAll('[data-step-card]')).toHaveLength(1);
		expect(fragment.querySelectorAll('[data-progress]')).toHaveLength(5);
		expect(fragment.querySelector('[data-previous]')).toHaveAttribute('aria-label', 'Previous step');
		expect(fragment.querySelector('[data-next]')).toHaveAttribute('aria-label', 'Next step');
		expect(fragment.querySelector('[data-step-title]')).toHaveTextContent('Define');
		expect(fragment.textContent).toContain('Define');
		expect(fragment.textContent).toContain('I understand the problem');
		expect(fragment.querySelector('[data-step-card]')).toHaveClass('card');
	});

	it('keeps the Spanish sequence semantically localized', async () => {
		const fragment = await renderAstro(HowIWork, { props: { locale: 'es' } });

		expect(fragment.textContent).toContain('Definir');
		expect(fragment.textContent).toContain('Entiendo el problema');
		expect(fragment.querySelector('[data-previous]')).toHaveAttribute('aria-label', 'Paso anterior');
		expect(fragment.querySelector('[data-next]')).toHaveAttribute('aria-label', 'Paso siguiente');
		expect(fragment.querySelectorAll('[data-step-card]')).toHaveLength(1);
	});
});
