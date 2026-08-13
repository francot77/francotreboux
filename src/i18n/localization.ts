export type Locale = 'es' | 'en';
export type PageId = 'home' | 'projects' | 'experience' | 'about' | 'certifications' | 'contact';
import type { Project } from '../data/projects';
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
};

export const copy: Record<Locale, PortfolioCopy> = {
	es: {
		nav: { home: 'Inicio', projects: 'Proyectos', experience: 'Experiencia', about: 'Acerca de mí', certifications: 'Certificaciones', contact: 'Contacto' },
		form: { submit: 'Enviar mensaje' }, dates: { present: 'Actualidad' }, meta: { locale: 'es_ES', description: 'Portfolio personal: proyectos, experiencia, habilidades, certificaciones y contacto.' },
	},
	en: {
		nav: { home: 'Home', projects: 'Projects', experience: 'Experience', about: 'About me', certifications: 'Certifications', contact: 'Contact' },
		form: { submit: 'Send message' }, dates: { present: 'Present' }, meta: { locale: 'en_US', description: 'Personal portfolio: projects, experience, skills, certifications, and contact.' },
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
} as const;

export function localizeProjects(locale: Locale, records: readonly Project[]): Project[] {
	if (locale === 'es') return records.map((record) => ({ ...record }));
	return records.map((record) => {
		const translation = projectTranslations[record.slug as keyof typeof projectTranslations];
		if (!translation) throw new Error(`Missing English project translation: ${record.slug}`);
		return { ...record, description: translation.description, highlights: 'highlights' in translation ? [...translation.highlights] : record.highlights, coverImage: record.coverImage && 'coverAlt' in translation ? { ...record.coverImage, alt: translation.coverAlt } : record.coverImage };
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
