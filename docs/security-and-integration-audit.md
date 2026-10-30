# Security and integration audit

**Audit date:** 2026-10-29 Pacific (read-only database observations recorded 2026-10-30 UTC)  
**Repository baseline:** `main` at `0872893a815638f341e4bf798222a1c50603122d`  
**Supabase project:** Greasy Dojo Site (`rwehmmvjahpfeugfaxis`), `us-east-1`  
**Status:** Updated read-only audit. Findings are not remediated. No database or production settings were changed.

## Executive summary

The current website is a React 19 / TypeScript / Vite application. Its public diagnostic library is bundled locally; the frontend is not connected to Supabase. The database contains five account/vehicle-history tables and has no recorded migrations. All five public tables have RLS enabled, but the current policies and grants are not sufficiently restrictive for a future authenticated product.

**Do not connect the frontend to this database or introduce user accounts until the profile exposure, role self-escalation risk, shared-case exposure, broad grants, and default privileges have been corrected and tested.**

## Repository and application observations

| Area | Verified finding | Status |
|---|---|---|
| Frontend | React 19, TypeScript 5.7, Vite 6; local educational content in `src/data/diagnosticsData.ts`. | Current |
| Supabase client | No frontend Supabase client or database calls are implemented. | Not connected |
| Core content | 12 OBD-II draft entries, six guides, symptom cards, and Guided Intake. | Educational drafts; mechanic review and references remain required |
| CI | Main-branch application quality workflow completed successfully for commit `0872893`. | Passing at last observed run |
| Dependencies | `package-lock.json` is absent; CI currently uses `npm install`, not reproducible `npm ci`. | Open issue |
| Browser QA | Full browser, mobile, screen-reader, and end-to-end checks remain outstanding. | Release blocker |
| Custom Pages workflow | `.github/workflows/deploy-pages.yml` is manual-only and guarded to run only from `main`; it builds Vite `dist/`. | Source confirmed |
| Pages event | GitHub recorded a separate `pages build and deployment` run (`41008189696`) with event `dynamic`, on commit `0872893`, conclusion `success`. | A Pages deployment/build completed; Pages settings and live URL have not been verified. Do not infer owner launch approval. |
| Brand and launch | Name, logo, artwork, and mechanic-reviewed content remain provisional/unapproved. | Release blocker |

## Verified Supabase inventory

The intended project is accessible again. Read-only inspection confirmed:

- Project name/ref: **Greasy Dojo Site** / `rwehmmvjahpfeugfaxis`
- Region: `us-east-1`; database engine: PostgreSQL 17
- Five public tables: `profiles`, `garages`, `diagnostic_cases`, `maintenance_reminders`, `repair_records`
- All five tables reported zero rows at the time of inspection. This does not prove the database is disposable or unused by other clients.
- RLS is enabled on all five tables; `FORCE ROW LEVEL SECURITY` is false on all five.
- The migration list is empty.
- No views, functions, or triggers were found in the `public` schema; no trigger was found on `auth.users` to provision profile rows.
- All five public application tables are owned by `postgres`; their relation ACLs grant all table privileges to `anon`, `authenticated`, and `service_role`.
- No public-schema sequences were found. The five installed extensions are `pg_stat_statements`, `pgcrypto`, `plpgsql`, `supabase_vault`, and `uuid-ossp`.
- Storage system tables exist, but no storage buckets or storage policies were returned.
- Security advisor returned no lints. Performance advisor returned three categories of findings described below. A clean advisor result is not proof that manual authorization logic is safe.

### Critical/high-priority access findings

#### 1. Public profile exposure

The `profiles` table contains `email`, `full_name`, `role`, `skill_level`, and other profile fields. Its policy **“Public profiles are viewable by everyone.”** is a SELECT policy for `public` with expression `true`. The `anon` role has SELECT privilege on the table.

**Impact:** Public API callers may read every profile column, including email addresses and role values. There is no column-level public projection in this table policy.

**Required direction:** Remove public access to the private profile table. If public profile display is ever required, expose a separate allowlisted projection that excludes email, role, and private metadata.

#### 2. Profile role self-escalation risk

The policy **“Users can update their own profile.”** permits updates where `auth.uid() = id`. The `authenticated` role has UPDATE privilege, including on the `role` column. The role check constraint explicitly permits values including `admin`. The policy does not restrict which profile columns may be changed.

**Impact:** A normal authenticated user appears able to change their own role to a privileged value. This is a high-priority authorization vulnerability. The exact exploit path has not been exercised with a synthetic account; treat the risk as unresolved and block account integration.

