import { describe, expect, it } from 'vitest';
import ProjectCard from './ProjectCard.astro';
import { renderAstro } from '../test/renderAstro';

describe('ProjectCard', () => {
	it('renders title, description, technologies and links', async () => {
		const fragment = await renderAstro(ProjectCard, {
			props: {
				project: {
					slug: 'demo',
					title: 'Proyecto Demo',
					description: 'Descripción breve.',
					technologies: ['Astro', 'TypeScript'],
					links: {
						demo: 'https://example.com',
						repo: 'https://github.com/example/repo',
					},
				},
			},
		});

		expect(fragment.querySelector('h3')?.textContent).toContain('Proyecto Demo');
		expect(fragment.textContent).toContain('Descripción breve.');
		expect(fragment.querySelectorAll('.chip')).toHaveLength(2);
		expect(fragment.querySelector('article')?.getAttribute('data-card-primary')).toBe('demo');
		expect(fragment.querySelector('article')?.getAttribute('tabindex')).toBe('0');

		const anchors = Array.from(fragment.querySelectorAll('a')).map((a) => a.getAttribute('href'));
		expect(anchors).toContain('https://example.com');
		expect(anchors).toContain('https://github.com/example/repo');
	});

	it('renders a project cover when provided', async () => {
		const fragment = await renderAstro(ProjectCard, {
			props: {
				project: {
					slug: 'demo',
					title: 'Proyecto Demo',
					description: 'Descripción breve.',
					technologies: [],
					coverImage: {
						src: '/projects/demo/screenshot.png',
						alt: 'Captura del proyecto demo',
						width: 1600,
						height: 900,
					},
					links: {},
				},
			},
		});

		expect(fragment.querySelector('.cover img')?.getAttribute('src')).toBe('/projects/demo/screenshot.png');
		expect(fragment.querySelector('.cover img')?.getAttribute('alt')).toBe('Captura del proyecto demo');
		expect(fragment.querySelector('.project-media')).not.toBeNull();
		expect(fragment.querySelector('.project-media')?.getAttribute('style')).toContain('aspect-ratio: 1600 / 900');
		expect(fragment.querySelector('.project-media img')?.getAttribute('width')).toBe('1600');
		expect(fragment.querySelector('.project-media img')?.getAttribute('height')).toBe('900');
		expect(fragment.querySelector('[data-gallery-open]')).not.toBeNull();
		expect(fragment.querySelector('dialog')).not.toBeNull();
		expect(fragment.querySelector('dialog')?.getAttribute('aria-label')).toBe('Vista previa de Proyecto Demo');
		expect(fragment.querySelector('[data-gallery-caption]')).toBeNull();
		expect(fragment.querySelector('[data-gallery-status]')).toBeNull();
		expect(fragment.querySelector('[data-gallery-previous]')).toBeNull();
		expect(fragment.querySelector('[data-gallery-next]')).toBeNull();
		expect(fragment.querySelector('[data-gallery-option]')).toBeNull();
	});

	it('renders FormulaWheelBridge technologies with available brand icons', async () => {
		const project = {
			slug: 'formulawheelbridge',
			title: 'FormulaWheelBridge',
			description: 'Descripción breve.',
			technologies: ['C#', '.NET 8', 'WinForms', 'ESP32-S3', 'Arduino/C++', 'Wi-Fi/UDP', 'vJoy'],
			links: {},
		};

		const fragment = await renderAstro(ProjectCard, { props: { project } });

		expect(fragment.querySelectorAll('.techChip')).toHaveLength(4);
		expect(fragment.querySelectorAll('.techIcon')).toHaveLength(4);
		expect(fragment.textContent).toContain('WinForms');
		expect(fragment.textContent).toContain('Wi-Fi/UDP');
	});

	it('marks the repository as FormulaWheelBridge primary action', async () => {
		const fragment = await renderAstro(ProjectCard, {
			props: {
				project: {
					slug: 'formulawheelbridge',
					title: 'FormulaWheelBridge',
					description: 'Descripción breve.',
					technologies: [],
					links: { repo: 'https://github.com/example/repo' },
				},
			},
		});

		expect(fragment.querySelector('article')?.getAttribute('data-card-primary')).toBe('repo');
		expect(fragment.querySelector('article')?.getAttribute('role')).toBe('button');
		expect(fragment.querySelector('article')?.getAttribute('aria-label')).toContain('FormulaWheelBridge');
		expect(fragment.querySelector('a[data-card-primary="repo"]')?.getAttribute('href')).toBe(
			'https://github.com/example/repo',
		);
	});
});
