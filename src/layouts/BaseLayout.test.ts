import { describe, expect, it } from 'vitest';
import BaseLayout from './BaseLayout.astro';
import { renderAstro } from '../test/renderAstro';

describe('BaseLayout localization contract', () => {
	it('renders reciprocal English metadata and the English accessibility shell', async () => {
		const fragment = await renderAstro(BaseLayout, {
			props: { title: 'Experience', locale: 'en', pageId: 'experience', canonicalPath: '/en/experience' },
			slots: { default: '<h1>Experience</h1>' },
		});

		expect(fragment.querySelector('link[rel="canonical"]')?.getAttribute('href')).toContain('/en/experience');
		expect(fragment.querySelector('link[hreflang="es"]')?.getAttribute('href')).toContain('/experiencia');
		expect(fragment.querySelector('link[hreflang="en"]')?.getAttribute('href')).toContain('/en/experience');
		expect(fragment.querySelector('link[hreflang="x-default"]')?.getAttribute('href')).toContain('/experiencia');
		expect(fragment.querySelector('meta[property="og:locale"]')?.getAttribute('content')).toBe('en_US');
		expect(fragment.querySelector('a[href="#contenido"]')?.textContent).toBe('Skip to content');
		expect(fragment.querySelector('nav[aria-label="Main navigation"]')).not.toBeNull();
		expect(fragment.querySelector('a[aria-label="Switch to Spanish"]')?.getAttribute('href')).toBe('/experiencia');
		expect(fragment.querySelector('meta[name="description"]')?.getAttribute('content')).toContain('projects, experience, skills');
	});
});
