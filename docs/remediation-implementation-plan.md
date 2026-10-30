# Diagnostic Bay Remediation Plan

**Status:** Updated implementation plan based on a live, read-only audit. No production database changes, Pages settings changes, frontend Supabase integration, or deployment are authorized by this document.

## Goals and constraints

- Preserve the $0 budget; do not add paid services or resources.
- Keep the React 19 / TypeScript / Vite application as the current frontend architecture.
- Keep production database and release changes separately gated.
- Do not connect the frontend to Supabase until access controls are corrected and tested.
- Make changes in small, reviewable steps and retain historical audit findings.
- Do not treat a successful GitHub Pages event as owner approval to launch.

## Verified current baseline

### Repository and CI

Repository: `Chaotic-Minds-Collective/CR-Diagnostic-Site`; default branch: `main`.

The root `package.json` defines:
- `npm run lint`: `tsc --noEmit`
- `npm run build`: `tsc -b && vite build`
- React 19, TypeScript 5.7, and Vite 6.

The repository does not contain a committed `package-lock.json`. The current quality workflow uses `npm install`, TypeScript validation, and Vite build. The latest observed main-branch quality run for commit `0872893a815638f341e4bf798222a1c50603122d` completed successfully. The lockfile/reproducible-install task remains open.

The manual Pages workflow has been updated to build the Vite app and publish `dist/`. It remains configured for manual dispatch and a `main` guard. Separately, GitHub recorded a successful `pages build and deployment` event (`dynamic`) for the same main commit, run ID `41008189696`. Its job steps explicitly ran **Build with Jekyll** and **Deploy to GitHub Pages**, not the custom Vite workflow. This strongly indicates a separate branch/Jekyll publication path that does not build `dist/`; publishing the Vite root `index.html` without building the app may produce a broken site. The exact Pages source setting and live URL have not been verified. Treat the site as potentially published and the served content as unverified. Do not trigger another deployment or alter Pages settings without explicit approval.

### Supabase live inventory

Project **Greasy Dojo Site**, ref `rwehmmvjahpfeugfaxis`, organization `wwronlwuwytwbioagyke`, region `us-east-1`, PostgreSQL 17, is now accessible.

Read-only inspection confirmed five public tables:
- `profiles`
- `garages`
- `diagnostic_cases`
- `maintenance_reminders`
- `repair_records`

All five reported zero rows during inspection, all have RLS enabled, and none has FORCE RLS enabled. The migration list is empty. No public-schema views, functions, or triggers were found. Storage system tables exist, but no buckets or storage policies were returned.

### Security findings requiring remediation

1. **Public profile disclosure:** `profiles` has a public SELECT policy with expression `true`; `anon` has SELECT privilege. The table contains email and role fields.
2. **Role self-escalation risk:** authenticated users have UPDATE privilege on their own profile, including the `role` column. The current policy does not restrict writable columns, and the role constraint permits `admin`.
3. **Shared-case disclosure:** public SELECT on `diagnostic_cases` is allowed when `is_shared = true`, but all columns are returned. The table includes owner IDs, vehicle references, and private notes; no column projection/redaction is present.
4. **Broad API grants:** `anon` and `authenticated` have SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, and TRIGGER on each of the five public tables.
5. **Broad default ACLs:** future public tables, sequences, and functions receive broad privileges for `anon`, `authenticated`, and `service_role`.
6. **Cross-owner references:** row-level user ownership checks do not by themselves ensure a linked vehicle belongs to the same user as a diagnostic case, reminder, or repair record.
7. **RLS mode:** RLS is enabled but not forced on all five public tables.
8. **Performance advisor:** seven unindexed foreign keys, eight RLS initialization-plan warnings, and five multiple-permissive-policy warnings.

The Supabase security advisor returned no lints. This does not negate the manual authorization findings. No exploit or synthetic-user negative test has been run. Do not connect the frontend or apply production changes based on this audit alone.

## Phase A — Database security and recovery

### A1. Complete baseline and compatibility assessment
1. Capture schema definitions, constraints, foreign keys, indexes, RLS enablement/force status, policies, table/column grants, sequence grants, default privileges, role memberships, views, functions, triggers, storage configuration, Auth settings, extensions, and migration history.
2. Identify every authorized client and integration using the project. Do not revoke privileges until compatibility is understood.
3. Verify backup/PITR availability and document a recovery route before any DDL or privilege change.
4. Reconcile the live schema with repository migration history. The empty migration list means a baseline must be designed from the actual schema, not inferred or recreated by guesswork.

### A2. Target access model
- Anonymous visitors: no direct access to private profile or vehicle-history tables by default.
- Authenticated users: only the minimum operations required by an approved feature, scoped to their own rows and linked vehicles.
- Administrators: access only through a separately controlled, explicitly authorized role-assignment process.
- Public sharing: no direct public reads from private case rows. If public sharing is approved later, use a separate allowlisted representation with explicit consent and moderation.

