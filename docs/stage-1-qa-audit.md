# Stage 1 Prototype QA Audit

**Status:** The original static-prototype audit below is historical. A current React/Vite source review was added on 2026-10-30; interactive browser QA remains outstanding.  
**Audited branch:** `main`  
**Audit branch:** `qa/stage-1-prototype-audit`  
**Scope:** Read-only inspection of the existing prototype before proposing code changes. No production files were changed on `main`, and nothing was deployed.

## Confirmed source-level checks

| Check | Result | Notes |
|---|---|---|
| Responsive viewport metadata | PASS | A viewport meta tag is present. |
| Skip link | PASS | A skip-to-content link is present. |
| Duplicate HTML IDs | PASS | No duplicate IDs detected by a source scan. |
| Local JavaScript entry point | PASS | The page loads `app.js` locally. |
| Third-party script tags | PASS | No externally hosted script sources found in the HTML. |
| Network calls in application source | PASS, source scan only | No `fetch()`, `XMLHttpRequest`, or `WebSocket` references detected by the scan. This is not a security audit. |
| Payment SDK references | PASS, source scan only | No obvious Stripe, PayPal, or checkout SDK references detected in the scanned HTML/JS. |
| JavaScript syntax parse | PASS | The `app.js` source parses without a syntax error; this was a parse-only check and the code was not executed. |\n| CSS brace balance | PASS | Opening and closing brace counts match. This is a basic structural check, not a full CSS validator. |\n| Reduced-motion styling | PASS | A `prefers-reduced-motion` rule is present. |
| Visible keyboard focus styling | PASS | `:focus-visible` styling is present. |
| Responsive CSS breakpoints | PASS | Four `@media` blocks detected. |
| Draft code library | PASS | 12 code objects detected in the local JavaScript data. |
| Live vehicle connection | NOT IMPLEMENTED, AS EXPECTED | The interface describes its diagnostic console as illustrative and not connected to a vehicle. |

## Important limitations

This audit inspected source files through GitHub. A parse-only JavaScript syntax check and a basic CSS brace-balance check passed. It did **not** execute the application or run the website in a real browser, use a screen reader, test keyboard navigation end-to-end, or test mobile layouts at actual viewport sizes. Source scans can miss dynamic behavior and are not substitutes for runtime tests.

The repository's README also identifies the code descriptions as drafts requiring qualified mechanic review and authoritative vehicle-specific references before public release. That restriction remains in force.

## Stage 1 follow-up test plan

1. Run the prototype locally in a modern browser and record console errors.
2. Exercise the mobile menu at desktop, tablet, and narrow mobile widths.
3. Test search using a known code (for example, P0300), a partial code, a symptom phrase, and a no-results query.
4. Test every filter and verify that clearing filters restores the expected results.
5. Open and close code details and each field guide using mouse and keyboard.
6. Verify that symptom cards route to the intended search/results.
7. Check visible focus, skip-link behavior, dialog behavior, reduced-motion behavior, and minimum touch target sizes.
8. Check the page at narrow widths for horizontal overflow, clipped content, and overlapping navigation.
9. Run HTML/CSS/JavaScript validation and add repeatable automated checks if the project tooling supports them without introducing paid services.
10. Convert findings into a small, reviewable patch on this branch. Do not merge or deploy without explicit owner approval.

## Guardrails

- Keep the existing static HTML/CSS/JavaScript architecture for this stage.
- Do not add external scripts, analytics, backend services, AI APIs, payment integrations, or paid dependencies.
- Do not purchase a domain or service.
- Do not deploy or merge changes.
- Keep brand, logo, mascot, helper name, and tagline provisional until the owner approves the identity.
- Do not present draft diagnostic material as a confirmed diagnosis or as a substitute for vehicle-specific service information.


## Current React/Vite follow-up — 2026-10-30

**Audited source:** `main` at `8f0ebeb353fe093538ef2ce81d2b92aa4bae7a84`  
**Application:** React 19 / TypeScript / Vite 6.  
**Scope:** Read-only source inspection. This follow-up supersedes the historical static HTML/JavaScript architecture notes above; it does not claim browser or mechanic validation.

### Confirmed current implementation

- The active entry point is `src/main.tsx`, which mounts the React application in `src/App.tsx`.
- The public educational library is local data in `src/data/diagnosticsData.ts`: 12 OBD-II trouble-code summaries and six field guides.
- The UI includes search, category filters, symptom shortcuts, a Guided Intake observation checklist, detail dialogs, learning preview, and safety rules.
- The Guided Intake explicitly states that it records observations and does not diagnose the vehicle.
- The code and guide details repeatedly state that DTCs are evidence, not proof of a failed component, and defer vehicle-specific tests/specifications to authoritative service information.
- The header uses `import.meta.env.BASE_URL` for the brand mark, but three brand-mark images in `src/components/InfoSections.tsx` use `/assets/brand-mark.svg`. With the configured relative Vite base and a GitHub Pages project path, these three root-relative URLs can resolve outside the repository site path. A focused proposed fix is tracked separately in PR #14.
- The current `package.json` defines lint/type-check and build scripts. No test runner or automated component/interaction test suite is configured.

### Source-level concerns and review requirements

1. **No source citations in the code library:** the current trouble-code entries and field guides do not carry authoritative source references, vehicle applicability, or content-review metadata. Qualified mechanic review and reference attribution are release blockers.
2. **Draft scope is small:** 12 code entries and six guides are a starter library, not comprehensive vehicle coverage. The UI and README correctly describe it as a draft.
3. **Category taxonomy:** P0700 is currently grouped under the generic Engine category even though its description concerns transmission control. Review the taxonomy and labels with a qualified mechanic before expanding the library.
4. **Native dialog behavior:** `DetailDialog` uses the HTML dialog element and programmatic `showModal()`. Keyboard focus, Escape behavior, focus return, screen-reader announcements, and the fallback path still need real-browser testing.
5. **Asset path consistency:** the three root-relative brand-mark references in `InfoSections.tsx` should use the Vite base URL, as the header already does. See PR #14.
6. **No end-to-end interaction evidence:** successful TypeScript and Vite builds do not establish that search, filters, mobile navigation, dialogs, and Guided Intake work correctly in browsers or assistive technology.

### Updated test plan

1. Run the production Vite build and inspect generated `dist/` asset references.
2. Verify every local asset URL works under the actual GitHub Pages project path, including all brand-mark placements.
3. In desktop and narrow mobile browsers, test navigation open/close, skip link, all search paths, no-results messaging, every category filter, every code and guide dialog, symptom shortcuts, and each Guided Intake option.
4. Test dialog Escape/close behavior, focus entry and restoration, keyboard-only operation, visible focus, screen-reader announcements, and reduced-motion preference.
5. Check for horizontal overflow, clipped text, layout overlap, contrast issues, and adequate touch targets at representative viewport widths.
6. Add repeatable automated tests for search normalization/matching and core UI interactions using a small, justified free test dependency or an existing supported test environment. Keep dependency changes separate and lockfile-backed.
7. Have a qualified mechanic review every code explanation, potential cause, check, warning, and guide; add reputable references and applicability notes before publication.
8. Re-run checks after fixes and record actual browser/test evidence. Do not mark a test passed based on source inspection alone.

### Release boundary

The React/Vite application remains a pre-launch educational draft. No database integration, authentication, saved history, AI diagnosis, VIN decoding, payments, or external vehicle data is implemented. No production deployment, Supabase change, or release approval is implied by this source review.
