# Diagnostic Bay Remediation Plan

Status: Proposed for review. No production database changes, deployment, or application-code changes are authorized by this document.

## Goals and constraints

- Preserve the $0 budget; do not add paid services or resources.
- Keep the React 19 / TypeScript / Vite application as the current frontend architecture.
- Keep production deployment disabled until separately reviewed and approved.
- Do not connect the frontend to Supabase as part of this remediation.
- Make changes in small, reviewable steps and retain historical audit findings.

## Verified baseline (read-only inspection)

The current repository is `Chaotic-Minds-Collective/CR-Diagnostic-Site`, default branch `main`. The root `package.json` defines:
- `npm run lint`: `tsc --noEmit`
- `npm run build`: `tsc -b && vite build`
- React 19, TypeScript 5.7, and Vite 6.

The root has no committed npm lockfile. The existing quality workflow checks the legacy static `app.js`, and the manual deployment workflow packages legacy static assets rather than the Vite `dist/` output. These workflow files need a reviewed update, but deployment must not be run.

A read-only Supabase inspection of project `rwehmmvjahpfeugfaxis` found five application tables: `profiles`, `garages`, `diagnostic_cases`, `maintenance_reminders`, and `repair_records`. The inspection reported broad `anon` and `authenticated` table grants, including destructive/administrative privileges, plus a public profile SELECT policy and a shared-case SELECT policy. It reported no migration records, no triggers in `public`, no routines in `public`, and one index per table. An earlier audit noted seven unindexed foreign keys. These findings require validation against the complete effective privilege model and all authorized clients before changing access.

The live row counts reported zero during the inspection. This is not proof that the database is disposable or unused by other clients.

## Phase A — Database security

### A1. Establish baseline before designing a migration
1. Capture schema definitions, constraints, foreign keys, indexes, RLS enablement/force status, policies, table/column grants, sequence grants, default privileges, role memberships, views, functions, and relevant storage policies.
2. Reconcile the live schema with repository migration history. The lack of recorded migrations means a baseline must be designed from the actual schema, not inferred or recreated by guesswork.
3. Identify every authorized client and integration that uses the project. Do not revoke privileges until compatibility is understood.
4. Confirm a recovery route and appropriate backup/export before any DDL or privilege changes.

### A2. Target access model
- Anonymous visitors: no direct access to account and vehicle-history tables by default.
- Authenticated users: only the minimum operations needed for their own records.
- Administrators: access only through a separately controlled, explicitly authorized mechanism.
- Public sharing: never expose private rows by simply setting a sharing flag. If public case sharing is approved later, expose a separate, explicitly allowlisted representation.

### A3. Specific controls to design
- Revoke unnecessary API-role privileges, especially `TRUNCATE`, `TRIGGER`, and `REFERENCES`, and unnecessary writes. Grant only operations required by approved features.
- Scope RLS policies to intended roles and enforce ownership for both the record and any linked vehicle on insert/update.
- Protect profile columns and prevent users from changing their own role. Use a separately controlled role-assignment process.
- Review policy evaluation patterns for performance only after preserving their exact semantics.
- Review each foreign-key index against actual query patterns and add only justified indexes.
- Do not implement a public diagnostic library using these private account/history tables.

### A4. Security acceptance tests (synthetic users and records only)
- Anonymous requests cannot read private profiles, garages, reminders, or repair records.
- User A cannot read, update, or delete User B's records.
- Forged user IDs and vehicle IDs cannot bypass ownership rules.
- Normal users cannot grant themselves privileged roles.
- Shared diagnostic cases reveal only explicitly approved fields.
- API roles cannot perform unneeded destructive/administrative operations.
- Invalid, expired, or unauthorized requests fail closed without exposing private data.

No production migration should be generated or applied until the schema baseline, compatibility assessment, test environment, and recovery plan are reviewed and approved.

## Phase B — CI and reproducible dependencies

1. Confirm the supported Node.js version and pin it consistently for CI and local development.
2. Generate and review a real `package-lock.json` using the selected npm version. Do not hand-author or guess dependency resolutions.
3. Check for unintended dependency changes and commit the lockfile in the proposed branch.
4. Update the quality workflow to use checkout, setup-node with npm caching, `npm ci`, `npm run lint`, and `npm run build`.
5. Add focused tests for search, filtering, detail dialogs, and no-results behavior only after identifying the existing code/test structure and choosing the smallest justified test dependency.
6. Keep workflow permissions least-privilege and do not introduce deployment permissions into the quality workflow.
7. Validate a clean install, strict TypeScript checking, and Vite production build. Do not mark checks passed without actual logs.

The current scripts already run TypeScript checking through `npm run lint` and before the Vite build. Preserve strict TypeScript settings.

## Phase C — Deployment workflow (separate approval gate)

The existing manual deployment workflow targets legacy static files. A future proposed patch must build the Vite application and publish the contents of `dist/`, including correct GitHub Pages base-path configuration. It must remain manual-only and must not be triggered as part of this work. Any public release requires a separate explicit approval after the artifact, brand, accessibility, and smoke-test review.

## Phase D — Documentation reconciliation

Update these files while retaining historical context:
- `README.md`: current architecture, commands, setup, and known limitations.
- `docs/security-and-integration-audit.md`: distinguish verified current findings from stale static-site findings and pending remediation.
- `docs/supabase-integration-and-migrations.md`: record the current project baseline, access design, migration-history gap, and safeguards.
- `docs/hosting-and-launch-readiness.md`: correct build/artifact descriptions and retain the deployment hold.
- `docs/stage-1-qa-audit.md`: preserve historical results while clearly identifying the current React/Vite app and unverified behavior.

Every audit statement should be labeled as one of: verified current fact, historical finding, proposed change, or unverified/blocked.

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
- No production database change, public deployment, paid resource, or frontend Supabase integration occurs without separate approval.

## Current status

This document is a plan, not evidence that remediation has been performed. The security inspection was read-only. No production privileges, policies, schema, data, GitHub default-branch files, or deployment settings were changed as part of the inspection.
