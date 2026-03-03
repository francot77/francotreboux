import { describe, expect, it } from 'vitest';
import Badge from './Badge.astro';
import { renderAstro } from '../test/renderAstro';

describe('Badge', () => {
	it('shows fallback label when no image provided', async () => {
		const fragment = await renderAstro(Badge, {
			props: {
				label: 'SQL',
				title: 'SQL',
				subtitle: 'Boot.dev · 2025',
			},
		});

		expect(fragment.querySelector('.markFallback')?.textContent).toContain('SQL');
		expect(fragment.querySelector('img')).toBeNull();
	});

	it('renders image when provided', async () => {
		const fragment = await renderAstro(Badge, {
			props: {
				label: 'CS50',
				title: 'CS50x',
				subtitle: 'Harvard · 2025',
				imageSrc: 'https://example.com/badge.png',
			},
		});

		expect(fragment.querySelector('.mark')?.getAttribute('data-has-image')).toBe('true');
		expect(fragment.querySelector('img')?.getAttribute('src')).toBe('https://example.com/badge.png');
	});
});

