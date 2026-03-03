export const SITE = {
    name: 'Franco Treboux',
    role: 'Full Stack Engenieer',
    location: 'Villa Elisa, Entre Rios, Argentina',
    email: 'francotreboux@gmail.com',
    siteUrl: 'https://tudominio.com',
    description:
        'Portfolio personal moderno: proyectos, experiencia, habilidades, certificaciones y contacto.',
    social: {
        linkedin: 'https://www.linkedin.com/in/franco-treboux/',
        github: 'https://github.com/francot77',
        x: '',
    },
} as const;

export type Site = typeof SITE;

