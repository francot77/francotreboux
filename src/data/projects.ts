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
		{
			slug: 'ac3bridge',
			title: 'AC3Bridge',
			description:
				'Lleva sonido envolvente 5.1 por salida óptica en Windows, codificando a AC-3 en tiempo real para equipos que no traen esa función por hardware.',
			technologies: ['C++', 'Windows Driver Kit', 'KMDF/ACX', 'WASAPI', 'FFmpeg', 'Win32', 'CMake'],
			coverImage: {
				src: '/projects/ac3bridge/screenshot.png',
				alt: 'Panel de control de AC3Bridge mostrando los niveles por canal y el estado del puente en funcionamiento',
				width: 450,
				height: 649,
			},
			links: {
				repo: 'https://github.com/francot77/AC3Bridge',
			},
			highlights: [
				'Driver de kernel en KMDF/ACX que expone un dispositivo virtual de 5.1 a Windows',
				'Captura de la mezcla en user mode con WASAPI loopback y codificación AC-3 en tiempo real',
				'Entrega como bitstream IEC 61937 al dispositivo digital en modo exclusivo',
				'Panel de control con niveles por canal y selección de salida verificada por sondeo'
			],
			caseStudy: {
				problem: 'El S/PDIF óptico transporta solo dos canales de PCM, así que enviar 5.1 requiere comprimir el audio a AC-3. Windows no lo hace por software, y las placas que lo resuelven por hardware son minoría: en el resto, cualquier programa que reproduzca 5.1 termina mezclado a estéreo al elegir la salida digital.',
				context: 'El proyecto cubre desde un driver de modo kernel hasta una aplicación de escritorio, sobre hardware de audio real y una salida digital conectada a un receiver.',
				architecture: 'Un driver KMDF/ACX expone un endpoint de reproducción 5.1 que Windows materializa como un dispositivo más; el driver descarta las muestras y existe únicamente para que ese endpoint sea real, ya que no puede crearse desde una aplicación. La mezcla se captura después en user mode con WASAPI loopback, se aplica ganancia por canal, se codifica a AC-3 con FFmpeg, se enmarca como IEC 61937 y se entrega al dispositivo digital en modo exclusivo.',
				decisions: [
					'Mantener el driver como un sumidero sin procesamiento y capturar el audio en user mode, dejando la lógica de riesgo fuera del kernel.',
					'Elegir el dispositivo de salida sondeando cuáles aceptan un portador IEC 61937 AC-3, en lugar de confiar en el orden de enumeración.',
					'Registrar cada estado del ciclo de vida del driver en el registro de Windows, porque la salida de depuración del kernel no es utilizable en ejecuciones desatendidas.'
				],
				challenges: [
					'El endpoint se enumeraba correctamente pero no podía abrirse en modo compartido hasta implementar el stream de tiempo real y declarar el soporte de notificaciones de buffer.',
					'Sostener un reloj de presentación estable en el driver sin bloquear el camino de tiempo real.'
				],
				development: 'El desarrollo separó el driver, el motor de puente reutilizable y la interfaz, de modo que la aplicación de escritorio y la versión de línea de comandos comparten un único motor.',
				validation: 'El repositorio incluye pruebas unitarias y cuatro compuertas de verificación en tiempo de ejecución contra el driver instalado: estado del dispositivo, contrato del endpoint, reproducción real de seis canales y captura por loopback comparando la energía por canal contra amplitudes conocidas. También hay una prueba de remoción del dispositivo durante la reproducción. No se publican mediciones de latencia extremo a extremo.',
				outcome: 'El resultado es una cadena funcional entre software que reproduce 5.1 y un receiver conectado por óptico, publicada como código abierto. El driver está firmado con un certificado de prueba, por lo que requiere el modo de prueba de Windows.',
				technologies: ['C++', 'Windows Driver Kit', 'KMDF', 'ACX', 'WASAPI', 'FFmpeg', 'IEC 61937', 'Win32', 'CMake']
			}
		},
];
