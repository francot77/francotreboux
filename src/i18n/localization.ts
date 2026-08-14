export type Locale = 'es' | 'en';
export type PageId = 'home' | 'projects' | 'experience' | 'about' | 'certifications' | 'contact';
import type { CaseStudy, Project } from '../data/projects';
import type { ExperienceItem } from '../data/experience';
import type { Certification } from '../data/certifications';
import type { SkillGroup } from '../data/skills';
import type { SoldProduct } from '../data/soldProducts';

export const locales = ['es', 'en'] as const;
export const pageIds = ['home', 'projects', 'experience', 'about', 'certifications', 'contact'] as const;

export const routes: Record<PageId, Record<Locale, string>> = {
	home: { es: '/', en: '/en/' },
	projects: { es: '/proyectos', en: '/en/projects' },
	experience: { es: '/experiencia', en: '/en/experience' },
	about: { es: '/acerca', en: '/en/about' },
	certifications: { es: '/certificaciones', en: '/en/certifications' },
	contact: { es: '/contacto', en: '/en/contact' },
};

type PortfolioCopy = {
	nav: { home: string; projects: string; experience: string; about: string; certifications: string; contact: string };
	form: { submit: string };
	dates: { present: string };
	meta: { locale: string; description: string };
	home: { role: string; intro: string; availability: string; linkedin: string };
	howIWork: { title: string; subtitle: string; steps: { title: string; description: string }[]; method: string; judgment: string; tooling: string; previous: string; next: string; stepLabel: string };
};

export const copy: Record<Locale, PortfolioCopy> = {
	es: {
		nav: { home: 'Inicio', projects: 'Proyectos', experience: 'Experiencia', about: 'Acerca de mí', certifications: 'Certificaciones', contact: 'Contacto' },
			form: { submit: 'Enviar mensaje' }, dates: { present: 'Actualidad' }, meta: { locale: 'es_ES', description: 'Portfolio personal: proyectos, experiencia, habilidades, certificaciones y contacto.' }, home: { role: 'Full Stack Software Engineer', intro: 'Desarrollo productos web con TypeScript/JavaScript, React/Next.js y Node.js, desde interfaces hasta APIs, sistemas backend e integraciones.', availability: 'Disponible para oportunidades de ingeniería de software y proyectos freelance.', linkedin: 'Conectá en LinkedIn' }, howIWork: { title: 'Cómo trabajo', subtitle: 'Trabajo principalmente con agentes de IA dentro de un proceso de Spec-Driven Development.', steps: [{ title: 'Definir', description: 'Entiendo el problema, el contexto, las restricciones y el resultado buscado.' }, { title: 'Especificar', description: 'Lo convierto en requisitos, criterios de aceptación y un límite claro de implementación.' }, { title: 'Orquestar', description: 'Delego una tarea acotada a un agente con el contexto necesario y el resultado esperado. Los agentes aceleran investigación, implementación, debugging e iteración dentro de este proceso de SDD, sin reemplazar la revisión ni la validación.' }, { title: 'Validar', description: 'Reviso el cambio, corro tests, inspecciono evidencia de runtime y la comparo con la especificación. Tomo las decisiones, reviso cada cambio y valido que el resultado responda al problema original.' }, { title: 'Iterar', description: 'Corrijo las brechas y repito hasta que la evidencia respalda el resultado. Gentle es el harness de orquestación que uso para coordinar este trabajo.' }], method: 'Los agentes aceleran trabajo acotado de investigación, implementación, debugging e iteración dentro de este proceso de SDD; la revisión y la validación son parte del proceso.', judgment: 'Tomo las decisiones, reviso cada cambio y valido que el resultado responda al problema original.', tooling: 'Gentle es el harness de orquestación que uso para coordinar este trabajo.', previous: 'Paso anterior', next: 'Paso siguiente', stepLabel: 'Paso' },
	},
	en: {
		nav: { home: 'Home', projects: 'Projects', experience: 'Experience', about: 'About me', certifications: 'Certifications', contact: 'Contact' },
			form: { submit: 'Send message' }, dates: { present: 'Present' }, meta: { locale: 'en_US', description: 'Personal portfolio: projects, experience, skills, certifications, and contact.' }, home: { role: 'Full Stack Software Engineer', intro: 'I build web products with TypeScript/JavaScript, React/Next.js, and Node.js, from interfaces to backend systems and integrations.', availability: 'Available for software engineering opportunities and freelance projects.', linkedin: 'Connect on LinkedIn' }, howIWork: { title: 'How I work', subtitle: 'I work primarily with AI agents inside a Spec-Driven Development process.', steps: [{ title: 'Define', description: 'I understand the problem, context, constraints, and desired outcome.' }, { title: 'Specify', description: 'I turn it into requirements, acceptance criteria, and a clear implementation boundary.' }, { title: 'Orchestrate', description: 'I delegate a bounded task to an agent with the necessary context and expected output. AI agents accelerate bounded research, implementation, debugging, and iteration inside this SDD process, while review and validation remain part of the process.' }, { title: 'Validate', description: 'I review the change, run tests, inspect runtime evidence, and compare it with the specification. I make the decisions, review every change, and validate that the result answers the original problem.' }, { title: 'Iterate', description: 'I correct gaps and repeat until the evidence supports the result. Gentle is the orchestration harness I use to coordinate this work.' }], method: 'AI agents accelerate bounded research, implementation, debugging, and iteration inside this SDD process; review and validation are part of the process.', judgment: 'I make the decisions, review every change, and validate that the result answers the original problem.', tooling: 'Gentle is the orchestration harness I use to coordinate this work.', previous: 'Previous step', next: 'Next step', stepLabel: 'Step' },
	},
};