**Required direction:** Users must not be able to write authorization fields. Role assignment must use a separate, controlled administrative process. Validate with negative tests using synthetic accounts before any production change.

#### 3. Shared diagnostic-case overexposure

The policy **“Anyone can view shared cases with hidden VINs.”** is a SELECT policy for `public` with expression `is_shared = true`. It exposes rows from `diagnostic_cases` without a column-level projection. The table contains `user_id`, `vehicle_id`, `notes`, symptoms, codes, title, and status. The inspected table definition has no VIN column, and no field-redaction mechanism is present.

**Impact:** Marking a case shared can expose owner identifiers, vehicle references, and private notes alongside the intended educational details. The policy name does not establish that private fields are hidden.

**Required direction:** Disable public row sharing until a separate allowlisted public-case representation and explicit moderation/consent model are designed and tested.

#### 4. Broad table and default privileges

Effective privilege checks confirmed that both `anon` and `authenticated` have all of the following privileges on each of the five public tables: `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `TRUNCATE`, `REFERENCES`, and `TRIGGER`. RLS still filters row-level operations, but it does not apply to operations such as `TRUNCATE`; the extra privileges are unnecessary for the current public educational site.

Default ACL inspection found broad default privileges under both the `postgres` and `supabase_admin` owners for future public tables, sequences, and functions, including table DML/administrative privileges and function EXECUTE for `anon`, `authenticated`, and `service_role`.

**Impact:** Future objects may become API-accessible by default, increasing the chance that a later table or function is exposed unintentionally.

**Required direction:** Review current and default privileges by object owner and schema. Revoke unnecessary defaults and grant only the minimum required by a separately approved feature. Do not apply blanket revocations until all authorized clients and object owners are understood.

### Ownership and integrity review

Current owner policies generally compare `auth.uid()` with the row's `user_id`, but related vehicle ownership is not checked in the same policy. The foreign keys establish that a referenced vehicle exists; they do not establish that it belongs to the same user. Inserts/updates for diagnostic cases, maintenance reminders, and repair records therefore need explicit cross-owner vehicle tests and, if required, stronger constraints/policies.

The validated foreign keys cascade profile deletion into garages, cases, reminders, and repair records. Deleting a garage sets `diagnostic_cases.vehicle_id` to NULL, but cascades deletion of related reminders and repair records. These delete behaviors must be included in the retention/deletion and recovery design. No trigger was found to automatically create a profile row after an Auth user is created; profile provisioning is therefore an unresolved signup-design requirement.

The profile UPDATE policy and the combined `ALL` policies also need explicit review of `USING`, `WITH CHECK`, permitted columns, and command-specific behavior. Policy names are not proof of authorization correctness.

## Performance advisor findings

The performance advisor returned:

- **7 unindexed foreign keys** across diagnostic cases, garages, reminders, and repair records.
- **8 RLS initialization-plan warnings** where `auth.uid()` is evaluated in a row-level expression without a scalar subquery wrapper.
- **5 multiple-permissive-policy warnings** for SELECT on `diagnostic_cases` across database roles.

These are performance findings, not authorization fixes. Resolve security semantics first, then assess index choices against expected query patterns and re-run advisors.

## Required remediation sequence

1. Confirm the intended product feature and every authorized database consumer before changing grants.
2. Verify backup/PITR availability and a recovery procedure.
3. Capture the full live schema, constraints, indexes, grants, default ACLs, role memberships, policies, Auth settings, storage configuration, extensions, and migration state.
4. Design least-privilege grants and RLS for guest, authenticated user, and separately controlled administrator paths.
5. Prevent profile email exposure and role self-assignment; redesign public case sharing as a field-allowlisted model.
6. Enforce that linked vehicle records belong to the same owner.
7. Create synthetic-user negative tests in a safe non-production environment. Do not create a paid branch without approval.
8. Reconcile the existing live schema into Git-tracked migrations. Do not replay a guessed baseline.
9. Apply no production DDL or privilege changes until a separate review, recovery plan, and explicit authorization are complete.
10. After security fixes, address advisor performance findings and repeat the audit.

## Release blockers and boundaries

- Supabase frontend integration remains unimplemented and must remain blocked until the security acceptance tests pass.
- Diagnostic content requires qualified mechanic review and authoritative vehicle-appropriate references.
- Browser, mobile, accessibility, and end-to-end testing remain outstanding.
- The GitHub Pages dynamic deployment event succeeded, but the served URL and Pages source configuration have not been verified. Treat this as a potential live-publication condition requiring owner review.
- No database, GitHub Pages setting, production infrastructure, paid service, or user data was changed as part of this read-only audit.
