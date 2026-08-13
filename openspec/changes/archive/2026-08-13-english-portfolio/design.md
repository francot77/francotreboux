# Design: Deliver the Portfolio in English

## Technical Approach

Use explicit, prerendered Spanish and English route entries that pass a `Locale` and `PageId` into shared page views. A typed localization module owns route equivalence, UI copy, metadata, and projections of stable portfolio records. Locale is therefore route-selected, never inferred from browser state, while existing Spanish URLs remain authoritative.

## Architecture Decisions

| Decision | Alternatives | Rationale |
|---|---|---|
| Explicit route files; no Astro i18n redirects | Astro i18n routing; runtime detection | Keeps the six Spanish URLs byte-for-byte stable and makes `/en/*` deterministic. |
| Shared page views behind thin route entries | Duplicate English pages | Preserves one rendering implementation per equivalent page and limits drift. |
| `Locale = 'es' \| 'en'`, exhaustive dictionaries, stable-ID projections | Mutable global locale; fallback strings | `satisfies Record<Locale, …>` and projection lookup make omissions type/test failures; neutral slugs, dates, media, technologies, and URLs remain shared. |
| Central `PageId` route table | String concatenation | Provides navigation, canonical/alternate URLs, and equivalent-page switching from one contract. Only contact routes copy `enviado=1`. |

## Data Flow

```text
route entry -> locale + PageId -> shared view -> copy + localized projections
                                      |                 |
                                      +-> BaseLayout -> route map -> canonical/hreflang/switch
contact form -> locale field -> /api/contact -> validate locale -> localized response/email
```

## File Changes

| File | Action | Description |
|---|---|---|
| `src/i18n/localization.ts` | Create | Define `Locale`, `PageId`, exhaustive UI/page metadata dictionaries, route map, query-policy helper, and localized record projectors. |
| `src/data/{projects,experience,certifications,skills,soldProducts}.ts` | Modify | Separate stable record identity/assets/links from required `es`/`en` translatable fields; export locale projections preserving order and IDs. |
| `src/views/{Home,Projects,Experience,About,Certifications,Contact}View.astro` | Create | Hold the current page markup once, parameterized by locale content. |
| `src/pages/{index,proyectos,experiencia,acerca,certificaciones,contacto}.astro` | Modify | Become thin Spanish wrappers without changing public paths. |
| `src/pages/en/{index,projects,experience,about,certifications,contact}.astro` | Create | Thin `en` wrappers using the same views. |
| `src/layouts/BaseLayout.astro` | Modify | Require locale/page ID; emit localized title, description, `lang`, `og:locale`, absolute self-canonical, reciprocal `es`/`en`, and Spanish `x-default`; pass locale/routes to shell components and localize JSON-LD role. |
| `src/components/{Header,Footer,ContactForm,ProjectCard,ProjectMedia,Timeline,SoldProductCard,SoldProductGallery}.astro` | Modify | Accept copy/locale props; remove embedded Spanish labels; add equivalent-page switch with current language indicated. |
| `src/pages/api/contact.ts` | Modify | Add validated `locale`, default omission to `es`, reject unsupported values with status 400, and localize responses plus email framing without changing parsing, honeypot, SMTP, or rate limits. |
| `astro.config.mjs`, `src/pages/robots.txt` | Modify | Keep manual routing; ensure sitemap discovers all 12 canonical pages and robots references the configured site sitemap. |
| `src/i18n/localization.test.ts`, `src/layouts/BaseLayout.test.ts`, `src/pages/api/contact.test.ts` | Create | Cover route/content/metadata/API contracts. |
| Existing component tests | Modify | Assert both locales and Spanish regressions through Astro Container. |

## Interfaces / Contracts

```ts
type Locale = 'es' | 'en';
type PageId = 'home' | 'projects' | 'experience' | 'about' | 'certifications' | 'contact';
type RoutePair = Record<Locale, `/${string}`>;
type Localized<T> = { readonly [L in Locale]: T };
```

`localization.ts` exports `routes: Record<PageId, RoutePair>`, `copy: Localized<PortfolioCopy>`, `project(locale, records)`, and `equivalentUrl(pageId, targetLocale, searchParams)`. No fallback operator may substitute Spanish for missing English content.

## Testing Strategy

| Layer | RED-first coverage |
|---|---|
| Unit | All 12 paths are unique/equivalent; only contact preserves `enviado=1`; every localized field exists; stable projections match; date labels and UI copy are English. |
| Component | Layout canonical/alternates/lang/OG; switch accessibility/current state; cards, gallery, timeline, footer, and form render locale-correct names and statuses. |
| API | JSON/form/multipart, omitted/valid/unsupported locale, validation, honeypot, 429, localized email framing, and unchanged status contract. |
| Acceptance | `pnpm test`, `pnpm typecheck`, `pnpm lint`, sitemap/robots assertions; report the known Windows EPERM build failure separately. |

## Threat Matrix

Routing is covered by the route-table RED tests above. The reference matrix rows—documentation-like paths, Git repository selection, commit state, push state, and PR commands—are all **N/A** because this change does not classify executables or invoke shell/VCS/PR processes.

## Migration / Rollout

No data migration or redirect rollout. Deliver in one PR. To control review load, move markup without redesign, keep route wrappers declarative, centralize copy, and avoid snapshots/duplicated fixtures. Tasks must forecast authored churn; if it exceeds 400 lines, automatic apply is blocked until the required `size:exception` is recorded for the fixed single-PR strategy. Rollback is one PR revert.

## Open Questions

None.
