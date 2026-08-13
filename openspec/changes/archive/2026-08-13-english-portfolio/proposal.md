# Proposal: Deliver the Portfolio in English

## Intent

Give English-speaking visitors a complete, accessible portfolio without disrupting indexed Spanish pages. Spanish remains unprefixed; English uses `/en/`.

## Scope

### In Scope
- Preserve `/`, `/proyectos`, `/experiencia`, `/acerca`, `/certificaciones`, and `/contacto` unchanged.
- Add `/en/`, `/en/projects`, `/en/experience`, `/en/about`, `/en/certifications`, and `/en/contact` with translated content and UI.
- Add an accessible language switcher between equivalent pages.
- Localize metadata, reciprocal `hreflang`, sitemap discovery, forms, status messages, and accessible names.

### Out of Scope
- Spanish copy rewrites, redesigns, new content, more languages, automatic redirects, CMS adoption, or translated external destinations.
- Changes to contact infrastructure, anti-spam behavior, deployment, or stable slugs and links.

## Capabilities

### New Capabilities
- `localized-portfolio`: Preserved Spanish URLs, English routes, switching, translation, SEO, forms, and accessibility.

### Modified Capabilities
None; no existing domain specs are present.

## Approach

Retain Spanish pages and add thin English routes. Reuse locale-aware layouts/components backed by typed copy and content projections; share neutral IDs, dates, media, technologies, and URLs. Use a route map for links and page equivalence. Astro i18n may assist only if it preserves Spanish URLs; runtime translation and duplicated components are rejected.

## Affected Areas

| Area | Impact | Description |
|---|---|---|
| `src/pages/`, layouts, components | Modified/New | Routes and locale-aware rendering |
| `src/data/`, `src/consts.ts` | Modified/New | Typed localized content |
| `astro.config.mjs`, sitemap, robots | Modified | Locale discovery and URL metadata |
| tests | Modified/New | Route, translation, SEO, and accessibility checks |

## Delivery and Risks

| Risk | Mitigation |
|---|---|
| Mixed-language pages or links | Complete typed dictionaries and route tests |
| Canonical duplication | Reciprocal locale metadata and sitemap assertions |
| Forecast is 300–500 lines versus the 400-line single-PR budget | Target ≤400 through thin routes and shared data. If tasks forecast over 400, apply requires an explicit `size:exception`; otherwise apply is blocked. |

## Rollback Plan

Revert the single PR to remove `/en/` routes and localization wiring and restore Spanish-only defaults. No data migration is required.

## Dependencies

- Reviewed English copy; existing stack only.

## Success Criteria

- [ ] Every route renders in its declared language and switches to its equivalent.
- [ ] Spanish URLs remain unchanged; English links remain under `/en/`.
- [ ] SEO metadata, sitemap, form semantics, keyboard access, labels, alt text, and statuses are locale-correct.
- [ ] Tests, typecheck, and lint pass; the known Windows EPERM build limitation is reported separately.

## Proposal Question Round

Automatic execution assumes `en-US`, missing translations fail checks, query state survives only when equivalent, and official names remain untranslated. Specs must confirm these assumptions.
