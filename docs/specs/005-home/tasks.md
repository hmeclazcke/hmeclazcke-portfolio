# Task Breakdown: Home

**ID:** SPEC-005  
**Phase:** Phase 1 — Static Portfolio  
**Spec:** `docs/specs/005-home/spec.md`  
**Plan:** `docs/specs/005-home/plan.md`  
**Status:** Approved

## Task Summary

Implement the approved, static Home hero by replacing the walking-skeleton main content while preserving the completed SPEC-004 shell and visual system. The work is intentionally limited to one focused component, its CSS Module, and the existing App test area. No new dependency, route, navigation, CTA, canonical-data presentation, or later-spec capability is permitted.

## Phase 1 — Home Behavior TDD (US-001, US-002, US-003, US-004)

- [ ] **T001** Update `frontend/src/App.test.tsx` before production code to express the approved Home behavior. Assert the exact approved title, technology line, and supporting paragraph; absence of `Hello, world!` and the Lorem Ipsum placeholder; absence of links and buttons; one professional-title `h1`; existing banner, main, and contentinfo landmarks; and header identity `Hernán Meclazcke` plus `hmeclazcke`. Do not assert CSS classes or implementation wrappers.

- [ ] **T002** Run the focused App test after T001 and confirm it fails for the expected reason: the temporary walking-skeleton content remains and the approved Home content is not yet rendered. Record the red result before modifying production files.

## Phase 2 — Minimal Home Implementation (US-001, US-002, US-003, US-004)

- [ ] **T003** Create `frontend/src/components/home/HomeHero.tsx` as the single focused Home component. Render only the approved professional title as the `h1`, the exact approved curated technology line, and the exact approved supporting paragraph. Do not import or derive content from `frontend/src/data/portfolio-data.ts` or canonical JSON.

- [ ] **T004** Update `frontend/src/App.tsx` to replace only the temporary main child with `HomeHero` inside the existing default/readable `SiteShell`. Retain the existing `SiteHeader` and `SiteFooter` through `SiteShell`; do not alter `SiteShell`, add identity duplication, or introduce a route, navigation, CTA, button, link, image, or later-spec content.

- [ ] **T005** Re-run the focused App test from T002 and confirm green. Verify the observed DOM satisfies the exact-copy, placeholder-removal, no-link/button, sole-`h1`, landmark, and header-identity assertions before considering the behavior TDD cycle complete.

## Phase 3 — Focused Home Styling (US-002, US-003)

- [ ] **T006** Create `frontend/src/components/home/HomeHero.module.css` and apply it from `HomeHero.tsx`. Use only existing SPEC-004 semantic tokens, typography roles, CSS Modules, and the existing readable shell width to establish hierarchy, title emphasis, selective technical technology-line treatment, readable supporting paragraph, whitespace, vertical rhythm, restrained accents, and responsive single-column behavior. Do not modify the palette, typography system, global styles, or shell/header/footer components, and add no dependency.

- [ ] **T007** Run the focused App test after styling and confirm it remains green. Inspect the implementation for token reuse and verify no CSS implementation detail was added to behavioral tests.

## Phase 4 — Accessibility and Responsive Verification (US-003)

- [ ] **T008** Reuse the existing axe-core App test in `frontend/src/App.test.tsx` for the changed rendered Home structure. Extend it only if needed for an observable semantic regression; run it and resolve any applicable violation with the smallest native semantic HTML change. Keep axe/jsdom limitations documented and do not weaken rules, invent ARIA, or fabricate keyboard-interaction tests for this non-interactive Home.

- [ ] **T009** Perform local rendered-browser verification of the Home at 375px, 768px, 1280px, and 1536px, plus 200% zoom/text resizing. Verify the sole logical `h1`, intact shell landmarks, readable structure and line lengths, no color-only meaning, reduced-motion compatibility, no clipping, overlap, or problematic horizontal scrolling, sensible whitespace, and clear hierarchy. Record that rendered keyboard focus inspection is not applicable unless an interactive control has actually been introduced.

## Phase 5 — Local Quality Gates and Scope Checkpoint

- [ ] **T010** Run and pass all required automated gates from `frontend/`: `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run test:run`, `npm run validate:data`, and `npm run build`; then run `git diff --check` from the repository root. Diagnose and correct only SPEC-005-local failures before rerunning affected checks.

- [ ] **T011** Complete the pre-owner-review content and scope audit. Verify exact approved copy, removal of both placeholders, no CTA/navigation/routing/links/buttons, no canonical-data presentation or data-derived technology line, no dependency or unexpected file, no personal photo/avatar or early-computing chronology, and no SPEC-006+ capability. Review the complete git diff.

