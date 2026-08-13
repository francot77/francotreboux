// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

const site =
	process.env.SITE_URL ??
	(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://francotreboux.vercel.app/');

// https://astro.build/config
export default defineConfig({
	site,
	output: 'server',
	adapter: vercel({}),
	security: {
		// Vercel can expose a public origin different from Astro's forwarded request URL.
		// The contact endpoint performs an explicit allowlist check instead.
		checkOrigin: false,
	},
	prefetch: {
		defaultStrategy: 'viewport',
	},
	integrations: [sitemap()],
});
