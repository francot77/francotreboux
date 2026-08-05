export type Project = {
	slug: string;
	title: string;
	description: string;
	technologies: string[];
	coverImage?: {
		src: string;
		alt: string;
		width: number;
		height: number;
	};
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
		slug: 'formulawheelbridge',
		title: 'FormulaWheelBridge',
		description:
			'Convierte los controles de un volante casero en un gamepad inalámbrico para Windows.',
		technologies: ['C#', '.NET 8', 'WinForms', 'ESP32-S3', 'Arduino/C++', 'Wi-Fi/UDP', 'vJoy'],
		coverImage: {
			src: '/projects/formulawheelbridge/screenshot.png',
			alt: 'Panel de FormulaWheelBridge mostrando las entradas del volante y la conexión con vJoy',
			width: 895,
			height: 920,
		},
		links: {
			repo: 'https://github.com/francot77/FormulaWheelBridge',
		},
	},
];
