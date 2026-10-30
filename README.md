# The Diagnostic Bay

A React and TypeScript web application for **The Diagnostic Bay** — an evidence-led automotive diagnostic and repair learning concept. **The Diagnostic Bay is a project label, not a finalized brand identity.**

## Overview

The public educational resource currently includes:

- Dark industrial visual system with provisional obsidian, steel, cyan, red, and gold colors
- Responsive sticky header, skip link, and mobile navigation menu
- Homepage hero and illustrative diagnostic console (not connected to a vehicle)
- Live search and quick lookups across draft trouble-code summaries and field guides
- Filterable Diagnostic Lab with 12 OBD-II draft entries across Engine, Air & Fuel, Electrical, and Temperature categories
- Symptom-based troubleshooting cards connected directly to search investigation
- Guided Intake experience for organizing symptom observations, identifying stop-work warning signs, and choosing safe next steps
- Six interactive Fix Database field guides
- Learning Paths preview, non-negotiable safety rules, and Rules of the Bay
- Accessible detail dialog with keyboard focus indicators and reduced-motion support

## Local Development

Install dependencies and start the Vite development server on port 3000:

```sh
npm install
npm run dev
```

Build for production or run TypeScript validation:

```sh
npm run lint
npm run build
```

## Important Limitations

- Search and guide content uses a curated local draft library (`src/data/diagnosticsData.ts`). There is no live vehicle connection, VIN decoding, external code database, or AI diagnosis.
- Guided Intake is an educational symptom-recording aid, not a diagnostic decision engine or substitute for vehicle-specific service information.
- My Garage, user accounts, saved histories, Parts Finder, community, admin tools, translations, and billing are not implemented in this milestone.
- The frontend is not connected to Supabase or an external backend.
- Diagnostic content requires qualified mechanic review and authoritative references before public release. A diagnostic trouble code is evidence, not proof that a particular component has failed. Vehicle-specific service information takes precedence.
- Automated application tests and full browser/accessibility testing remain outstanding.