### A3. Controls to design
- Remove public SELECT from private profile data; protect email and authorization fields.
- Prevent users from changing their own role or other authorization metadata.
- Redesign shared diagnostic cases so only explicitly approved fields are exposed.
- Restrict API-role privileges to the minimum required. Remove unnecessary TRUNCATE, TRIGGER, REFERENCES, and unneeded DML grants.
- Review default privileges for tables, sequences, and functions for every relevant object owner/schema.
- Scope RLS policies to intended roles and enforce ownership for both the record and any linked vehicle on INSERT/UPDATE.
- Review policy evaluation patterns for performance only after preserving exact authorization semantics.
- Review each foreign-key index against expected query patterns and add only justified indexes.
- Do not implement the public diagnostic library using private account/history tables.

### A4. Security acceptance tests (synthetic users and records only)
- Anonymous requests cannot read private profiles, garages, reminders, or repair records.
- User A cannot read, update, or delete User B's records.
- User A cannot link a case, reminder, or repair record to User B's vehicle.
- Normal users cannot grant themselves privileged roles.
- Shared diagnostic cases reveal only explicitly approved fields.
- API roles cannot perform unneeded destructive/administrative operations.
- Invalid, expired, or unauthorized requests fail closed without exposing private data.

No production migration should be generated or applied until the baseline, compatibility assessment, test environment, and recovery plan are reviewed and separately approved.

## Phase B — CI and reproducible dependencies

1. Confirm the supported Node.js/npm versions and pin them consistently for CI and local development.
2. Generate and review a real `package-lock.json` using npm with registry access. Do not hand-author or guess dependency resolutions.
3. Check for unintended dependency changes and commit the lockfile on a feature branch.
4. Update quality CI to use `npm ci`, `npm run lint`, and `npm run build` only after the lockfile is committed.
5. Add focused tests for search, filtering, Guided Intake selection, detail dialogs, and no-results behavior using the smallest justified test setup.
6. Keep workflow permissions least-privilege and do not add deployment permissions to quality CI.
7. Validate a clean install, TypeScript checking, Vite production build, and actual interaction tests. Do not mark checks passed without logs.

The current main quality workflow passed, but that does not make dependency installation reproducible or prove browser behavior.

## Phase C — Hosting and release control

- Keep the custom Pages workflow manual-only and guarded to `main`.
- A separate dynamic GitHub Pages event succeeded on the latest main commit using Jekyll and then deployed to Pages. It did not run the custom Vite `dist/` build. Verify the Pages source setting and live URL with the owner; do not assume the event was an approved launch or a working Vite release.
- Do not trigger another deployment or change Pages settings during remediation.
- Before any future public release, complete mechanic review, authoritative references, brand/IP review, accessibility/browser QA, privacy/safety notices, and explicit owner approval.

## Phase D — Documentation reconciliation

Maintain the following as evidence-based records:
- `README.md`: current application architecture, setup, and limitations.
- `docs/security-and-integration-audit.md`: current verified security findings and unresolved risks.
- `docs/supabase-integration-and-migrations.md`: project baseline, access design, migration gap, and safeguards.
- `docs/hosting-and-launch-readiness.md`: custom workflow, observed dynamic Pages event, and release hold.
- `docs/stage-1-qa-audit.md`: preserve historical findings while identifying the current React/Vite app and unverified runtime behavior.

Label each audit statement as a verified current fact, historical finding, proposed change, or unverified/blocked item.

## Required review package

Before applying consequential changes, present:
1. Exact changed-file list and diffs.
2. Database access specification and threat model.
3. Schema/migration baseline and compatibility notes.
4. Lockfile and workflow changes.
5. Actual test results and logs, with failures disclosed.
6. Recovery plan for database changes.
7. Remaining risks and explicit approval gates.

## Definition of done

- Database permissions and RLS are validated against intended features and all known consumers.
- Security tests pass with synthetic accounts in a safe non-production environment.
- CI installs reproducibly from the committed lockfile and passes lint/build checks.
- Functional tests cover the agreed core interactions.
- Documentation accurately distinguishes current state from history and proposals.
- No production database change, Pages setting change, public deployment, paid resource, or frontend Supabase integration occurs without separate explicit approval.

## Current status

The live Supabase project is accessible and has been re-inventoried. The security findings above are verified from read-only metadata and SQL catalog queries; they are not remediated. GitHub main quality checks pass, but a lockfile and browser-level tests are still missing. A dynamic Pages deployment event succeeded, but live URL and Pages source configuration remain unverified. No database, production setting, or website deployment was changed as part of this audit.
