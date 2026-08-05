export type SoldProductImage = {
	src: string;
	alt: string;
	caption: string;
	width: number;
	height: number;
};

export type SoldProductStatus = 'Proyecto privado' | 'Producto comercial';

export type SoldProduct = {
	slug: string;
	title: string;
	status: SoldProductStatus;
	summary: string;
	technologies: string[];
	outcome: string[];
	links?: {
		demo?: string;
	};
	coverImage?: SoldProductImage;
	gallery?: SoldProductImage[];
};

export const soldProducts: SoldProduct[] = [
	{
		slug: 'saascomercio',
		title: 'SaasComercio',
		status: 'Proyecto privado',
		summary:
			'Sistema de gestión comercial para comercios minoristas, diseñado para centralizar productos, ventas, stock y operaciones diarias en una sola herramienta.',
		technologies: ['Electron', 'React', 'TypeScript', 'Supabase', 'PostgreSQL'],
		outcome: [
			'Producto comercial vendido y entregado a un negocio en funcionamiento',
			'Flujos de venta de mostrador y mesa con control de stock',
			'Panel operativo para administrar productos, clientes y proveedores',
		],
		coverImage: {
			src: '/projects/saascomercio/1.png',
			alt: 'Panel principal de SaasComercio',
			caption: 'Panel principal para consultar el estado del negocio',
			width: 1915,
			height: 1006,
		},
		gallery: [
			{
				src: '/projects/saascomercio/1.png',
				alt: 'Panel principal de SaasComercio',
				caption: 'Panel principal para consultar el estado del negocio',
				width: 1915,
				height: 1006,
			},
			{
				src: '/projects/saascomercio/2.png',
				alt: 'Captura 2 de SaasComercio',
				caption: 'Pantalla 2 de la operación diaria de SaasComercio',
				width: 1912,
				height: 1004,
			},
			{
				src: '/projects/saascomercio/3.png',
				alt: 'Captura 3 de SaasComercio',
				caption: 'Pantalla 3 de la operación diaria de SaasComercio',
				width: 1887,
				height: 999,
			},
			{
				src: '/projects/saascomercio/4.png',
				alt: 'Captura 4 de SaasComercio',
				caption: 'Pantalla 4 de la operación diaria de SaasComercio',
				width: 1894,
				height: 1003,
			},
			{
				src: '/projects/saascomercio/5.png',
				alt: 'Captura 5 de SaasComercio',
				caption: 'Pantalla 5 de la operación diaria de SaasComercio',
				width: 1886,
				height: 1006,
			},
			{
				src: '/projects/saascomercio/6.png',
				alt: 'Captura 6 de SaasComercio',
				caption: 'Pantalla 6 de la operación diaria de SaasComercio',
				width: 1912,
				height: 1094,
			},
			{
				src: '/projects/saascomercio/7.png',
				alt: 'Captura 7 de SaasComercio',
				caption: 'Pantalla 7 de la operación diaria de SaasComercio',
				width: 1890,
				height: 1007,
			},
			{
				src: '/projects/saascomercio/8.png',
				alt: 'Captura 8 de SaasComercio',
				caption: 'Pantalla 8 de la operación diaria de SaasComercio',
				width: 1897,
				height: 1003,
			},
		],
	},
	{
		slug: 'delinteriorgshop',
		title: 'Del Interior GShop',
		status: 'Producto comercial',
		summary:
			'E-commerce para tienda física con integración de pasarela de pago y optimización para posicionamiento orgánico.',
		technologies: ['WordPress', 'WooCommerce', 'MercadoPago API', 'SEO'],
		links: {
			demo: 'https://delinteriorgrowshop.com.ar',
		},
		outcome: [
			'Implementación de tienda online con catálogo dinámico',
			'Integración de pagos mediante MercadoPago',
			'Optimización técnica y de contenido para buscadores',
		],
	},
];
