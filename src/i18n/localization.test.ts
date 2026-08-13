import { describe, expect, it } from 'vitest';
import { equivalentUrl, getCopy, getRoute, locales, pageIds, localizeCertifications, localizeExperience, localizeProjects, localizeSkills, localizeSoldProducts } from './localization';
import { certifications } from '../data/certifications';
import { experience } from '../data/experience';
import { projects } from '../data/projects';
import { skillGroups } from '../data/skills';
import { soldProducts } from '../data/soldProducts';
import HomePage from '../components/HomePage.astro';
import { renderAstro } from '../test/renderAstro';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

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

	it('keeps recruiter-facing home positioning equivalent across locales', () => {
		expect(getCopy('es').home.role).toBe('Full Stack Software Engineer');
		expect(getCopy('en').home.role).toBe(getCopy('es').home.role);
		expect(getCopy('es').home.intro).toContain('Node.js');
		expect(getCopy('en').home.intro).toContain('backend systems');
		expect(getCopy('es').home.availability).toContain('Disponible');
		expect(getCopy('en').home.availability).toContain('Available');
	});

	it('describes the first-person AI-assisted workflow in both locales', () => {
		 expect(getCopy('es').howIWork.steps[0].description).toContain('Entiendo el problema');
		 expect(getCopy('en').howIWork.steps[0].description).toContain('I understand the problem');
		for (const locale of locales) {
			const workflow = getCopy(locale).howIWork;
			expect(workflow.steps).toHaveLength(5);
			expect(workflow.steps[2].description).toContain(locale === 'es' ? 'agente' : 'agent');
			expect(workflow.steps[3].description).toContain(locale === 'es' ? 'reviso' : 'review');
			expect(workflow.steps[4].description).toContain('Gentle');
		}
		expect(getCopy('es').howIWork.judgment).not.toContain('Franco sigue siendo responsable');
		expect(getCopy('en').howIWork.judgment).not.toContain('Franco remains responsible');
	});

	it('projects stable records through complete English translations', () => {
		const localized = localizeProjects('en', projects);
		expect(localized).toHaveLength(projects.length);
		expect(localized[0]).toMatchObject({ slug: 'fezlink', title: 'Fezlink' });
		expect(localized[0].description).toContain('platform');
		expect(localized[2].coverImage?.src).toBe(projects[2].coverImage?.src);
	});

	it('localizes evidence-backed case studies without changing project identity', () => {
		const spanish = localizeProjects('es', projects);
		const english = localizeProjects('en', projects);

		expect(spanish[0].caseStudy?.architecture).toContain('RabbitMQ');
		expect(english[0].caseStudy?.architecture).toContain('RabbitMQ');
		expect(english[0].caseStudy?.outcome).toContain('without claiming undocumented');
		expect(english[2].caseStudy?.architecture).toContain('vJoy');
		expect(english.map(({ slug }) => slug)).toEqual(projects.map(({ slug }) => slug));
	});

	it('projects every portfolio dataset without changing identity or order', () => {
		expect(localizeExperience('en', experience).map((item) => item.company)).toEqual(['Freelance', 'Canal 5 (Delco Digital)', 'Freelance']);
		expect(localizeCertifications('en', certifications)[1].name).toBe('Introduction to AI development');
		expect(localizeSkills('en', skillGroups)[1].title).toBe('Backend / Infrastructure');
		expect(localizeSoldProducts('en', soldProducts)[0].status).toBe('Private project');
		expect(localizeSoldProducts('en', soldProducts)[0].gallery?.[0].src).toBe(soldProducts[0].gallery?.[0].src);
	});

	it('keeps the home section structure shared across locales', () => {
		const home = readFileSync(join(process.cwd(), 'src/components/HomePage.astro'), 'utf8');
		for (const id of ['proyectos', 'experiencia', 'acerca', 'como-trabajo', 'certificaciones', 'contacto']) {
			expect(home).toContain(`id="${id}"`);
		}
		expect(home).toContain('projects.slice(0, 2).map');
		expect(home).toContain('ProjectCard project={project} locale={locale}');
		expect(home).toContain('GitHubProfileCard locale={locale}');
	});

	it('renders identical home structure and image sources for both locales', async () => {
		const [spanish, english] = await Promise.all([
			renderAstro(HomePage, { props: { locale: 'es' } }),
			renderAstro(HomePage, { props: { locale: 'en' } }),
		]);
		const structure = (fragment: DocumentFragment) => ({
			sections: Array.from(fragment.querySelectorAll('section[id]')).map((section) => section.id),
			projectCards: fragment.querySelectorAll('.project').length,
			workflow: fragment.querySelectorAll('[data-how-i-work]').length,
			githubCards: fragment.querySelectorAll('.githubProfile').length,
			certifications: fragment.querySelectorAll('.certs .badge').length,
			images: Array.from(fragment.querySelectorAll('img')).map((image) => image.getAttribute('src')),
		});

		expect(structure(english)).toEqual(structure(spanish));
	});
});
