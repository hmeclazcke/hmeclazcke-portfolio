# Tasks: Technology Graph

**ID:** SPEC-007  
**Status:** First visual checkpoint ready for owner review  
**Depends on:** Approved SPEC-007 specification and plan

**Implementation checkpoint:** Invisible family-layout guidance, technology-only rendering, direct visible-edge focus, physical node drag, viewport-fit graph entry, and deterministic major-section controls are ready for owner visual review. T008–T011 remain pending.

## T001 — Approve and apply canonical-data enrichment

- [ ] Review and approve `enrichment-proposal.md` record by record before changing canonical data.
- [ ] Add only approved Technology, Context, and Technology–Context Relationship records to canonical JSON; do not create graph-only data.
- [ ] Set categories and current/historical relevance only where owner-approved evidence supports them.
- [ ] Write failing focused data/projection tests first, then validate approved canonical data with the existing validator.

## T002 — Build the technology-only graph projection

- [ ] Write failing unit tests for a pure feature-local projection from canonical technologies, contexts, and relationships.
- [ ] Implement visible Technology nodes only, grouped `Used at` / `Learned at` evidence, and coalesced unordered technology pairs backed by shared contexts.
- [ ] Build and test the deterministic scored spanning forest, then apply fixed visual edge-budget and per-node degree limits for dense contexts without unsupported edges; retain every canonical relationship in tooltip and semantic output.

## T003 — Add the bounded D3-force SVG graph foundation

- [ ] Confirm dependency and bundle impact, then install only the approved D3 force dependency if still justified.
- [ ] Write focused rendering tests before implementing the React-owned SVG graph section and its canonical-data input boundary.
- [ ] Implement a seeded, bounded simulation that settles to stable positions, with no permanent physics loop or independent graph dataset.

## T004 — Establish visual language, labels, and relevance treatment

- [ ] Write focused tests for meaningful labels and supplied relevance metadata.
- [ ] Apply the approved graphite, grid, restrained green/amber language; distinguish state beyond color.
- [ ] Keep labels readable, constrain overlap where practical, and make current/historical treatment subtle rather than a filter system.

## T005 — Add focused interaction and canonical tooltip details

- [ ] Write failing behavior tests for hover, keyboard focus, and optional persistent click selection using one focused Technology ID.
- [ ] Implement emphasis of a focused node, direct neighbors, and incident edges while unrelated elements remain present but subdued.
- [ ] Render concise canonical `Used at`, `Learned at`, and relevance information without advanced SPEC-008 controls.

## T006 — Deliver responsive, reduced-motion, and mobile behavior

- [ ] Write focused tests for reduced motion and the chosen mobile/fallback behavior.
- [ ] Validate a touch-usable bounded graph only where labels and tap focus remain readable; otherwise retain the semantic representation as the functional mobile view.
- [ ] Prevent page-level horizontal overflow, scroll/touch traps, and microscopic forced desktop labels.

## T007 — Provide the semantic accessible companion

- [ ] Write failing tests for a meaningful structured Technology → used/learned contexts representation.
- [ ] Implement keyboard-reachable visual-node interaction, visible focus, non-hover access to the same context information, and a semantic companion independent of the SVG graph.
- [ ] Manually validate focus order, accessible names, reduced motion, and equivalent relationship understanding.

## T008 — Complete focused regression and data validation

- [ ] Run focused projection, interaction, accessibility, and responsive tests; preserve existing Home and approved Story behavior.
- [ ] Verify every visual edge has shared canonical-context evidence and that no contexts become visible graph nodes.
- [ ] Inspect desktop and mobile renders for settled motion, label legibility, tooltip/focus clarity, and static-host behavior.

## T009 — Run required quality gates

- [ ] Run existing format, lint, typecheck, test, canonical-data validation, build, and diff checks once after implementation is stable.
- [ ] Record actual results and resolve SPEC-007-scope failures without weakening tests.

## T010 — Owner visual and interaction checkpoint

- [ ] Obtain owner approval for graph readability, truthful relationships, tooltip information, desktop/mobile behavior, motion, and accessibility presentation.
- [ ] Do not begin SPEC-008 exploration features before this checkpoint is approved.

## T011 — Close SPEC-007

- [ ] Reconcile SPEC-007 documentation and current project status after owner approval.
- [ ] Complete only closure steps required by project workflow; do not commit, push, or start SPEC-008 without separate authorization.
