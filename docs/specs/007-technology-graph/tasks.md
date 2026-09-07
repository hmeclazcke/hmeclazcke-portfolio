# Tasks: Technology Graph

**ID:** SPEC-007  
**Status:** Complete - owner-approved
**Depends on:** Approved SPEC-007 specification and plan

**Implementation checkpoint:** Owner-approved canonical enrichment, technology-only rendering, invisible family-layout guidance, degree-balanced context edges, physical node drag, viewport-fit graph entry, responsive family explorer, and accessible relationship details are complete.

## T001 - Approve and apply canonical-data enrichment

- [x] Review and approve enrichment record by record before changing canonical data.
- [x] Add only approved Technology, Context, and Technology-Context Relationship records to canonical JSON; do not create graph-only data.
- [x] Set categories and current/historical relevance only where owner-approved evidence supports them.
- [x] Write focused data/projection tests and validate approved canonical data with the existing validator.

## T002 - Build the technology-only graph projection

- [x] Write unit tests for a pure feature-local projection from canonical technologies, contexts, and relationships.
- [x] Implement visible Technology nodes only, grouped `Used at` / `Learned at` evidence, and coalesced unordered technology pairs backed by shared contexts.
- [x] Implement and test the deterministic context-specific, degree-balanced projection with coverage repair, visual edge budget, and degree limits for dense contexts without unsupported edges; retain every canonical relationship in tooltip and semantic output.

## T003 - Add the bounded D3-force SVG graph foundation

- [x] Confirm dependency and bundle impact, then install only the approved D3 force dependency where justified.
- [x] Write focused rendering tests for the React-owned SVG graph section and its canonical-data input boundary.
- [x] Implement a seeded, bounded simulation that settles to stable positions, with no permanent physics loop or independent graph dataset.

## T004 - Establish visual language, labels, and relevance treatment

- [x] Write focused tests for meaningful labels and supplied relevance metadata.
- [x] Apply the approved graphite, grid, restrained green/amber language; distinguish state beyond color.
- [x] Keep labels readable, constrain overlap where practical, and make current/historical treatment subtle rather than a filter system.

## T005 - Add focused interaction and canonical tooltip details

- [x] Write behavior tests for hover, keyboard focus, and persistent click selection using one focused Technology ID.
- [x] Implement emphasis of a focused node, direct neighbors, and incident edges while unrelated elements remain present but subdued.
- [x] Render concise canonical `Used at`, `Learned at`, and relevance information without advanced SPEC-008 controls.

## T006 - Deliver responsive, reduced-motion, and mobile behavior

- [x] Write focused tests for reduced motion and the chosen mobile/fallback behavior.
- [x] Deliver the family-based explorer from canonical family metadata where the desktop graph is not readable, while retaining the semantic representation for assistive technology.
- [x] Prevent page-level horizontal overflow, scroll/touch traps, and microscopic forced desktop labels.

## T007 - Provide the semantic accessible companion

- [x] Write tests for a meaningful structured Technology-to-context representation.
- [x] Implement keyboard-reachable visual-node interaction, visible focus, non-hover access to the same context information, and a semantic companion independent of the SVG graph.
- [x] Validate focus order, accessible names, reduced motion, and equivalent relationship understanding.

## T008 - Complete focused regression and data validation

- [x] Run focused projection, interaction, accessibility, and responsive tests; preserve existing Home and approved Story behavior.
- [x] Verify every visual edge has shared canonical-context evidence and that no contexts become visible graph nodes.
- [x] Inspect desktop and mobile renders for settled motion, label legibility, tooltip/focus clarity, and static-host behavior.

## T009 - Run required quality gates

- [x] Run format, lint, typecheck, test, canonical-data validation, build, and diff checks once after implementation is stable.
- [x] Record actual results and resolve SPEC-007-scope failures without weakening tests.

## T010 - Owner visual and interaction checkpoint

- [x] Obtain owner approval for graph readability, truthful relationships, tooltip information, desktop/mobile behavior, motion, and accessibility presentation.
- [x] Do not begin SPEC-008 exploration features before this checkpoint is approved.

## T011 - Close SPEC-007

- [x] Reconcile SPEC-007 documentation and current project status after owner approval.
- [x] Complete only closure steps required by project workflow; do not commit, push, or start SPEC-008 without separate authorization.
