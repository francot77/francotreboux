import { getViteConfig } from 'astro/config';
import { defineConfig } from 'vitest/config';

export default getViteConfig(
	defineConfig({
		test: {
			environment: 'happy-dom',
			setupFiles: ['./src/test/setup.ts'],
			include: ['src/**/*.test.ts'],
		},
	}),
);
