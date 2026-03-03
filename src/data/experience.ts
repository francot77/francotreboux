export type ExperienceItem = {
	company: string;
	role: string;
	start: string;
	end?: string;
	location?: string;
	summary: string;
	highlights: string[];
	technologies?: string[];
};

export const experience: ExperienceItem[] = [
	{
		company: 'Freelance',
		role: 'Fullstack Developer',
		start: '2025-01',
		end: 'Actualidad',
		location: 'Remoto',
		summary:
			'Diseño y desarrollo de SaaS propios con arquitectura distribuida y orientada a eventos.',
		highlights: [
			'Diseño de arquitectura event-driven utilizando RabbitMQ y workers en Rust para procesamiento asincrónico y desacoplado.',
			'Implementación de sistema de tracking de eventos con batching en memoria y bulk writes en MongoDB.',
			'Desarrollo de API en Node.js con separación clara de responsabilidades y procesamiento en background.',
			'Frontend público optimizado para SEO con Next.js en Vercel y dashboard SPA en React (Vite).',
			'Automatización de facturación y procesamiento de datos orientado a escalabilidad.',
		],
		technologies: [
			'TypeScript',
			'Node.js',
			'Next.js',
			'React',
			'Vite',
			'MongoDB',
			'RabbitMQ',
			'Rust',
			'Vercel',
			'Railway',
			'Cloudflare',
		],
	},
	{
		company: 'Canal 5 (Delco Digital)',
		role: 'Técnico en Telecomunicaciones',
		start: '2023-09',
		end: '2025-01',
		location: 'Presencial',
		summary:
			'Mantenimiento y diagnóstico de infraestructura de red FTTH y HFC en entornos productivos.',
		highlights: [
			'Resolución de incidencias en redes de fibra óptica (FTTH) y coaxial (HFC).',
			'Diagnóstico y mantenimiento preventivo/correctivo sobre infraestructura de red.',
			'Interacción con sistemas de provisionamiento y monitoreo de conectividad.',
			'Soporte técnico en servicios de Internet y TV, trabajando sobre capas físicas y lógicas de red.',
		],
		technologies: ['FTTH', 'HFC', 'Redes TCP/IP'],
	},
	{
		company: 'Freelance',
		role: 'Mobile Developer',
		start: '2022-03',
		end: '2023-01',
		location: 'Remoto',
		summary:
			'Desarrollo de aplicación móvil para empresa de logística con enfoque en geolocalización y sincronización de datos.',
		highlights: [
			'Implementación de sistema de tracking GPS en tiempo real.',
			'Sincronización de datos entre app móvil y backend.',
			'Integración de sistema de facturación y gestión operativa.',
			'Optimización de rendimiento y experiencia de usuario en React Native.',
		],
		technologies: ['JavaScript', 'React Native', 'Expo'],
	},
];

