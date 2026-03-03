export type Certification = {
	name: string;
	issuer: string;
	year: number;
	badgeLabel: string;
	url?: string;
	image?: string;
	imageAlt?: string;
};

export const certifications: Certification[] = [
	{
		name: 'CS50x – Introduction to Computer Science',
		issuer: 'Harvard University',
		year: 2025,
		badgeLabel: '',
		url: 'https://certificates.cs50.io/eddd9fba-df4c-4ed4-a6d1-8eac880d76ba.png?size=letter',
		image: '/harvard.webp',
		imageAlt: 'Certificado CS50x',
	},
	{
		name: 'Introducción al desarrollo con IA',
		issuer: 'BIG School',
		year: 2025,
		badgeLabel: 'IA',
		image: '/big.webp',
		url: 'https://drive.google.com/file/d/1U1W1Q9y25zEpoqk8FOIpKw8uVA1r1ZLx/view',
	},
	{
		name: 'Responsive Web Design',
		issuer: 'FreeCodeCamp.com',
		year: 2024,
		badgeLabel: 'RWD FCC',
		image: '/fcc.webp',
		url: 'https://www.freecodecamp.org/certification/fcc5d6192d4-a91e-49bf-a7ec-6742f0885395/responsive-web-design',
	},
	{
		name: 'SQL',
		issuer: 'Boot.dev',
		year: 2025,
		badgeLabel: 'SQL',
		image: '/bootdev.webp',
		url: 'https://www.boot.dev/certificates/65aa723a-471d-440e-9be8-8ec7ba88324b',
	},
	{
		name: 'Functional Programing in Python',
		issuer: 'Boot.dev',
		year: 2025,
		badgeLabel: 'FPP',
		image: '/bootdev.webp',
		url: 'https://www.boot.dev/certificates/278b4bff-e498-4812-923f-9c154e716a6a',
	}, {
		name: 'Code in Python',
		issuer: 'Boot.dev',
		year: 2025,
		badgeLabel: 'LCP',
		image: '/bootdev.webp',
		url: 'https://www.boot.dev/certificates/05f43631-acc0-4568-9ab3-ea6dfd9f551d',
	}, {
		name: 'Object Oriented programing in Python',
		issuer: 'Boot.dev',
		year: 2025,
		badgeLabel: 'OOPP',
		image: '/bootdev.webp',
		url: 'https://www.boot.dev/certificates/9be92f33-2fc9-467f-9967-8009cf70397f',
	}, {
		name: 'Linux',
		issuer: 'Boot.dev',
		year: 2025,
		badgeLabel: 'Linux',
		image: '/bootdev.webp',
		url: 'https://www.boot.dev/certificates/dda48837-530c-4ac1-8367-2d5d0042164f',
	}, {
		name: 'Git',
		issuer: 'Boot.dev',
		year: 2025,
		badgeLabel: 'Git',
		image: '/bootdev.webp',
		url: 'https://www.boot.dev/certificates/e9b8e292-cb5c-4396-8025-8c03b09048c7',
	},
];
