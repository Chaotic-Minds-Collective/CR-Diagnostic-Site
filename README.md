# The Diagnostic Bay — Public Design Milestone

This repository contains a static HTML, CSS, and JavaScript prototype for an evidence-led automotive diagnostic and learning resource. **The Diagnostic Bay is a project label, not a finalized brand identity.** The mascot, logo, helper name, and tagline remain undecided.

## Current milestone

The public-facing redesign based on the supplied 60-page design reference has been merged into `main`. The work was developed on `design/reference-public-mvp`, which the project owner reports has since been deleted. The current `main` branch is the source of truth for the merged redesign.

- Dark industrial visual system with provisional obsidian, steel, cyan, red, and gold colors
- Responsive header and mobile navigation
- Homepage hero and illustrative diagnostic console (not connected to a vehicle)
- Search across draft trouble-code summaries and field guides
- Filterable trouble-code library with 12 draft entries
- Symptom cards connected to the existing search
- Six interactive field-guide details
- Learning-path preview and safety section
- Keyboard focus indicators, skip link, dialog controls, and reduced-motion handling

## Run locally

Open `index.html` in a modern browser. For best local behavior, run a static server from the repository root:

```sh
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Important limitations

- Search and guide content is a small, local draft library. There is no live vehicle connection, VIN decoding, external code database, or AI diagnosis.
- My Garage, accounts, saved histories, Parts Finder, community, admin tools, translations, and billing are not implemented in this milestone.
- No backend, analytics, external API, payments, or production hosting is configured.
- Diagnostic content requires qualified mechanic review and authoritative references before public release. A diagnostic trouble code is evidence, not proof that a particular component has failed. Vehicle-specific service information takes precedence.
- Prices and membership screens in the reference are proposals, not approved offers.
- The current placeholder emblem is not a final logo. Brand names, tagline, mascot, and production artwork remain subject to approval and IP/trademark review.
- Do not use the prohibited phrase “Grease Monkey” as a brand or product name.
- Source-level checks were performed before merge, including JavaScript syntax, duplicate HTML IDs, direct JavaScript selector-to-ID matches, key page targets, symptom routing, navigation-handler presence, reduced-motion CSS, minimum 48px key controls, and checks for an explicitly non-final brand notice and absence of external scripts/payment SDKs. These checks do **not** establish that the page has passed full browser, visual, accessibility, or end-to-end interaction testing.

## Release status

- Architecture: static HTML/CSS/JavaScript retained
- Public redesign: merged into `main`
- Feature branch: owner reports `design/reference-public-mvp` was deleted; deletion has not been independently verified
- Browser-based visual and interaction QA: outstanding
- Automotive content/source review: outstanding
- Production deployment: not performed
- Domain or paid services: none purchased or configured
- Public launch: not approved

## Main files

- `index.html` — page structure and copy
- `styles.css` — responsive visual system
- `app.js` — search, filters, symptom routing, and code/guide details
- `assets/brand-mark.svg` — original placeholder emblem


## Engineering workflow and audit records

- [Supabase integration and migration workflow](docs/supabase-integration-and-migrations.md)
- [Security and integration audit](docs/security-and-integration-audit.md)
- Static quality checks run in GitHub Actions for pull requests and pushes to `main`.
- Use the pull request template to document tests, safety/content review, database/RLS impact, and recovery plans.
- The frontend is **not connected to Supabase yet**. Do not add client credentials or apply migrations until access to the intended project is restored, the live schema is baselined, and RLS/grants are verified.
