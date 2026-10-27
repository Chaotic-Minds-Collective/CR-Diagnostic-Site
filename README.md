# The Diagnostic Bay — Public Design Milestone

This repository contains a static HTML, CSS, and JavaScript prototype for an evidence-led automotive diagnostic and learning resource. **The Diagnostic Bay is a project label, not a finalized brand identity.** The mascot, logo, helper name, and tagline remain undecided.

## Current milestone

The `design/reference-public-mvp` branch redesigns the existing public-facing screens to follow the supplied 60-page design reference while preserving the current architecture.

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

## Release status

- Architecture: static HTML/CSS/JavaScript retained
- Current work: design feature branch only
- Main branch: preserved; this work has not been merged
- Production deployment: not performed
- Domain or paid services: none purchased or configured
- Public launch: not approved

## Main files

- `index.html` — page structure and copy
- `styles.css` — responsive visual system
- `app.js` — search, filters, symptom routing, and code/guide details
- `assets/brand-mark.svg` — original placeholder emblem
