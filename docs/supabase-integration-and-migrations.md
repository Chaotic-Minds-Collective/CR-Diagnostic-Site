# Supabase integration and migration workflow

**Status:** Live project access restored; current database audit is read-only. No production database changes or frontend integration are authorized by this document.

## Current architecture

The public website is a React 19 / TypeScript / Vite application. Its educational diagnostic library is bundled locally in `src/data/diagnosticsData.ts`. The browser does not initialize a Supabase client or call Supabase APIs. Public search and educational guides do not require a database.

The existing Supabase tables describe account-specific data (profiles, garages, diagnostic cases, maintenance reminders, and repair records). Do not repurpose these private user-data tables as the public diagnostic content library.

## Confirmed project

- Project: **Greasy Dojo Site**
- Project ref: `rwehmmvjahpfeugfaxis`
- Organization: `wwronlwuwytwbioagyke`
- Region: `us-east-1`
- PostgreSQL engine: 17
- Status: `ACTIVE_HEALTHY`

Read-only inventory found five public tables: `profiles`, `garages`, `diagnostic_cases`, `maintenance_reminders`, and `repair_records`. All five reported zero rows during inspection, all have RLS enabled, and none has FORCE RLS enabled. The migration list is empty. No views, functions, or triggers were found in `public`. Storage has no buckets or policies in the inspected project.

An empty migration list does not mean the database has no schema. The existing schema must be baselined from the live project, not recreated from assumptions.

## Verified security findings — do not connect the frontend yet

1. **Profiles:** a public SELECT policy uses `true` on a table containing email and role fields; `anon` has SELECT privilege. Public callers may be able to read private profile fields.
2. **Role assignment:** authenticated users have UPDATE privilege on their own profile, including the `role` column. The current owner-row policy does not restrict writable columns, while the role constraint permits `admin`. This creates a high-priority role self-escalation risk.
3. **Shared cases:** a public SELECT policy exposes all columns of rows where `is_shared = true`. The table contains owner IDs, vehicle references, and notes; no column projection or redaction is present. The table definition has no VIN column.
4. **Grants:** `anon` and `authenticated` have SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, and TRIGGER privileges on all five public tables. RLS still applies to row-level DML, but does not protect operations such as TRUNCATE.
5. **Default privileges:** default ACLs grant broad table, sequence, and function privileges to API roles for future public objects. This must be corrected before future objects are created.
6. **Vehicle ownership:** current row ownership checks do not by themselves prove that a linked `vehicle_id` belongs to the same user as the diagnostic case, reminder, or repair record.
7. **Performance:** the advisor reported seven unindexed foreign keys, eight RLS initialization-plan warnings, and five multiple-permissive-policy warnings.

The security advisor returned no lints, but this does not negate the manual authorization findings above. No exploit was executed and no synthetic-user access tests have yet been run.

## Safe migration and remediation sequence

### Phase 1 — Complete the baseline
1. Capture all schemas, tables, views, columns/types/defaults, constraints, foreign keys, indexes, triggers, functions, policies, grants, default privileges, role memberships, extensions, storage buckets/policies, Auth settings, and migration history.
2. Confirm all authorized clients and integrations. The database may have consumers not represented in this website repository.
3. Verify backup/PITR availability and document a recovery procedure.
4. Reconcile the live schema with Git history. Do not infer a baseline from the table names or an empty migration list.

### Phase 2 — Design the authorization model
1. Define the first approved user-facing feature and the minimum data it needs.
2. Keep guest access to private account/vehicle-history tables disabled by default.
3. Restrict authenticated users to their own records, including linked vehicle ownership on INSERT and UPDATE.
4. Prevent users from changing their own role or other authorization metadata. Use a separately controlled role-assignment process.
5. Remove public access to private profile fields. If public sharing is later required, use a separate allowlisted representation and explicit consent/moderation.
6. Review table, column, sequence, function, schema, and default privileges for every role.
7. Keep privileged server credentials out of browser code; only a publishable key may be considered after policy/grant tests pass.

### Phase 3 — Synthetic security tests
Use only synthetic users and records in a safe non-production environment:

- Anonymous callers cannot read private profiles, garages, reminders, or repair records.
- User A cannot read, update, delete, or link User B's records/vehicles.
- User A cannot change their role, including to `admin`.
- Shared public cases expose only explicitly allowlisted fields.
- API roles cannot perform unneeded destructive or administrative operations.
- Expired/invalid sessions and unauthorized requests fail closed.
- Empty, denied, and error states are handled safely by the frontend.

Do not create a paid Supabase branch without checking cost and receiving approval. Do not use production data for negative tests.

### Phase 4 — Migration baseline and future changes
1. Use the current Supabase CLI documentation and project access to pull the actual existing schema into a local baseline.
2. Review the generated baseline against the live schema, object owners, policies, grants, and extensions.
3. Commit the reviewed baseline to `supabase/migrations/` on a feature branch as a representation of existing state, not as a migration to replay blindly against the provisioned project.
4. Verify migration history and schema diff. Do not run `db push`, reset, destructive DDL, or migration-history repair until separately reviewed and approved.
5. For future schema changes, create migration files using the supported Supabase CLI workflow, include only the intended change, and document data impact, grants/RLS, compatibility, tests, and recovery.

## GitHub and release controls

- Keep `main` as the stable source of truth; use focused feature branches and pull requests.
- Do not commit credentials, user data, database dumps containing personal information, or secret keys.
- Do not connect the frontend until the authorization model and tests pass.
- Do not enable automatic database branching or production database deployment as a shortcut.
- No production DDL, permission changes, database reset, paid resources, or deployment is authorized by this document.
