import { describe, expect, it } from 'vitest';
import SoldProductCard from './SoldProductCard.astro';
import { soldProducts } from '../data/soldProducts';
import { renderAstro } from '../test/renderAstro';

describe('SoldProductCard', () => {
	it('renders SaaSComercio as a private project without exposing source links', async () => {
		const fragment = await renderAstro(SoldProductCard, {
			props: { product: soldProducts[0] },
		});

		expect(fragment.querySelector('.eyebrow')?.textContent).toBe('Proyecto privado');
		expect(fragment.textContent).not.toContain('Producto comercial · Proyecto privado');
		expect(fragment.textContent).toContain('SaasComercio');
		expect(fragment.querySelector('[data-gallery-open].button')?.textContent).toContain('Ver capturas de pantalla');
		expect(fragment.querySelectorAll('a')).toHaveLength(0);
		expect(fragment.textContent).not.toMatch(/repositorio|código fuente/i);
	});

	it('renders a minimal accessible multi-image gallery', async () => {
		const fragment = await renderAstro(SoldProductCard, {
			props: { product: soldProducts[0] },
		});

		expect(fragment.querySelector('dialog')?.getAttribute('aria-label')).toBe('Vista previa de SaasComercio');
		expect(fragment.querySelector('[data-gallery-close]')?.getAttribute('aria-label')).toBe(
			'Cerrar vista previa',
		);
		expect(fragment.querySelector('[data-gallery-previous]')?.getAttribute('aria-label')).toBe('Imagen anterior');
		expect(fragment.querySelector('[data-gallery-next]')?.getAttribute('aria-label')).toBe('Imagen siguiente');
		expect(fragment.querySelector('[data-gallery-items]')?.getAttribute('data-gallery-items')).toContain(
			'/projects/saascomercio/8.png',
		);
		expect(fragment.querySelector('img')?.getAttribute('alt')).toBeTruthy();
		expect(fragment.querySelector('.project-media')).not.toBeNull();
		expect(fragment.querySelector('.project-media')?.getAttribute('style')).toContain('aspect-ratio: 1915 / 1006');
		expect(fragment.querySelector('.project-media img')?.getAttribute('width')).toBe('1915');
		expect(fragment.querySelector('.project-media img')?.getAttribute('height')).toBe('1006');
		expect(fragment.querySelector('[data-gallery-caption]')).toBeNull();
		expect(fragment.querySelector('[data-gallery-status]')).toBeNull();
		expect(fragment.querySelector('[data-gallery-option]')).toBeNull();
	});

	it('keeps the single-image preview without gallery navigation chrome', async () => {
		const product = { ...soldProducts[0], gallery: [soldProducts[0].gallery![0]] };
		const fragment = await renderAstro(SoldProductCard, { props: { product } });

		expect(fragment.querySelector('[data-gallery-open]')).not.toBeNull();
		expect(fragment.querySelector('dialog')).not.toBeNull();
		expect(fragment.querySelector('[data-gallery-image]')).not.toBeNull();
		expect(fragment.querySelector('dialog')?.getAttribute('aria-label')).toBe('Vista previa de SaasComercio');
		expect(fragment.querySelector('[data-gallery-caption]')).toBeNull();
		expect(fragment.querySelector('[data-gallery-status]')).toBeNull();
		expect(fragment.querySelector('[data-gallery-previous]')).toBeNull();
		expect(fragment.querySelector('[data-gallery-next]')).toBeNull();
		expect(fragment.querySelector('[data-gallery-option]')).toBeNull();
	});

	it('uses the screenshot gallery as SaaSComercio primary action', async () => {
		const fragment = await renderAstro(SoldProductCard, { props: { product: soldProducts[0] } });

		expect(fragment.querySelector('article')?.getAttribute('data-card-primary')).toBe('gallery');
		expect(fragment.querySelector('article')?.getAttribute('role')).toBe('button');
		expect(fragment.querySelector('[data-card-primary="gallery"]')?.textContent).toContain(
			'Ver capturas de pantalla',
		);
		expect(fragment.querySelectorAll('[data-gallery-open]')).toHaveLength(2);
	});

	it('renders a commercial product without inventing image assets', async () => {
		const product = soldProducts.find(({ slug }) => slug === 'delinteriorgshop');
		if (!product) throw new Error('Del Interior GShop product is missing');

		const fragment = await renderAstro(SoldProductCard, { props: { product } });

		expect(fragment.textContent).toContain('Del Interior GShop');
		expect(fragment.querySelector('.eyebrow')?.textContent).toBe('Producto comercial');
		expect(fragment.textContent).not.toContain('Proyecto privado');
		expect(fragment.textContent).toContain('E-commerce para tienda física');
		expect(fragment.textContent).toContain('WooCommerce');
		expect(fragment.querySelector('a')?.getAttribute('href')).toBe('https://delinteriorgrowshop.com.ar');
		expect(fragment.querySelector('img')).toBeNull();
		expect(fragment.querySelector('[data-gallery-open]')).toBeNull();
		expect(fragment.querySelector('article')?.getAttribute('data-card-primary')).toBe('demo');
		expect(fragment.querySelector('a[data-card-primary="demo"]')?.getAttribute('href')).toBe(
			'https://delinteriorgrowshop.com.ar',
		);
		expect(fragment.querySelector('dialog')).toBeNull();
	});

	it('localizes the product content and gallery controls in English', async () => {
		const fragment = await renderAstro(SoldProductCard, { props: { product: soldProducts[0], locale: 'en' } });

		expect(fragment.querySelector('.eyebrow')?.textContent).toBe('Private project');
		expect(fragment.textContent).toContain('Business management system for retailers');
		expect(fragment.querySelector('[data-gallery-open].button')?.textContent).toContain('View screenshots');
		expect(fragment.querySelector('dialog')?.getAttribute('aria-label')).toBe('Preview of SaasComercio');
		expect(fragment.querySelector('[data-gallery-close]')?.getAttribute('aria-label')).toBe('Close preview');
		expect(fragment.querySelector('[data-gallery-previous]')?.getAttribute('aria-label')).toBe('Previous image');
		expect(fragment.querySelector('[data-gallery-next]')?.getAttribute('aria-label')).toBe('Next image');
	});
});
