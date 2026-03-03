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

		const anchors = Array.from(fragment.querySelectorAll('a')).map((a) => a.getAttribute('href'));
		expect(anchors).toContain('https://example.com');
		expect(anchors).toContain('https://github.com/example/repo');
	});
});

