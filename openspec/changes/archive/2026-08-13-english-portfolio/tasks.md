# Tasks: Deliver the Portfolio in English

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 550–750 authored lines |
| 400-line budget risk | High |
| Chained PRs recommended | Yes, but not selected |
| Suggested split | Keep one PR; require `size:exception` before apply |
| Delivery strategy | single-pr |
| Chain strategy | size-exception |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: size-exception
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Focused test command | Runtime harness | Rollback boundary |
|---|---|---|---|---|---|
| 1 | Add typed locale contract, route map, projections, and translated data | Single PR | `pnpm exec vitest run src/i18n/localization.test.ts` | `pnpm dev`; inspect all declared routes | Revert `src/i18n/` and localized data changes |
| 2 | Extract shared views, wire Spanish/English routes, shell, switcher, and SEO | Single PR | `pnpm exec vitest run src/layouts/BaseLayout.test.ts src/components` | `pnpm dev`; keyboard-test `/en/contact` and equivalent links | Revert views, route wrappers, layout, and component wiring |
| 3 | Localize contact API/form and complete acceptance verification | Single PR | `pnpm exec vitest run src/pages/api/contact.test.ts` | POST JSON/form/multipart to `/api/contact` with `locale=en` | Revert contact API/form localization only |

## Phase 1: Localization Foundation (TDD)

- [x] 1.1 RED: Create `src/i18n/localization.test.ts` for 12 unique routes, reciprocal mapping, query policy, complete English fields, stable IDs, and English labels.
- [x] 1.2 GREEN: Create `src/i18n/localization.ts` with exhaustive `Locale`/`PageId` dictionaries, route map, `equivalentUrl`, and stable-record projectors; fail closed on missing English.
- [x] 1.3 RED/GREEN: Update `src/data/{projects,experience,certifications,skills,soldProducts}.ts` to preserve stable assets/links/order while requiring Spanish and English translatable projections; extend localization tests.

## Phase 2: Shared Rendering and Routes (TDD)

- [x] 2.1 RED: Add layout/component assertions for localized `lang`, metadata, alternates, switcher naming/current state, landmarks, and English visible/accessibility copy.
- [x] 2.2 GREEN: Create shared localized page view used by English route wrappers.
- [x] 2.3 GREEN: Create `src/pages/en/{index,projects,experience,about,certifications,contact}.astro`; update shared components to consume locale props without duplicate implementations.
- [x] 2.4 GREEN: Update `src/layouts/BaseLayout.astro` for localized SEO and reciprocal `hreflang`.

## Phase 3: Contact Localization (TDD)

- [x] 3.1 RED: Create `src/pages/api/contact.test.ts` covering JSON/form/multipart, omitted/valid/unsupported locale, validation, honeypot, rate limit, statuses, and localized email framing.
- [x] 3.2 GREEN: Update `src/pages/api/contact.ts` and `src/components/ContactForm.astro` to submit `locale`, preserve parsing/anti-spam/SMTP behavior, and localize feedback and email framing.

## Phase 4: Acceptance and Cleanup

- [x] 4.1 Extend existing component tests for Spanish regressions plus English cards, gallery, timeline, footer, form, focus, live regions, and dialog controls.
- [x] 4.2 Run `pnpm run test`, `pnpm run typecheck`, `pnpm run lint`, sitemap/robots assertions, and `pnpm run build`; report the known Windows Vercel symlink EPERM separately.

## Verification remediation

- [x] Replace the robots sitemap host with the configured Astro site URL and add focused robots coverage.
- [x] Add focused runtime/unit coverage for localized SEO metadata, accessibility/switching, contact route preservation, and API locale/body contracts.
- [x] Preserve shared locale rendering behavior while correcting English accessibility labels where safe; Spanish legacy markup remains unchanged to avoid scope creep.
- [x] Re-run test, typecheck, lint, and diff checks; the Windows Vercel symlink EPERM remains environmental after route generation.
