# Portfolio Personal (Astro + TypeScript)

Portfolio moderno y minimalista construido con Astro. Incluye páginas de inicio, proyectos, experiencia (línea de tiempo), acerca de mí (habilidades), certificaciones (badges) y contacto (formulario + redes).

## Requisitos

- Node.js 18+ (recomendado 20+)
- npm 9+

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abre `http://localhost:4321`.

## Build y preview

```bash
npm run build
npm run preview
```

## Typecheck

```bash
npm run typecheck
```

## Tests

```bash
npm run test
```

## Configuración del sitio

Edita los datos personales, URL y redes en:

- `src/consts.ts`

Importante para SEO:

- Actualiza `site` en `astro.config.mjs`
- Ajusta `src/pages/robots.txt` con tu dominio final

## Formulario de contacto

El formulario intenta enviar vía `/api/contact`. Si no hay configuración de email, la respuesta seguirá siendo correcta (sin entrega).

Para habilitar envío por SMTP, define estas variables de entorno:

- `SMTP_HOST`
- `SMTP_PORT` (por defecto 587)
- `SMTP_USER` (opcional según tu proveedor)
- `SMTP_PASS` (opcional según tu proveedor)
- `CONTACT_TO` (destinatario)
- `CONTACT_FROM` (opcional; por defecto igual a `CONTACT_TO`)

## Despliegue (Node)

Este proyecto usa `@astrojs/node` en modo `standalone` para soportar el endpoint de contacto.

1. Ejecuta el build:

```bash
npm run build
```

2. Arranca el servidor:

```bash
node ./dist/server/entry.mjs
```

Configura tus variables de entorno en tu plataforma (VPS, Render, Fly, etc.).

## Estructura

```text
src/
  components/   Componentes reutilizables
  data/         Datos tipados (proyectos, experiencia, etc.)
  layouts/      Layout base con SEO y scripts globales
  pages/        Rutas del sitio
  styles/       CSS global
  test/         Utilidades de tests
```
