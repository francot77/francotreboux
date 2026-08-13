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
	prefetch: {
		defaultStrategy: 'viewport',
	},
	integrations: [sitemap()],
});
