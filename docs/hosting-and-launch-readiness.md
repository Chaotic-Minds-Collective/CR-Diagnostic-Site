# Hosting and launch readiness

## Current hosting approach

The current site is plain HTML, CSS, and JavaScript. It does not need Supabase to serve the public educational pages. Keep the existing Supabase GitHub integration enabled but leave automatic branching and production deployment off until the project actually has Supabase migrations or backend resources to deploy.

## Prepared deployment path

- GitHub Pages deployment workflow: `.github/workflows/deploy-pages.yml`
- Trigger: manual only (`workflow_dispatch`)
- Production guard: workflow deploy job runs only when started from `main`
- Published files: `index.html`, `app.js`, `styles.css`, and `assets/`
- No deployment has been triggered by this change.

## Before public launch

- [ ] Run the site locally and test mobile navigation, search, category filters, symptom cards, and guide details.
- [ ] Review keyboard navigation, focus visibility, and a narrow mobile viewport.
- [ ] Have a qualified mechanic review diagnostic content and add authoritative, vehicle-appropriate references.
- [ ] Check that all visible functionality is real and that placeholders are clearly identified.
- [ ] Confirm final public-facing name, copy, and artwork approvals. The current identity is still provisional.
- [ ] Owner explicitly approves public launch.
- [ ] In GitHub repository Settings → Pages, select GitHub Actions as the build/deployment source.
- [ ] Only after the above checks and approval, run the manual workflow from the `main` branch and verify the resulting URL.

## Known limitations

- No database, authentication, saved diagnostic history, AI diagnosis, VIN decoding, external vehicle data, payments, or custom domain is configured.
- The current diagnostic content is draft educational material and should not be presented as mechanic-reviewed.
- Browser-level visual and interaction QA is still outstanding.
