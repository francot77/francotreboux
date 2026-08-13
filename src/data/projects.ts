export type CaseStudy = {
	problem?: string;
	context?: string;
	architecture?: string;
	decisions?: string[];
	challenges?: string[];
	development?: string;
	validation?: string;
	outcome?: string;
	technologies?: string[];
};

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
	caseStudy?: CaseStudy;
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
			caseStudy: {
				problem: 'Una plataforma de biolink necesitaba convertir las interacciones públicas en señales útiles para analizar y optimizar la conversión.',
				context: 'El producto separa el frontend público, el dashboard y la API, y necesita procesar eventos sin acoplar la experiencia pública al trabajo de fondo.',
				architecture: 'La solución combina un frontend público con Next.js en el edge, una API en Node.js y procesamiento asincrónico mediante RabbitMQ y workers en Rust. MongoDB recibe escrituras en bulk después de agrupar eventos en memoria; los despliegues usan Vercel y Railway.',
				decisions: [
					'Separar frontend público, dashboard y API para mantener responsabilidades claras.',
					'Usar colas y workers para desacoplar la ingestión de eventos del procesamiento asincrónico.',
					'Agrupar eventos en memoria y usar bulk writes para reducir operaciones individuales sobre la base de datos.'
				],
				challenges: ['Coordinar el recorrido de eventos entre componentes con responsabilidades y tiempos de procesamiento distintos.'],
				development: 'El desarrollo se enfocó en dividir el sistema por responsabilidades y en diseñar un pipeline explícito desde la ingestión hasta la persistencia.',
				validation: 'No se documentan en el repositorio pruebas específicas ni métricas de rendimiento publicadas.',
				outcome: 'Quedó una base distribuida y orientada a eventos para una plataforma SaaS, sin afirmar métricas de escala o rendimiento no documentadas.',
				technologies: ['Next.js', 'TypeScript', 'Node.js', 'Rust workers', 'RabbitMQ', 'MongoDB', 'Cloudflare Edge', 'Vercel', 'Railway']
			}
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
			caseStudy: {
				problem: 'Los controles físicos de un volante casero necesitaban convertirse en entradas reconocibles por juegos de Windows.',
				context: 'El proyecto integra hardware real con software de escritorio y mantiene el repositorio público junto con una captura del panel de control.',
				architecture: 'El ESP32-S3 lee los controles mediante Arduino/C++, envía los datos por Wi-Fi usando UDP y una aplicación C#/.NET 8 los recibe para exponerlos a Windows a través de vJoy.',
				decisions: [
					'Usar Wi-Fi/UDP como enlace entre el microcontrolador y la aplicación de escritorio.',
					'Mantener separadas la lectura del hardware, el transporte de datos y la emulación del gamepad mediante vJoy.'
				],
				challenges: ['Traducir señales de controles físicos a un formato que una aplicación de Windows y los juegos puedan consumir como gamepad.'],
				development: 'El desarrollo conectó firmware Arduino/C++, transporte UDP y una interfaz WinForms en C#/.NET 8 alrededor de un dispositivo físico.',
				validation: 'La validación se realizó con hardware real y con la visualización de entradas y conexión vJoy disponible en la captura del proyecto; no se publican métricas de latencia o confiabilidad.',
				outcome: 'El proyecto ofrece un puente funcional entre controles de volante DIY y un gamepad inalámbrico para Windows, con repositorio público.',
				technologies: ['C#', '.NET 8', 'ESP32', 'Arduino/C++', 'Wi-Fi', 'UDP', 'vJoy']
			}
		},
];
