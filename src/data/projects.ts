export type Project = {
	slug: string;
	title: string;
	description: string;
	technologies: string[];
	links: {
		demo?: string;
		repo?: string;
		caseStudy?: string;
	};
	highlights?: string[];
};

export const projects: Project[] = [
	{
		slug: 'fezlink',
		title: 'Fezlink',
		description:
			'Plataforma SaaS para creadores que convierte una biolink tradicional en una herramienta de análisis y optimización de conversión, construida sobre una arquitectura distribuida orientada a eventos.',
		technologies: [
			'Next.js',
			'TypeScript',
			'React',
			'Node.js',
			'Rust',
			'RabbitMQ',
			'MongoDB',
			'Cloudflare Edge',
			'Vercel',
			'Railway'
		],
		links: {
			demo: 'https://fezlink.com'
		},
		highlights: [
			'Arquitectura event-driven con procesamiento asincrónico mediante colas y workers en Rust',
			'Pipeline de ingestión de eventos con batching en memoria y bulk writes en base de datos',
			'Frontend público optimizado para SEO y performance en el edge',
			'Diseño desacoplado entre frontend público, dashboard y API'
		],
	},
	{
		slug: 'feztime',
		title: 'FezTime',
		description:
			'SaaS para gestión de turnos orientado a pequeños y medianos comercios, con foco en automatización operativa y reducción de fricción en reservas.',
		technologies: [
			'Next.js',
			'TypeScript',
			'React',
			'Tailwind',
			'Node.js',
			'MongoDB'
		],
		links: {
			demo: 'https://feztime.com'
		},
		highlights: [
			'Sistema de reservas con gestión de disponibilidad en tiempo real',
			'Panel administrativo para control de agenda y clientes',
			'Arquitectura preparada para multi-tenant',
			'Enfoque en experiencia de usuario y conversión'
		],
	},
	{
		slug: 'delinteriorgshop',
		title: 'Del Interior GShop',
		description:
			'E-commerce para tienda física con integración de pasarela de pago y optimización para posicionamiento orgánico.',
		technologies: [
			'WordPress',
			'WooCommerce',
			'MercadoPago API',
			'SEO'
		],
		links: {
			demo: 'https://delinteriorgrowshop.com.ar'
		},
		highlights: [
			'Implementación de tienda online con catálogo dinámico',
			'Integración de pagos mediante MercadoPago',
			'Optimización técnica y de contenido para buscadores'
		],
	},
];