# Feature Specification: Technology Graph Search

**ID:** SPEC-015  
**Status:** Complete — owner visual acceptance passed  
**Depends on:** SPEC-007 — Technology Graph

## Purpose

Add a compact, real-time search control to the completed Technology Graph so visitors can efficiently locate technologies without replacing its exploratory interaction.

## Scope

- Filter technologies by a case-insensitive, trimmed, literal prefix of their displayed name.
- Treat an empty trimmed query as no filter; preserve canonical data and derive each visible projection.
- Apply the same query semantics to the desktop D3 graph and the mobile family explorer.
- Retain only links whose two technology endpoints are visible; never invent links or expose family nodes.
- Reheat the existing desktop force simulation for each visible projection, including zero-, one-, and unlinked-result sets.
- Preserve a selected visible technology; clear selection and transient node/edge hover state when their target is filtered out.
- Provide an accessible compact input, Escape-to-clear while it has a non-empty query, and a concise stable no-results state.

## Out of Scope

No fuzzy, substring, category, URL, backend, persistence, analytics, dependency, data-inventory, graph-semantic, or unrelated visual redesign work.

## Acceptance Criteria

1. Literal prefix search is immediate, case-insensitive, and trims leading/trailing whitespace without regex interpretation.
2. Clearing restores the exact full technology-node/link projection and normal graph/mobile behavior.
3. Desktop visible nodes and valid links re-organize through the existing simulation; no simulations or stale state leak across queries.
4. Mobile hides nonmatches and empty families while preserving its existing family explorer architecture.
5. Zero, one, special-character, Unicode, and very-long queries are safe; zero results has concise in-region feedback.
6. Search maintains keyboard access and focus, and Escape clears a non-empty input before graph-level Escape behavior.

## Adversarial Review

| Finding | Severity | Resolution |
| --- | --- | --- |
| Prefix could be mistaken for substring matching. | Major | Explicitly require displayed-name `startsWith` only. |
| D3 could retain removed nodes/links or simulations. | Major | Derived projection replaces the single simulation's input and its effect cleans up the prior simulation. |
| Selection/tooltip could reference hidden entities. | Major | Clear selected, hovered node, and hovered edge state when absent from the projection. |
| Desktop and mobile could drift. | Major | Both consume one pure filtered projection. |
| Regex-like input could throw. | Major | Normalize strings and use literal `startsWith`; no regex. |
| Zero/one results and Escape precedence need definition. | Minor | Explicit acceptance behavior above. |

No blocker remains under the owner's explicit authorization.

## Closure

Implementation and automated verification completed with 20 focused tests, 74 full-suite tests, formatting, lint, typecheck, canonical-data validation, production build, and whitespace diff checks passing. The owner manually verified prefix search, graph reorganization, reset, edge cases, selection/tooltip cleanup, Escape behavior, mobile filtering, focus/layout stability, and console cleanliness. Owner visual acceptance passed; SPEC-015 is formally closed.
