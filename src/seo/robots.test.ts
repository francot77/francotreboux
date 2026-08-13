import { describe, expect, it } from 'vitest';
import { robotsTxt } from './robots';

describe('robots discovery contract', () => {
	it('references the configured site URL without blocking locale routes', () => {
		expect(robotsTxt('https://portfolio.example/')).toBe('User-agent: *\nAllow: /\n\nSitemap: https://portfolio.example/sitemap-index.xml\n');
	});

	it('uses the portfolio site URL when no override is provided', () => {
		expect(robotsTxt()).toContain('Sitemap: https://francotreboux.vercel.app/sitemap-index.xml');
	});
});