export function getRoute(page: PageId, locale: Locale): string { return routes[page][locale]; }
export function getCopy(locale: Locale): PortfolioCopy { return copy[locale]; }
export function equivalentUrl(page: PageId, locale: Locale, searchParams?: URLSearchParams): string {
	const path = getRoute(page, locale);
	return page === 'contact' && searchParams?.get('enviado') === '1' ? `${path}?enviado=1` : path;
}

const projectTranslations = {
	fezlink: { description: 'SaaS platform for creators that turns a traditional bio link into a conversion analytics and optimization tool, built on an event-driven distributed architecture.', highlights: ['Event-driven architecture with asynchronous processing through Rust queues and workers', 'Event ingestion pipeline with in-memory batching and database bulk writes', 'SEO- and performance-optimized public frontend at the edge'] },
	feztime: { description: 'Scheduling SaaS for small and medium businesses, focused on operational automation and frictionless bookings.', highlights: ['Real-time availability and booking management', 'Administrative dashboard for schedules and customers', 'Multi-tenant-ready architecture'] },
	formulawheelbridge: { description: 'Turns DIY steering-wheel controls into a wireless gamepad for Windows.', coverAlt: 'FormulaWheelBridge panel showing wheel inputs and the vJoy connection' },
	ac3bridge: {
		description: 'Carries 5.1 surround over optical output on Windows by encoding to AC-3 in real time, for machines whose hardware does not provide it.',
		coverAlt: 'AC3Bridge control panel showing per-channel levels and the bridge running',
		highlights: [
			'KMDF/ACX kernel driver that exposes a virtual 5.1 device to Windows',
			'User-mode capture of the engine mix through WASAPI loopback with real-time AC-3 encoding',
			'Delivery as an IEC 61937 bitstream to the digital device in exclusive mode',
			'Control panel with per-channel levels and an output list verified by probing'
		]
	},
} as const;

