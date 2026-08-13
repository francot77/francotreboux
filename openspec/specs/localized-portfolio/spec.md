# Localized Portfolio Specification

## Requirements

### Requirement: Routes and locale selection

The site MUST serve Spanish at `/`, `/proyectos`, `/experiencia`, `/acerca`, `/certificaciones`, `/contacto` and English (`en-US`) at `/en/`, `/en/projects`, `/en/experience`, `/en/about`, `/en/certifications`, `/en/contact`. Locale MUST derive from the route. Spanish routes and client preferences MUST NOT cause redirects.

#### Scenario: Declared route resolves deterministically
- GIVEN any declared path and conflicting browser language
- WHEN the path is requested
- THEN its mapped page and language render successfully without redirection
- AND internal navigation remains in that language family

### Requirement: Translation completeness

English routes MUST translate copy, dates, statuses, validation, metadata, non-decorative alt text, captions, and accessible names. Missing translations MUST fail validation. Proper/official names, slugs, URLs, machine dates, media, and decorative alt text MUST remain unchanged unless reviewed wording exists.

#### Scenario: Translation is missing
- GIVEN a required English field is absent
- WHEN translation validation runs
- THEN it fails and identifies the missing field

### Requirement: Shared rendering

Locale equivalents MUST share locale-aware layouts and components. They MUST preserve information architecture, interactions, and stable record identity, and MUST NOT duplicate component implementations.

#### Scenario: Equivalent record renders
- GIVEN localized projections of one project
- WHEN both project pages render
- THEN identity, media, technologies, and destinations match
- AND only translatable fields differ

### Requirement: Language switching

Every page MUST expose a keyboard-reachable, named switch showing the current language and reciprocal route. Only equivalent state MAY survive: `enviado=1` maps between `/contacto` and `/en/contact`; other state MUST be discarded.

#### Scenario: Contact success switches language
- GIVEN `/contacto?enviado=1`
- WHEN English is selected
- THEN the target is `/en/contact?enviado=1`
- AND English success feedback renders

### Requirement: SEO and discovery

Every page MUST emit an absolute self-canonical, localized title/description, `html lang`, and `og:locale` (`es_ES` or `en_US`). Equivalents MUST emit reciprocal `hreflang="es"`/`"en"`; `x-default` MUST target Spanish. The sitemap MUST contain each canonical route once; robots MUST reference it without blocking either locale.

#### Scenario: Equivalent metadata is reciprocal
- GIVEN `/experiencia` and `/en/experience`
- WHEN metadata and sitemap are inspected
- THEN canonicals are self-referential and alternates reciprocal
- AND each URL occurs once in the sitemap

### Requirement: Accessibility

Both locales MUST preserve landmarks, heading order, labels, required semantics, skip links, keyboard/focus behavior, live regions, and dialog/gallery controls. English accessible names MUST be English; decorative content MUST remain hidden.

#### Scenario: English contact page is keyboard-operated
- GIVEN `/en/contact` and no pointer
- WHEN navigation, switching, fields, and submission are exercised
- THEN controls are reachable and named in English
- AND status changes are announced

### Requirement: Contact form and API

Forms MUST submit `name`, `email`, `message`, `website`, `subjectTag`, and `locale` (`es` or `en`) to `/api/contact`; omission MUST default to `es`. The API MUST retain all body formats; name ≥2, valid email, message ≥10; honeypot success without delivery; five attempts/client/ten minutes; and JSON statuses 400, 429, and 200. Feedback and email framing MUST use validated locale. SMTP, fallback submission, and anti-spam behavior MUST remain unchanged.

#### Scenario: Valid English submission
- GIVEN valid fields and `locale="en"`
- WHEN the API accepts the request
- THEN it returns 200 with `ok: true`
- AND feedback and email framing are English

#### Scenario: Unsupported locale
- GIVEN an unsupported locale
- WHEN the API validates the request
- THEN it returns 400 JSON with a safe localized error

### Requirement: Preservation and exclusions

The change MUST preserve Spanish copy/behavior, design, interactions, external destinations, contact infrastructure, deployment, and stable links. It MUST NOT add languages, content, CMS behavior, runtime translation, automatic redirects, or translated external sites.

#### Scenario: Acceptance suite
- GIVEN the localized change
- WHEN route, translation, metadata, accessibility, API, regression, typecheck, and lint checks run
- THEN all specified behavior and existing Spanish assertions pass
- AND the known Windows EPERM build limitation is reported separately
