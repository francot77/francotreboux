export type SkillGroup = {
	title: string;
	items: string[];
};

export const skillGroups: SkillGroup[] = [
	{
		title: 'Frontend',
		items: ['React', 'TypeScript', 'CSS', 'JavaScript', 'HTML5', 'Flutter', 'React Native'],
	},
	{
		title: 'Backend / Infra',
		items: ['Node.js', 'Next.js', 'SQL', 'MongoDB', 'Supabase', 'RabbitMQ'],
	},
	{
		title: 'Tooling',
		items: ['Git', 'CI/CD', 'Testing'],
	},
	{
		title: 'Systems / Embedded',
		items: ['C++', 'C# / .NET', 'ESP32', 'Arduino', 'Networking'],
	},
];