const caseStudyTranslations: Record<string, CaseStudy> = {
	fezlink: {
		problem: 'A biolink platform needed to turn public interactions into useful signals for analyzing and improving conversion.',
		context: 'The product separates the public frontend, dashboard, and API, while event processing must not couple background work to the public experience.',
		architecture: 'The solution combines a Next.js public frontend at the edge, a Node.js API, and asynchronous processing through RabbitMQ and Rust workers. MongoDB receives bulk writes after events are grouped in memory; deployments use Vercel and Railway.',
		decisions: [
			'Separate the public frontend, dashboard, and API to keep responsibilities clear.',
			'Use queues and workers to decouple event ingestion from asynchronous processing.',
			'Batch events in memory and use bulk writes to reduce individual database operations.'
		],
		challenges: ['Coordinate the event path across components with different responsibilities and processing times.'],
		development: 'Development focused on splitting the system by responsibility and designing an explicit pipeline from ingestion to persistence.',
		validation: 'The repository does not document specific tests or published performance metrics.',
		outcome: 'The result is a distributed, event-driven foundation for a SaaS platform, without claiming undocumented scale or performance metrics.',
		technologies: ['Next.js', 'TypeScript', 'Node.js', 'Rust workers', 'RabbitMQ', 'MongoDB', 'Cloudflare Edge', 'Vercel', 'Railway']
	},
	formulawheelbridge: {
		problem: 'The physical controls of a DIY steering wheel needed to become inputs that Windows games could recognize.',
		context: 'The project integrates real hardware with desktop software and includes a public repository and a screenshot of its control panel.',
		architecture: 'The ESP32-S3 reads the controls through Arduino/C++, sends data over Wi-Fi using UDP, and a C#/.NET 8 application receives it and exposes it to Windows through vJoy.',
		decisions: [
			'Use Wi-Fi/UDP as the link between the microcontroller and desktop application.',
			'Keep hardware input, data transport, and gamepad emulation through vJoy as separate concerns.'
		],
		challenges: ['Translate physical control signals into a format that a Windows application and games can consume as gamepad input.'],
		development: 'Development connected Arduino/C++ firmware, UDP transport, and a WinForms interface in C#/.NET 8 around a physical device.',
		validation: 'Validation used real hardware and the input and vJoy connection view shown in the project screenshot; no latency or reliability metrics are published.',
		outcome: 'The project provides a functional bridge between DIY steering-wheel controls and a wireless Windows gamepad, with a public repository.',
		technologies: ['C#', '.NET 8', 'ESP32', 'Arduino/C++', 'Wi-Fi', 'UDP', 'vJoy']
	},
	ac3bridge: {
		problem: 'Optical S/PDIF carries only two channels of PCM, so sending 5.1 across it requires compressing the audio to AC-3. Windows does not do this in software, and the sound cards that solve it in hardware are a minority: on the rest, any program playing 5.1 ends up downmixed to stereo the moment the digital output is selected.',
		context: 'The project spans a kernel-mode driver through to a desktop application, running against real audio hardware and a digital output connected to a receiver.',
		architecture: 'A KMDF/ACX driver exposes a 5.1 render endpoint that Windows materializes as an ordinary device; the driver discards the samples and exists only so that endpoint is real, since one cannot be created from an application. The mix is then captured in user mode through WASAPI loopback, per-channel gain is applied, FFmpeg encodes it to AC-3, the result is framed as IEC 61937, and it is delivered to the digital device in exclusive mode.',
		decisions: [
			'Keep the driver a sink with no processing and capture the audio in user mode, leaving the risky logic outside the kernel.',
			'Choose the output device by probing which ones accept an IEC 61937 AC-3 carrier rather than trusting enumeration order.',
			'Record every driver lifecycle status in the Windows registry, because kernel debug output is unusable in unattended runs.'
		],
		challenges: [
			'The endpoint enumerated correctly yet could not be opened in shared mode until the real-time stream was implemented and buffer-notification support was declared.',
			'Holding a stable presentation clock in the driver without blocking the real-time path.'
		],
		development: 'Development separated the driver, a reusable bridge engine, and the interface, so the desktop application and the command-line version share a single engine.',
		validation: 'The repository includes unit tests and four runtime gates against the installed driver: device state, endpoint contract, real six-channel playback, and loopback capture comparing per-channel energy against known amplitudes. A device-removal-during-playback test is also included. No end-to-end latency measurements are published.',
		outcome: 'The result is a working chain between software playing 5.1 and a receiver connected over optical, released as open source. The driver is signed with a test certificate, so it requires Windows test mode.',
		technologies: ['C++', 'Windows Driver Kit', 'KMDF', 'ACX', 'WASAPI', 'FFmpeg', 'IEC 61937', 'Win32', 'CMake']
	}
};

