# Security and integration audit

**Audit date:** 2026-10-28  
**Scope:** Current `main` source tree, repository workflow files, and previously observed Supabase metadata.  
**Status:** Partial audit. GitHub source inspection is current; the Supabase project is not available through the current connector authorization, so live database findings below are marked as last-known and require re-verification.

## Executive summary

The site is still a static educational prototype. The public page does not currently connect to Supabase. The database tables last observed support personal accounts and vehicle/repair histories, but do not constitute a content-management system for the public diagnostic library. Do not treat the website as database-connected or production-ready.

## Source and repository observations

| Area | Finding | Status / action |
|---|---|---|
| Frontend | `index.html`, `styles.css`, and `app.js` form a static site; search/code/guide data is embedded in `app.js`. | Confirmed by source inspection. |
| Supabase client | No client initialization or Supabase query calls found in the inspected application source. | Not connected. |
| Network/API behavior | Prior source-level scan found no `fetch()`, `XMLHttpRequest`, or `WebSocket` references. | Static scan only; not runtime proof. |
| Content accuracy | README and QA notes state the 12 trouble-code entries and six guides are drafts needing qualified mechanic review and authoritative, vehicle-appropriate references. | Release blocker. |
| Runtime/accessibility | Source-level checks were documented, but browser, screen-reader, mobile viewport, and end-to-end interaction testing remain outstanding. | Release blocker. |
| Hosting workflow | `.github/workflows/deploy-pages.yml` uses manual `workflow_dispatch`, only permits the deployment job from `main`, and grants the job only the listed Pages permissions. | Source confirmed. Do not trigger or deploy without approval. |
| Change control | PR #5, “Prepare safe manual GitHub Pages deployment,” is merged into `main`; current branch search showed only `main`, and open-PR search returned none. | Verified via GitHub API. |
| Repo controls | Reading branch protection was denied by the GitHub integration; Pages and Actions settings endpoints were not available through the read tool. | Unknown; owner must verify in GitHub settings. |
| Dependency management | No package manifest or dependency lockfile appears in the repository tree. | Consistent with plain static files; no dependency audit can be run from a package manifest. |
| Brand/release | Site copy marks identity and content as provisional; public launch has not been approved in project records. | Keep provisional. |

## Last-known Supabase inventory (re-verify after access is restored)

The prior successful inspection reported these public tables, all with RLS enabled and zero rows at the time:

- `profiles`: auth user ID, email, full name, role, skill level, preferred language, timestamps.
- `garages`: user/vehicle information (year, make, model, engine, nickname, primary flag).
- `diagnostic_cases`: user/vehicle ownership, title, symptoms, codes, diagnostic status, notes, sharing flag.
- `maintenance_reminders`: user/vehicle, title, due date/mileage, status.
- `repair_records`: user/vehicle, title, cost, receipt URL, performed date.

The last-known migration list was empty and no Edge Functions were listed. Empty migration history does not mean the schema is empty or safe to recreate.

### High-priority potential data exposure

The last-known `profiles` policy list included **“Public profiles are viewable by everyone.”** The table includes an email column. If the policy permits unrestricted SELECT and the API role has SELECT grants, public callers may be able to read profile emails. This is a risk requiring immediate verification of the exact policy expression, table grants, and effective API access. Do not assume RLS being enabled alone makes a table safe. Prefer exposing only explicitly public profile fields, and keep email private unless a documented feature requires it.

Other last-known policy names suggested owner-scoped access for garages, diagnostic cases, reminders, and repair records, plus a policy for shared diagnostic cases. Names are not proof of correctness: verify every policy expression, command, role, and WITH CHECK condition, including whether shared cases truly hide VINs and private notes.

## Required checks when Supabase access is restored

1. Confirm project ref, organization, region, plan, health, API URL, and enabled publishable keys.
2. Inventory every schema and object, including views, functions, triggers, extensions, storage buckets, and Auth configuration.
3. Review table grants and all RLS policies for every role and operation; test as anonymous, user A, user B, and admin where applicable.
4. Verify foreign keys, cascades, uniqueness/check constraints, nullable fields, defaults, and indexes for user/vehicle joins and common filters.
5. Run Supabase security and performance advisors and record each result with severity, remediation, and owner.
6. Confirm backup/PITR availability and recovery procedure before schema changes.
7. Capture and reconcile the live schema into Git-tracked migrations. Do not replay a guessed schema into the existing project.
8. Connect the frontend only after policy/grant tests pass and the user-facing feature scope is defined.
9. Test successful, denied, empty, expired-session, and network-failure states in a browser.
10. Re-run the audit after fixes and record evidence.

## Current blockers and limits

- The intended last-known project ref `rwehmmvjahpfeugfaxis` is not returned by either currently connected Supabase account. Requests against that ref now return a permission error. Other projects visible in those accounts must not be substituted.
- Live table definitions, exact RLS expressions, grants, Auth settings, keys, extensions, advisors, and migrations could not be re-read in this pass.
- No database or production settings were changed. No website deployment was run.
