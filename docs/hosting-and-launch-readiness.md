# Hosting and launch readiness

## Current application architecture

The public website is a React 19 / TypeScript single-page application built with Vite. Its educational diagnostic library is bundled locally; it does not need Supabase to serve public pages. The frontend is not connected to Supabase.

The root `package.json` currently defines:
- `npm run lint`: TypeScript validation via `tsc --noEmit`
- `npm run build`: TypeScript project build followed by `vite build`

The repository now contains a real npm-generated `package-lock.json` (lockfile version 3). The quality and manual Vite deployment workflows use `npm ci` for reproducible dependency installation.

## Custom GitHub Pages workflow

- Workflow: `.github/workflows/deploy-pages.yml`
- Trigger: manual only (`workflow_dispatch`)
- Guard: deployment job runs only when manually started from `main`
- Build: Node.js 22, dependency installation, TypeScript validation, and Vite production build
- Artifact: Vite `dist/` directory
- Asset base: relative paths for GitHub Pages project paths and root-domain hosting
- The custom workflow is not triggered by pushes or pull requests.

## Important Pages deployment observation

GitHub recorded a separate **`pages build and deployment`** run:
- Initial observed run ID: `41008189696` on commit `0872893a815638f341e4bf798222a1c50603122d`
- Repeat run after PR #13 merged: `41077627325` on commit `8f0ebeb353fe093538ef2ce81d2b92aa4bae7a84`
- Event: `dynamic`
- Conclusion: `success`
- Run time: 2026-10-30 UTC

This was not the custom `workflow_dispatch` workflow described above. Both observed dynamic runs recorded **Build with Jekyll**, **Upload artifact**, and **Deploy to GitHub Pages**. The repeat run after the lockfile PR merged confirms that this branch/Jekyll publication path remains active. The custom Vite workflow builds `dist/`; the observed Jekyll run did not use that artifact. This strongly indicates that the separate Pages publication path is still building from repository source rather than using the Vite production output. Because the Vite root `index.html` references `/src/main.tsx`, publishing the source tree without a Vite build may result in a broken or incomplete site. The exact Pages source setting and currently served URL/content are not exposed by the available read access. Treat the repository as potentially published and the served site as unverified until the owner checks GitHub Settings → Pages and tests the live site.

**Do not trigger another deployment or change Pages settings as part of this remediation.** Verify the current publication state with the owner. A successful deployment event is not evidence of owner launch approval.

## Quality and verification status

- The latest main-branch application quality run for commit `8f0ebeb` completed successfully, including `npm ci`, TypeScript validation, Vite production build, and frontend secret-pattern scanning.
- The custom Pages workflow builds `dist/` and deploys it through GitHub Actions, but remains manual-only and has not been run.
- A real npm lockfile is committed; CI and the manual Pages workflow use `npm ci`.
- Automated component/interaction tests and full browser/accessibility testing remain outstanding.
- The GitHub Pages live URL, Pages source configuration, mobile behavior, screen-reader behavior, and runtime content have not been independently verified.

## Before public launch

- [ ] Change GitHub Settings → Pages → Build and deployment → Source to **GitHub Actions** (owner action; the available connector cannot change this production setting).
- [ ] Verify the currently served URL and confirm the artifact/content matches the approved release; branch/Jekyll output must not be treated as a valid Vite build.
- [ ] After the source is switched and launch is approved, manually run the Vite Pages workflow from `main` and verify the deployed artifact.
- [ ] Run the built application and test mobile navigation, search, category filters, symptom cards, Guided Intake, and guide details.
- [ ] Review keyboard navigation, focus visibility, screen-reader announcements, and narrow mobile viewports.
- [ ] Have a qualified mechanic review diagnostic content and add authoritative, vehicle-appropriate references.
- [ ] Check that all visible functionality is real and placeholders are clearly identified.
- [ ] Confirm final public-facing name, copy, and original artwork approvals.
- [ ] Complete the brand/IP review and document unresolved concerns.
- [ ] Confirm privacy, terms, accessibility, and safety notices appropriate to the actual feature set.
- [ ] Owner explicitly approves public launch.
- [ ] Only after all checks and explicit approval, use the approved release process.

## Known limitations

- No database, authentication, saved diagnostic history, AI diagnosis, VIN decoding, external vehicle data, payments, or custom domain is configured.
- Diagnostic content remains draft educational material and must not be presented as mechanic-reviewed.
- Browser-level visual, interaction, and accessibility QA remains outstanding.
- The custom deployment workflow prepares a release path; it does not authorize a release by itself.
