# Supabase integration and migration workflow

**Status:** Workflow proposal; live database access must be restored before baseline capture or frontend connection. No database changes are authorized by this document.

## Current architecture and blocker

The current public site is a static HTML/CSS/JavaScript prototype. The searchable code library and field guides live in `app.js`; the browser does not currently initialize a Supabase client or call Supabase APIs. The existing tables describe account-specific data (profiles, garages, diagnostic cases, reminders, repair records), not the public educational content library. Do not repurpose those user-data tables as public content tables.

The last-known Supabase project was named **Greasy Dojo Site** with project ref `rwehmmvjahpfeugfaxis`. As of this audit, that project is not visible in the currently connected Supabase accounts. The connected accounts list different projects. Project details, schema, policies, API URL, and publishable key could therefore not be re-verified. Do not substitute another project based on its name.

## Safe sequence to establish migration history

1. Restore access to the intended Supabase project and confirm its project ref and organization.
2. Capture a read-only inventory: all schemas/tables/views, columns and types, primary/foreign keys, checks, indexes, grants, RLS enablement and policies, functions/triggers, storage buckets/policies, Auth settings, extensions, database advisors, and current migration history.
3. Take/verify a recoverable backup before any schema changes.
4. Pull the existing live schema into a local baseline using the Supabase CLI (for example, `supabase link --project-ref <confirmed-ref>` followed by `supabase db pull`). Review the generated baseline against the live schema; do not assume that an empty migration-history list means the database has no existing schema.
5. Commit the reviewed baseline to `supabase/migrations/` on a feature branch. Treat it as a representation of existing state, not a migration to replay blindly against the already-provisioned production database.
6. Verify the local migration history and schema diff against the live project. Do not run `db push`, apply DDL, reset, or repair migration history until the baseline is reconciled and a recovery plan is approved.
7. For each future schema change, create a timestamped migration file (Supabase CLI convention), include only the intended change, and review its effect on data, grants, RLS, indexes, and compatibility.
8. Test on a local database or an explicitly approved non-production environment. No paid Supabase branch should be created without checking cost and receiving approval.
9. Open a pull request. Require a description of the schema impact, RLS/access impact, backfill/data-loss risk, rollback/recovery plan, and test evidence.
10. Merge and deploy only after owner approval. Keep production deployment separate from ordinary GitHub merges.

## GitHub change-control rules

- `main` is the stable source of truth. Work on named feature/audit branches.
- Use one focused pull request per coherent change; never commit straight to `main` for ordinary development.
- PRs must identify affected files/systems, tests, risk, rollback, database migration impact, and outstanding approvals.
- Do not enable automatic production deployment or Supabase automatic branching as a shortcut. The existing Pages workflow is manual-only and guarded to run from `main`; keep it that way until release is approved.
- Record important architecture and brand decisions in documentation. Update the audit/changelog when a finding is fixed or its status changes.
- Never commit service-role/secret keys, credentials, user data, or database dumps containing personal data. Browser code may use only a Supabase publishable key after RLS and grants are verified.

## Frontend integration boundary

Connect Supabase only for a defined feature. Before adding sign-in, a garage, or saved diagnostic cases, define:
- which feature is in scope and which data is necessary;
- guest versus authenticated behavior and user-facing empty/error states;
- ownership and sharing rules;
- retention, export, and deletion expectations;
- RLS policies and grants for every table and operation;
- whether any server-side function is truly needed.

The public educational search can remain static initially. It does not require a database merely to be useful. If the product later needs centrally maintained public codes/guides, design a separate public-content schema with source citations and review status instead of exposing account tables.

## Current blockers

- The last-known project is not visible through the current Supabase connector authorization.
- The live schema and RLS expressions cannot currently be rechecked.
- Migration history was previously reported empty; that needs confirmation after access is restored.
- Do not create a fake baseline or claim the frontend is connected until a real connection and policy tests pass.
