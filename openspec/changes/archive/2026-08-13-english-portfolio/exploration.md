# English Portfolio Exploration

## Exploration: English portfolio

### Current State

The site is an Astro 5.17 portfolio using server output with the Vercel adapter, Astro sitemap integration, reusable `.astro` components, and typed content modules. The current Spanish routes are `/`, `/proyectos`, `/experiencia`, `/acerca`, `/certificaciones`, and `/contacto`; they are mostly prerendered even though the project output is server-rendered.

Language-dependent UI is embedded in page files and shared components. `BaseLayout.astro` hardcodes `lang="es"`, `og:locale="es_ES"`, and Spanish metadata behavior. `Header.astro`, `Footer.astro`, `ContactForm.astro`, `ProjectCard.astro`, and page components contain Spanish labels, accessible names, status messages, and navigation URLs. Portfolio records in `src/data/projects.ts`, `experience.ts`, and `certifications.ts` also contain translatable descriptions, summaries, highlights, date labels, and image alt text. `src/consts.ts` contains shared identity, site description, and social/contact data.

The repository has no domain specs yet beyond the OpenSpec configuration. The testing baseline is 6 Vitest files and 17 passing tests; `astro check` and ESLint pass. The configured production build has a known Windows EPERM failure when the Vercel adapter creates a pnpm symlink for `simple-icons`; this is an environment limitation, not evidence of an i18n defect.

### Affected Areas

- `astro.config.mjs` — configure supported locales and the routing behavior, or deliberately use manual routing if preserving existing URLs cannot be expressed safely by the built-in strategy.
- `src/pages/*.astro` — retain the existing Spanish page files and add the equivalent English route tree under `src/pages/en/` (or an equivalent localized-page structure).
- `src/layouts/BaseLayout.astro` — accept locale-aware metadata and alternate URLs; emit the correct document language, canonical URL, Open Graph locale, and likely `hreflang` links.
- `src/components/Header.astro`, `src/components/Footer.astro` — make labels, links, current-language state, and the language switcher locale-aware.
- `src/components/ContactForm.astro` and `src/pages/api/contact.ts` — translate form UI and client/server validation messages while preserving the existing endpoint and anti-spam/rate-limit behavior.
- `src/components/ProjectCard.astro`, `src/components/ProjectMedia.astro`, `src/components/Timeline.astro`, `src/components/Badge.astro`, and `src/components/SoldProductCard.astro` — replace embedded UI/accessibility strings with locale-provided copy; preserve shared visual and interaction behavior.
- `src/data/projects.ts`, `src/data/experience.ts`, `src/data/certifications.ts`, `src/data/skills.ts`, and `src/data/soldProducts.ts` — provide English content without mutating the Spanish source content or changing stable project slugs and external links.
- `src/consts.ts` — provide localized site descriptions/role metadata if they are not moved into a locale content module.
- `src/pages/robots.txt` and sitemap output — verify that both locale trees are discoverable and that no incorrect canonical or alternate URLs are generated.
- `src/components/*.test.ts`, new route/content tests, and `package.json` scripts — cover locale selection, route preservation, translated rendering, and quality checks.

### Routing Strategy

The recommended public URL contract is:

| Language | Home | Secondary pages |
|---|---|---|
| Spanish (preserved) | `/` | `/proyectos`, `/experiencia`, `/acerca`, `/certificaciones`, `/contacto` |
| English (new) | `/en/` | `/en/projects`, `/en/experience`, `/en/about`, `/en/certifications`, `/en/contact` |

Astro's built-in i18n configuration supports locale declarations and localized routing, but the requirement to preserve the existing unprefixed Spanish URLs means the configuration must be validated carefully against Astro 5 behavior. A manual route/page mapping is the safest fallback if enabling built-in routing would redirect or reinterpret the current Spanish URLs. The implementation should not rename, redirect, or duplicate the existing Spanish routes unless a later requirement explicitly asks for that.

### Translation and Content Architecture

Use a shared locale contract with separate Spanish and English dictionaries/content projections. Keep stable, language-neutral domain data (slugs, technologies, image dimensions, URLs, dates in machine format) shared where practical, while storing translated fields together by locale or in parallel typed modules. The page and shared components should receive a locale copy object rather than branching on individual strings.

Recommended boundaries:

1. A locale type and copy dictionaries for navigation, headings, buttons, form messages, accessible labels, footer text, and metadata.
2. Locale-specific portfolio records for project descriptions/highlights/alt text, experience summaries/highlights/location labels, certification names/alt text where translation is appropriate, and sold-product copy.
3. A small locale-aware URL helper so every internal link from English pages stays under `/en/` and Spanish links remain unchanged.
4. A language switcher mapping equivalent pages, with a defined fallback for pages that do not have a counterpart.

Avoid machine-translating content at render time, duplicating component implementations, or using a single mutable data array whose language is inferred globally. Those approaches increase coupling and make omissions difficult to detect.

### SEO and Accessibility

Each English page MUST set `lang="en"`, English title/description, `og:locale="en_US"` (or the chosen English regional locale), and an English canonical URL. Spanish pages MUST keep their current language metadata. Equivalent Spanish/English pages SHOULD expose reciprocal `hreflang` links, including an `x-default` policy only if the chosen routing behavior gives it a meaningful target. Sitemap generation MUST include both route sets without emitting duplicate canonical URLs.