- [ ] **T012** Start the local development application for portfolio-owner review after T010 and T011 pass. Record and report the exact local URL without committing or pushing.

## Phase 6 — PORTFOLIO OWNER VISUAL APPROVAL REQUIRED

- [ ] **T013 — PORTFOLIO OWNER VISUAL APPROVAL REQUIRED** Stop after reporting the local URL and wait for explicit portfolio-owner feedback. The owner must review the first impression; title hierarchy; technology-line presentation; paragraph readability; spacing; header/main/footer relationship; whether Home feels simple rather than empty and professional rather than generic; 375px, 768px, 1280px, and 1536px behavior; 200% zoom/text resizing; and consistency with SPEC-004. Do not mark this task complete, continue to T014, mark SPEC-005 complete, commit, or push until explicit approval is received.

## Phase 7 — Owner Feedback Refinement

- [ ] **T014** Record explicit portfolio-owner feedback and mark T013 complete only when approval evidence covers the required visual and responsive review. If no refinement is requested, explicitly record this stage as a no-op; do not invent changes.

- [ ] **T015** If the owner requests a refinement, implement only the approved SPEC-005-local adjustment in `frontend/src/components/home/HomeHero.tsx`, `frontend/src/components/home/HomeHero.module.css`, `frontend/src/App.tsx`, or `frontend/src/App.test.tsx` as genuinely required. Do not use feedback as permission for unapproved copy or SPEC-006+ functionality.

- [ ] **T016** If T015 changes behavior, semantics, styles, or layout, rerun affected focused tests, axe checks, responsive/zoom review, and applicable quality gates. Repeat owner review when the change materially affects the approved appearance.

## Phase 8 — Documentation Convergence

- [ ] **T017** After owner approval and successful applicable validation, update `docs/roadmap.md` and `docs/current.md` to reflect the actual SPEC-005 lifecycle state. Preserve completed SPEC-004 information and the Current Development Environment section.

- [ ] **T018** Review `docs/architecture.md`, `docs/quality-gates.md`, and `docs/references.md`; update only a document for a real, completed implementation decision or durable validation responsibility. Do not document detailed Home copy as architecture.

- [ ] **T019** Review the README against its repository policy and authoritative documentation. Update it only if completed Home content materially changes useful external reader information. Do not add SDD methodology, agent workflow, or early-computing biography; those remain SPEC-011 and SPEC-006 scope respectively.

## Phase 9 — Final Convergence

- [ ] **T020** Validate every functional requirement FR-001–FR-020 and every success criterion SC-001–SC-010 against implementation and recorded evidence, including exact-copy review, semantic/axe review, rendered accessibility limitations, responsive/zoom review, static deployment compatibility, and explicit owner approval.

- [ ] **T021** Run final applicable quality gates after any post-approval changes: `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run test:run`, `npm run validate:data`, `npm run build`, and `git diff --check`.

- [ ] **T022** Perform final scope-drift and complete git-diff review. Explicitly confirm that SPEC-005 did not introduce About Me, a personal photo/avatar, early-computing chronology, Technology Graph functionality, projects, GitHub integration, SDD methodology, contact, routing, navigation, backend/API, authentication, persistence, localization, canonical-data presentation, links, buttons, or new dependencies.

- [ ] **T023** Confirm documentation convergence is consistent with the completed implementation and no documentation claims unsupported validation or owner approval. Verify tasks are checked only where implementation and evidence support completion.

- [ ] **T024** Mark SPEC-005 complete in its lifecycle documentation only after T001–T023 have satisfied their evidence requirements. Do not commit or push as part of this task.

## Dependency Flow

```text
T001 → T002 → T003 → T004 → T005 → T006 → T007 → T008 → T009
     → T010 → T011 → T012 → T013 (owner approval stop)
     → T014 → T015/T016 when feedback requires changes
     → T017 → T018 → T019 → T020 → T021 → T022 → T023 → T024
```

T013 is a mandatory human-approval boundary. T014–T024 remain incomplete until explicit portfolio-owner approval is received. T015 and T016 are conditional: when no refinement is requested, T014 records the no-op and their non-applicability must be documented honestly rather than converted into invented changes.

## Completion

SPEC-005 is complete only when all required applicable tasks have verified evidence, the owner has explicitly approved the rendered Home experience, lifecycle documentation accurately records completion, and the final scope review confirms no later capability was introduced. Automated tests and builds cannot substitute for portfolio-owner visual approval.
