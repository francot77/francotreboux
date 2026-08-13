import { describe, expect, it } from 'vitest';
import { equivalentUrl, getCopy, getRoute, locales, pageIds, localizeCertifications, localizeExperience, localizeProjects, localizeSkills, localizeSoldProducts } from './localization';
import { certifications } from '../data/certifications';
import { experience } from '../data/experience';
import { projects } from '../data/projects';
import { skillGroups } from '../data/skills';
import { soldProducts } from '../data/soldProducts';

describe('portfolio localization contract', () => {
	it('exposes twelve unique routes with reciprocal equivalents', () => {
		const paths = pageIds.flatMap((page) => locales.map((locale) => getRoute(page, locale)));
		expect(new Set(paths).size).toBe(12);
		expect(equivalentUrl('experience', 'en')).toBe('/en/experience');
		expect(equivalentUrl('experience', 'es')).toBe('/experiencia');
	});

	it('preserves only contact success state while switching locale', () => {
		expect(equivalentUrl('contact', 'en', new URLSearchParams('enviado=1'))).toBe('/en/contact?enviado=1');
		expect(equivalentUrl('contact', 'en', new URLSearchParams('foo=bar'))).toBe('/en/contact');
	});

	it('provides complete English UI copy and localized date labels', () => {
		const copy = getCopy('en');
		expect(copy.nav.projects).toBe('Projects');
		expect(copy.form.submit).toBe('Send message');
		expect(copy.dates.present).toBe('Present');
		expect(copy.meta.locale).toBe('en_US');
	});

	it('projects stable records through complete English translations', () => {
		const localized = localizeProjects('en', projects);
		expect(localized).toHaveLength(projects.length);
		expect(localized[0]).toMatchObject({ slug: 'fezlink', title: 'Fezlink' });
		expect(localized[0].description).toContain('platform');
		expect(localized[2].coverImage?.src).toBe(projects[2].coverImage?.src);
	});

	it('projects every portfolio dataset without changing identity or order', () => {
		expect(localizeExperience('en', experience).map((item) => item.company)).toEqual(['Freelance', 'Canal 5 (Delco Digital)', 'Freelance']);
		expect(localizeCertifications('en', certifications)[1].name).toBe('Introduction to AI development');
		expect(localizeSkills('en', skillGroups)[1].title).toBe('Backend / Infrastructure');
		expect(localizeSoldProducts('en', soldProducts)[0].status).toBe('Private project');
		expect(localizeSoldProducts('en', soldProducts)[0].gallery?.[0].src).toBe(soldProducts[0].gallery?.[0].src);
	});
});
