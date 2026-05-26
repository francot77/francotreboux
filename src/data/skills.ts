export type SkillGroup = {
	title: string;
	items: string[];
};

export const skillGroups: SkillGroup[] = [
	{
		title: 'Frontend',
		items: ['React', 'TypeScript', 'CSS', 'JavaScript', 'HTML5'],
	},
	{
		title: 'Backend / Infra',
		items: ['Node.js', 'Next.js', 'SQL', 'MongoDB', 'Supabase', 'RabbitMQ'],
	},
	{
		title: 'Tooling',
		items: ['Git', 'CI/CD', 'Testing'],
	},
];

