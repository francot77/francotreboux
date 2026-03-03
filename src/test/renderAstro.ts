import { experimental_AstroContainer as AstroContainer, type ContainerRenderOptions } from 'astro/container';

type AstroComponentFactory = Parameters<AstroContainer['renderToString']>[0];

export async function renderAstro(
	Component: AstroComponentFactory,
	options: ContainerRenderOptions = {},
): Promise<DocumentFragment> {
	const container = await AstroContainer.create();
	const html = await container.renderToString(Component, options);
	const template = document.createElement('template');
	template.innerHTML = html;
	return template.content;
}