All translated visible text and non-decorative image alt text MUST be English on English routes. Accessible names, `aria-label` values, form labels, validation/status messages, skip-link text, dialog/gallery labels, and technology-list labels are part of the translation surface. The language switcher MUST be keyboard reachable, have a clear accessible name, identify the current language, and preserve the equivalent page rather than always sending users to home.

The contact form MUST preserve semantic labels, required constraints, live status messaging, honeypot behavior, and API validation. The API response text and email subject/body may be localized based on an explicit locale field, but the endpoint contract and rate limits should remain shared.

### Scope

In scope:

- Complete English equivalents for the home page and all current Spanish secondary pages.
- New `/en/` routes with consistent navigation, footer, forms, interactions, and translated content.
- A user-visible language switcher between equivalent Spanish and English routes.
- Locale-aware document metadata, canonical/alternate links, sitemap verification, and accessible copy.
- Typed translation/content architecture and focused tests for both route families.

Out of scope:

- Rewriting or correcting the Spanish copy unless required to expose shared translation keys.
- New portfolio projects, redesign, visual restyling, or interaction redesign.
- Additional languages, locale-specific domains, automatic browser-language redirects, or CMS/content management.
- Translating external destinations, technology names, company names, certificate titles whose official names should remain unchanged, or source code in linked repositories.
- Changing contact providers, SMTP configuration, spam policy, or deployment adapter.

### Approaches

1. **Explicit English route tree with shared localized components** — retain Spanish files and add English pages that select English data/copy while reusing components and layout.
   - Pros: preserves all existing URLs exactly; easy to reason about; supports localized slugs and SEO; minimizes runtime locale inference.
   - Cons: adds route entry files; requires disciplined shared component APIs and translation completeness checks.
   - Effort: Medium

2. **Astro built-in i18n with localized route folders** — configure `locales`, `defaultLocale`, and routing, then place both locale trees under localized folders.
   - Pros: aligns with Astro's supported i18n model; provides framework locale utilities and a path toward more languages.
   - Cons: Astro 5 routing defaults/prefix behavior may conflict with the unprefixed Spanish URL preservation requirement; migration risk is higher; still requires content and component localization.
   - Effort: Medium/High

3. **Runtime dictionary selection from one route tree** — infer locale from a request/path and render one set of pages.
   - Pros: fewer page files.
   - Cons: conflicts with static/prerendered page conventions; makes canonical/link generation and route equivalence less explicit; increases request-time and testing complexity.
   - Effort: High

### Recommendation

Use Approach 1 as the implementation baseline: explicit `/en/` pages, shared locale-aware components, and typed English content modules. Investigate Astro's built-in i18n only as an implementation aid, not as a reason to change the established Spanish URL contract. This provides the lowest-risk migration path and fits the current page-per-route architecture.

For the 400-line review budget, keep the work as one PR only if the task forecast confirms that authored additions plus deletions remain at or below 400 lines. A complete translation of six pages, shared UI, data, tests, and metadata is likely **High** risk for that budget; the proposal/tasks phase should count authored changes before apply and either compress the architecture into data-driven route wrappers or explicitly record a size exception under the requested single-PR strategy.

### Edge Cases

- `/en/` must not accidentally fall back to Spanish content when a translation key or record is missing; missing translations should fail checks or use an explicit, reviewed fallback policy.
- Language switching from `/contacto?enviado=1` must preserve or intentionally discard the query state; success messaging must not appear in the wrong language.
- English internal links must not leak to Spanish routes, and Spanish links must not gain an `/en` prefix.
- `Astro.url.pathname`, trailing slashes, query strings, and deployment base URLs must produce stable canonical and alternate URLs.
- Date ranges such as `Actualidad`, remote/presential labels, accents, and locale-specific punctuation need deliberate English formatting without changing machine-readable dates.
- Image alt text and gallery captions must be translated independently from project titles; empty decorative alt text must remain empty.
- Certificate and external project URLs may not have English equivalents; keep the verified original destinations.
- Server-side contact requests do not inherently know the page language. If API messages/emails are localized, submit an explicit locale value and validate it.
- Sitemap and robots behavior must be checked in the server/Vercel deployment mode as well as local Astro output.

### Likely Implementation Size

Expected authored scope is approximately 300–500 changed lines for a compact, data-driven design, or 500–800 lines if English page markup is duplicated literally. The recommended architecture should target the lower range by sharing layout/components and keeping route files thin, but complete translated content and tests make the 400-line budget uncertain. No code should be implemented during exploration.

### Risks

- Built-in Astro i18n configuration could alter or redirect existing Spanish URLs if prefix/default-locale settings are incorrect.
- Translation strings are currently scattered across Astro markup, component scripts, ARIA labels, and API responses, so an incomplete inventory can leave mixed-language pages.
- Duplicated page markup can exceed the review budget and drift between languages.
- SEO mistakes can create duplicate canonical URLs or omit one locale from discovery.
- The existing Windows Vercel/pnpm symlink EPERM build limitation may obscure unrelated build verification results.
- A translated form UI without a locale-aware API message policy could produce inconsistent user feedback.

### Ready for Proposal

Yes. The next phase should formalize the `/en/` route contract, translation/content schema, language-switching behavior, metadata requirements, and the single-PR 400-line budget decision. It should explicitly retain Spanish routes and treat Astro built-in i18n as conditional pending a focused routing validation.
