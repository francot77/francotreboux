import { describe, expect, it } from 'vitest';
import ProjectsPage from '../pages/proyectos.astro';
import EnglishProjectsPage from '../pages/en/projects.astro';
import { renderAstro } from '../test/renderAstro';

// The gallery script pairs each dialog with its triggers through aria-controls.
// That pairing only holds if every trigger names an existing dialog and no two
// dialogs share an id, so those are the invariants worth guarding. The script
// itself is bundled and cannot run against this fragment.
describe.each([
	['Spanish', ProjectsPage],
	['English', EnglishProjectsPage],
])('%s projects page gallery pairing', (_label, Page) => {
	it('gives every image trigger exactly one dialog of its own', async () => {
		const fragment = await renderAstro(Page as never);

		const triggers = [...fragment.querySelectorAll('[data-gallery-open]')];
		const dialogs = [...fragment.querySelectorAll('dialog[data-gallery]')];
		expect(triggers.length).toBeGreaterThan(0);
		expect(dialogs.length).toBeGreaterThan(0);

		const ids = dialogs.map((dialog) => dialog.id);
		expect(ids.every(Boolean)).toBe(true);
		// Duplicate ids would send several dialogs to the same trigger.
		expect(new Set(ids).size).toBe(ids.length);

		for (const trigger of triggers) {
			const target = trigger.getAttribute('aria-controls');
			expect(target, 'every image trigger must name the dialog it opens').toBeTruthy();
			expect(ids, `no dialog matches trigger target ${target}`).toContain(target);
		}
	});

	it('keeps each project card pointing at its own image', async () => {
		const fragment = await renderAstro(Page as never);

		// Two cards resolving to the same dialog is the defect this guards:
		// clicking one project's cover opened another project's image.
		const covers = [...fragment.querySelectorAll('.cover [data-gallery-open]')];
		const targets = covers.map((trigger) => trigger.getAttribute('aria-controls'));
		expect(targets.length).toBeGreaterThan(1);
		expect(new Set(targets).size).toBe(targets.length);
	});
});
