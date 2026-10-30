# Diagnostic Content Review Register

**Project:** The Diagnostic Bay  
**Status:** Draft content inventory — no mechanic or translation approvals recorded  
**Last updated:** 2026-10-30

## Publication rule

The three supplied mechanic-review documents explicitly identify their content as draft and unverified. Their technical statements, test sequences, safety warnings, vehicle specifications, and quiz answers must not be presented as approved public guidance.

Content may move into the public library only after:
1. A qualified mechanic reviews each individual item and marks it Approved, Change needed, or Remove.
2. Required vehicle-specific specifications and reputable technical references are supplied.
3. Requested changes are resolved and the mechanic records a reviewer name and date.
4. Approved English copy is sent to the Spanish reviewer; translation is reviewed before publication.
5. The content register and public page metadata are updated to reflect the actual approvals.

A DTC is evidence, not proof that a component has failed. Generic guidance must defer to service information for the exact vehicle.

## Source inventory

| Source | Trouble-code entries | Guides | Learning quiz | Current status |
|---|---:|---:|---:|---|
| Round 1 | 2 entries (P0300 and P0301–P0306 family) | 2 | Questions 1–5 | Draft / mechanic review pending |
| Round 2 | 5 entries (P0171, P0172, P0174, P0562, P0563) | 2 | Questions 6–10 | Draft / mechanic review pending |
| Round 3 | 5 entries (P0101, P0102, P0103, P0128, P0133) | 2 | Questions 11–15 | Draft / mechanic review pending |

The quiz is incomplete in the supplied material: questions 16–20 are not present. Do not present the partial set as a complete course or assessment.

## Integration notes

- The current React application contains a starter library of 12 code summaries and six field guides in `src/data/diagnosticsData.ts`.
- Several draft topics overlap existing entries. Do not create duplicate code or guide records when integrating approved revisions.
- The supplied rounds contain five additional code entries not currently represented as separate records in the starter library: P0174, P0563, P0102, P0103, and P0133.
- The supplied material does not provide the authoritative references or vehicle-specific values represented by `[spec]` placeholders.
- The current public UI correctly labels the starter library as draft. That label must remain until the actual review and reference requirements are satisfied.

## Review tracking

No individual item has been approved in the project records available for this build. Record item-level decisions below when the mechanic returns the review.

| Item | Mechanic decision | Reviewer | Date | References complete | Spanish review |
|---|---|---|---|---|---|
| Round 1 items | Pending | — | — | No | Not started |
| Round 2 items | Pending | — | — | No | Not started |
| Round 3 items | Pending | — | — | No | Not started |

## Change history

- 2026-10-30: Created register from the three supplied review drafts. No draft automotive content was promoted to the public library.
