# Hosting and launch readiness

## Current application architecture

The public website is a React 19 / TypeScript single-page application built with Vite. Its educational diagnostic library is bundled locally; it does not need Supabase to serve public pages. The frontend is not connected to Supabase.

Keep the Supabase GitHub integration enabled only as needed for reviewed database work. Do not enable automatic database branching or production database deployment without a separately reviewed requirement and explicit approval.

## Prepared deployment path

- GitHub Pages deployment workflow: `.github/workflows/deploy-pages.yml`
- Trigger: manual only (`workflow_dispatch`)
- Production guard: the deployment job runs only when manually started from `main`
- Build: Node.js 22, dependency installation, TypeScript validation, and Vite production build
- Published artifact: the Vite `dist/` directory
- Asset base: relative paths so bundled assets can resolve from a GitHub Pages project path or a root domain
- No deployment is triggered by pull requests or pushes through this workflow.

A GitHub Pages `pages build and deployment` run was recorded as successful for commit `f206c8ee948d19a1aa7a5b2290df03b729fcec13` on 2026-10-29. The repository API connection does not expose the Pages configuration or verify the currently served URL and artifact. Confirm the Pages source and live behavior in repository settings before treating the site as released. This record is not owner approval for a launch.

## Before public launch

- [ ] Run the built application and test mobile navigation, search, category filters, symptom cards, Guided Intake, and guide details.
- [ ] Review keyboard navigation, focus visibility, screen-reader announcements, and narrow mobile viewports.
- [ ] Have a qualified mechanic review diagnostic content and add authoritative, vehicle-appropriate references.
- [ ] Check that all visible functionality is real and that placeholders are clearly identified.
- [ ] Confirm final public-facing name, copy, and original artwork approvals.
- [ ] Complete the brand/IP review and document unresolved concerns.
- [ ] Confirm privacy, terms, accessibility, and safety notices appropriate to the actual feature set.
- [ ] Owner explicitly approves public launch.
- [ ] In GitHub repository Settings → Pages, verify GitHub Actions is the intended build/deployment source.
- [ ] Only after all checks and explicit approval, manually run the deployment workflow from `main` and verify the resulting URL.

## Known limitations

- No database, authentication, saved diagnostic history, AI diagnosis, VIN decoding, external vehicle data, payments, or custom domain is configured.
- The diagnostic content is draft educational material and must not be presented as mechanic-reviewed.
- Browser-level visual and interaction QA remains outstanding.
- The workflow prepares a release path; it does not authorize or perform a release by itself.
