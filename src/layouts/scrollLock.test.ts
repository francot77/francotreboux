import { beforeEach, describe, expect, it, vi } from 'vitest';
import BaseLayout from './BaseLayout.astro';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';

// The scroll lock ships as an inline script, so it is exercised by pulling that
// script out of the rendered layout and running it against a real document.
// Asserting only that the markup contains the script would not prove the page
// actually stops scrolling.
async function loadScrollLockScript(): Promise<string> {
	const container = await AstroContainer.create();
	const html = await container.renderToString(BaseLayout, {
		props: { title: 'Home', locale: 'es', pageId: 'home', canonicalPath: '/' },
		slots: { default: '<h1>Home</h1>' },
	});
	// Astro emits is:inline scripts as a bare <script>, so match on content.
	const scripts = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map((match) => match[1]);
	const script = scripts.find((body) => body.includes('data-dialog-open'));
	if (!script) throw new Error('BaseLayout no longer ships the dialog scroll lock');
	return script;
}

const nextTick = () => new Promise((resolve) => setTimeout(resolve, 0));

describe('dialog scroll lock', () => {
	let script: string;

	beforeEach(async () => {
		script = script ?? (await loadScrollLockScript());
		document.documentElement.removeAttribute('data-dialog-open');
		document.documentElement.removeAttribute('style');
		// Each run installs observers on document.body. Swapping in a fresh body
		// detaches the previous test's observers instead of leaving several
		// copies of the script fighting over the same document.
		document.body.replaceWith(document.createElement('body'));
		vi.restoreAllMocks();
		vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
	});

	it('locks the page while a dialog is open and releases it on close', async () => {
		document.body.innerHTML = '<dialog id="case-study"></dialog>';
		new Function(script)();
		const dialog = document.querySelector('dialog')!;

		expect(document.documentElement.hasAttribute('data-dialog-open')).toBe(false);

		dialog.setAttribute('open', '');
		await nextTick();
		expect(document.documentElement.hasAttribute('data-dialog-open')).toBe(true);

		dialog.removeAttribute('open');
		await nextTick();
		expect(document.documentElement.hasAttribute('data-dialog-open')).toBe(false);
		expect(document.body.style.top).toBe('');
	});

	it('stays locked while a second dialog is still open', async () => {
		document.body.innerHTML = '<dialog id="a"></dialog><dialog id="b"></dialog>';
		new Function(script)();
		const [first, second] = [...document.querySelectorAll('dialog')];

		first.setAttribute('open', '');
		second.setAttribute('open', '');
		await nextTick();
		expect(document.documentElement.hasAttribute('data-dialog-open')).toBe(true);

		first.removeAttribute('open');
		await nextTick();
		expect(document.documentElement.hasAttribute('data-dialog-open')).toBe(true);

		second.removeAttribute('open');
		await nextTick();
		expect(document.documentElement.hasAttribute('data-dialog-open')).toBe(false);
	});

	it('restores the scroll position the page was locked at', async () => {
		document.body.innerHTML = '<dialog id="case-study"></dialog>';
		Object.defineProperty(window, 'scrollY', { value: 640, configurable: true });
		new Function(script)();
		const dialog = document.querySelector('dialog')!;

		dialog.setAttribute('open', '');
		await nextTick();
		expect(document.body.style.top).toBe('-640px');

		dialog.removeAttribute('open');
		await nextTick();
		expect(window.scrollTo).toHaveBeenCalledWith(0, 640);
	});

	it('locks for dialogs added to the page after the script runs', async () => {
		new Function(script)();

		const dialog = document.createElement('dialog');
		document.body.append(dialog);
		await nextTick();
		expect(document.documentElement.hasAttribute('data-dialog-open')).toBe(false);

		dialog.setAttribute('open', '');
		await nextTick();
		expect(document.documentElement.hasAttribute('data-dialog-open')).toBe(true);
	});
});
