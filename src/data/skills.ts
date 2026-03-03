export type SkillGroup = {
	title: string;
	items: string[];
};

export const skillGroups: SkillGroup[] = [
	{
		title: 'Frontend',
		items: ['Astro', 'TypeScript', 'Accesibilidad', 'CSS', 'Performance'],
	},
	{
		title: 'Backend',
		items: ['Node.js', 'APIs', 'Autenticación', 'Bases de datos'],
	},
	{
		title: 'Tooling',
		items: ['Git', 'CI/CD', 'Testing', 'Observabilidad básica'],
	},
];

