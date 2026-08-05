import { describe, expect, it } from 'vitest';
import GitHubProfileCard from './GitHubProfileCard.astro';
import { renderAstro } from '../test/renderAstro';

describe('GitHubProfileCard', () => {
	it('renders static profile data as one accessible external card link', async () => {
		const fragment = await renderAstro(GitHubProfileCard);
		const card = fragment.querySelector('a.githubProfile');

		expect(card?.getAttribute('href')).toBe('https://github.com/francot77');
		expect(card?.getAttribute('target')).toBe('_blank');
		expect(card?.getAttribute('rel')).toContain('noopener');
		expect(card?.getAttribute('rel')).toContain('noreferrer');
		expect(card?.getAttribute('aria-label')).toContain('Franco Treboux');
		expect(card?.querySelectorAll('a')).toHaveLength(0);
		expect(card?.querySelector('img')?.getAttribute('src')).toBe(
			'https://avatars.githubusercontent.com/u/69086232?v=4',
		);
		expect(card?.querySelector('img')?.getAttribute('alt')).toBe('Avatar de Franco Treboux');
		expect(card?.querySelector('img')?.getAttribute('width')).toBe('460');
		expect(card?.querySelector('img')?.getAttribute('height')).toBe('460');
		expect(card?.textContent).toContain('Full Stack Developer');
		expect(card?.textContent).toContain('Argentina');
		expect(card?.textContent).toContain('33 repositorios públicos');
		expect(card?.querySelector('.brandIcon svg')).not.toBeNull();
	});
});