export function localizeProjects(locale: Locale, records: readonly Project[]): Project[] {
	if (locale === 'es') return records.map((record) => ({ ...record }));
	return records.map((record) => {
		const translation = projectTranslations[record.slug as keyof typeof projectTranslations];
		if (!translation) throw new Error(`Missing English project translation: ${record.slug}`);
		return {
			...record,
			description: translation.description,
			highlights: 'highlights' in translation ? [...translation.highlights] : record.highlights,
			coverImage: record.coverImage && 'coverAlt' in translation ? { ...record.coverImage, alt: translation.coverAlt } : record.coverImage,
			caseStudy: record.caseStudy ? caseStudyTranslations[record.slug] ?? { ...record.caseStudy } : record.caseStudy,
		};
	});
}

const experienceTranslations = [
	{ summary: 'Design and development of proprietary SaaS products with distributed, event-driven architecture.', highlights: ['Designed event-driven architecture using RabbitMQ and Rust workers for asynchronous, decoupled processing.', 'Implemented event tracking with in-memory batching and MongoDB bulk writes.', 'Developed a Node.js API with clear separation of responsibilities and background processing.', 'Built an SEO-optimized public frontend with Next.js on Vercel and a React SPA dashboard.'] },
	{ role: 'Telecommunications Technician', summary: 'Maintenance and diagnosis of FTTH and HFC network infrastructure in production environments.', highlights: ['Resolved incidents in fiber-optic (FTTH) and coaxial (HFC) networks.', 'Diagnosed and maintained network infrastructure preventively and correctively.', 'Worked with provisioning systems and connectivity monitoring.'] },
	{ summary: 'Development of a mobile application for a logistics company focused on geolocation and data synchronization.', highlights: ['Implemented real-time GPS tracking.', 'Synchronized data between the mobile app and backend.', 'Integrated billing and operational management systems.'] },
] as const;

export function localizeExperience(locale: Locale, records: readonly ExperienceItem[]): ExperienceItem[] {
	return records.map((record, index) => locale === 'es' ? { ...record } : { ...record, summary: experienceTranslations[index].summary, highlights: [...experienceTranslations[index].highlights], role: 'role' in experienceTranslations[index] ? experienceTranslations[index].role : record.role, end: record.end === 'Actualidad' ? undefined : record.end });
}

export function localizeCertifications(locale: Locale, records: readonly Certification[]): Certification[] {
	const names = ['CS50x – Introduction to Computer Science', 'Introduction to AI development', 'Responsive Web Design', 'SQL', 'Functional Programming in Python', 'Code in Python', 'Object-Oriented Programming in Python', 'Linux', 'Git'];
	return records.map((record, index) => locale === 'es' ? { ...record } : { ...record, name: names[index], imageAlt: record.imageAlt ? 'CS50x certificate' : record.imageAlt });
}

export function localizeSkills(locale: Locale, records: readonly SkillGroup[]): SkillGroup[] {
	return records.map((record, index) => locale === 'en' && index === 1 ? { ...record, title: 'Backend / Infrastructure' } : { ...record });
}

export function localizeSoldProducts(locale: Locale, records: readonly SoldProduct[]): SoldProduct[] {
	return records.map((record) => locale === 'es' ? { ...record } : { ...record, status: record.status === 'Proyecto privado' ? 'Private project' : 'Commercial product', summary: record.slug === 'saascomercio' ? 'Business management system for retailers, designed to centralize products, sales, inventory, and daily operations in one tool.' : 'E-commerce for a physical store with payment gateway integration and organic search optimization.', outcome: record.slug === 'saascomercio' ? ['Commercial product sold and delivered to an operating business', 'Counter and table sales flows with inventory control', 'Operations panel for managing products, customers, and suppliers'] : ['Online store with dynamic catalog', 'MercadoPago payment integration', 'Technical and content optimization for search engines'], coverImage: record.coverImage && { ...record.coverImage, alt: record.coverImage.alt.replace('Panel principal', 'Main dashboard'), caption: 'Main dashboard for checking business status' }, gallery: record.gallery?.map((image) => ({ ...image, alt: image.alt.replace('Panel principal', 'Main dashboard'), caption: 'Screen from daily business operations' })) });
}
