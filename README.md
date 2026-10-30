# The Diagnostic Bay

A React and TypeScript web application for an evidence-led automotive diagnostic and repair learning resource. **The Diagnostic Bay is the current project label, not a finalized commercial brand identity.**

## Public educational experience

The current public-facing build includes:

- Responsive dark-industrial homepage, sticky navigation, skip link, and mobile navigation.
- Original diagnostic emblem and an original, unnamed mechanic character concept.
- Homepage diagnostic console clearly labelled as illustrative and not connected to a vehicle.
- Search across draft trouble-code pages, symptoms, and field guides.
- Filterable Diagnostic Lab with 12 source-aligned draft pages covering P0300, P0301–P0306, P0171, P0172, P0174, P0562, P0563, P0101, P0102, P0103, P0128, and P0133.
- Symptom-based troubleshooting cards and a guided intake experience for recording observations and recognizing stop-work warnings.
- Six structured field guides: battery drain, no-crank/clicking, overheating, rough idle, check-engine-light first steps, and OBD-II scanner use.
- Detail views with possible causes, ordered next checks, safety warnings, related references, and explicit review/source status.
- Learning-path preview, safety guidance, and project principles.

## Local development

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

## Important limitations

- All supplied automotive content remains draft and requires qualified mechanic review and authoritative references. The review register is in `docs/content-review-register.md`.
- Vehicle-specific specifications, torque values, wiring details, and procedures are not invented. Values and references absent from the source drafts remain outstanding.
- A diagnostic trouble code is evidence, not proof that a component has failed. Vehicle-specific service information takes precedence.
- The safety lesson source currently contains questions 1–15 only. The planned 20-question lesson and 95% pass requirement are not implemented.
- Guided Intake organizes observations and identifies stop-work warnings; it does not diagnose a fault.
- Search and guides use a local curated draft library. There is no live vehicle connection, VIN decoding, external code database, or AI diagnosis.
- The frontend is not connected to Supabase or an external backend. Existing Supabase security findings remain separately tracked; no database remediation is included in this public-experience branch.
- My Garage, user accounts, saved histories, Parts Finder, community, admin tools, translations, and billing are not implemented.
- Browser interaction, responsive, accessibility, automotive-content, security, and end-to-end release testing remain for the consolidated testing and remediation phase.
- Deployment remains separately gated and has not been authorized.

## Brand and intellectual property

The current emblem and mascot are original concept assets, not approved final brand artwork. The commercial name, tagline, mascot/helper names, and production identity remain undecided. See `docs/brand-identity-direction.md` and `docs/asset-inventory.md`.

The creative direction uses original anime-horror automotive energy without reproducing recognizable franchise characters, costumes, logos, weapons, or promotional compositions. Preliminary trademark/common-law review and final owner approval are required before identity finalization.
