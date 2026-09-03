# Task Breakdown: About Me

**ID:** SPEC-006  
**Phase:** Phase 1 — Static Portfolio  
**Spec:** `docs/specs/006-about-me/spec.md`  
**Plan:** `docs/specs/006-about-me/plan.md`  
**Status:** Approved

## Revision Status

Portfolio-owner review rejected the implementation presented at the former T045 checkpoint. No task below is approved for implementation until the revised specification, plan, and this task breakdown are approved.

The former long-document desktop tasks are superseded: former T018–T021 (sticky-oriented desktop visual baseline), T022–T028 (active milestone selected by `IntersectionObserver`), T029–T031 (sticky desktop scrollytelling and rendered review), T034–T036 (accessibility validation that lacked explicit stage controls), T042–T045 (gates/checkpoint for the rejected model), and their dependent T046–T055 continuation. Former data, exact-copy, anchor, semantic-DOM, mobile, imagery, and scope requirements remain valid but must be revalidated against the revised desktop architecture.

## Phase 1 — Re-establish the Accepted Story Baseline

- [ ] **T001** Inspect the rejected Story implementation and existing tests. Record the exact component/style/test files that encode the prior sticky or scroll-driven active-milestone model; do not change code before revised-task approval.
- [ ] **T002** Preserve/reconfirm the readonly feature-local `storyMilestones` collection as the sole approved-copy source; assert exact labels, lines, qualification, UNICEN wording, Fantavision uncertainty, Slackware boundaries, time jump, and final line.
- [ ] **T003** Preserve/reconfirm App behavior tests for `Explore My Story`, `id="about"`, exactly one Home anchor, exactly one Header `Story` anchor, no future navigation links, and no routing infrastructure.
- [ ] **T004** Preserve/reconfirm semantic chronology tests proving every milestone remains in meaningful DOM order and accessible without active-stage JavaScript or imagery.
- [ ] **T005** Run focused existing tests and document the expected red state caused by replacing the rejected desktop behavior before changing production code.

**Checkpoint:** Approved content, navigation, and semantic fallback remain protected while obsolete desktop mechanics are identified.

## Phase 2 — Bounded Stage Contract Through TDD

- [ ] **T006** Define a focused `StorySection` behavior contract for a local active index initialized to the first milestone, an eligible desktop stage state, and one-step forward/backward transitions.
- [ ] **T007** Add failing tests for native `Previous milestone` and `Next milestone` buttons, their exact accessible names, active visual correspondence, and disabled first/final boundaries.
- [ ] **T008** Add failing tests for the wheel contract using the smallest deterministic event helper: qualifying forward input advances exactly one step and calls `preventDefault`; qualifying backward input reverses one step and calls `preventDefault` only when a milestone exists in that direction.
- [ ] **T009** Add failing tests for boundary release: backward at the first and forward at the final milestone leave state unchanged and do not call `preventDefault`.
- [ ] **T010** Add failing tests for horizontal/zero/modifier/below-threshold input ignored without interception, one-gesture lock preventing repeated advancement, listener attachment only while desktop stage eligibility is true, and listener cleanup on deactivation/unmount.
- [ ] **T011** Run the focused bounded-stage test suite and record its expected red state before production changes.
- [ ] **T012** Keep tests behavioral: mock only needed event/listener/eligibility boundaries, do not emulate browser scroll internals or test CSS implementation details.

**Checkpoint:** The new owner-approved input, release, and accessible-control contract is observable and red.

## Phase 3 — Replace Rejected Desktop Mechanics

- [ ] **T013** Remove the rejected long-document desktop active-milestone mechanism, including sticky milestone-stage assumptions and `IntersectionObserver` closest-to-center selection. Preserve the semantic list and approved data.
- [ ] **T014** Implement local `activeIndex` with explicit one-step previous/next helpers shared by buttons and bounded wheel progression; do not add global state.
- [ ] **T015** Implement desktop-stage eligibility based on fine-pointer/responsive conditions and intentional stage viewport presence. If `IntersectionObserver` is retained, use it only for stage eligibility and disconnect it cleanly.
- [ ] **T016** Implement one non-passive wheel listener only while the stage is eligible. Normalize delta mode into direction, ignore non-qualifying input, and use a small local cooldown/lock that cannot consume future ordinary page scrolling.
- [ ] **T017** Implement outward boundary release exactly: first/backward and final/forward do not prevent default, do not alter active state, and permit document scrolling away from Story.
- [ ] **T018** Implement native Previous/Next buttons using the shared helpers, visible focus, appropriate disabled states, and no custom keyboard-only gesture requirement.
- [ ] **T019** Re-run T006–T010 tests and confirm green, including listener cleanup, one-step progression, gesture lock, boundaries, controls, and semantic content persistence.

**Checkpoint:** The rejected desktop mechanics have been replaced by a local bounded-stage state machine with an accessible non-wheel alternative.

## Phase 4 — Viewport Stage and Responsive Presentation

- [ ] **T020** Replace the long desktop milestone-document layout with an approximately viewport-sized Story Grid/Flex stage using existing SiteShell `wide` mode and SPEC-004 tokens. Do not modify SiteShell.
- [ ] **T021** Render left-side progress/timeline and right-side active narrative/abstract visual companion without making the active panel the sole narrative source.
- [ ] **T022** Make active state legible through node position/geometry, heading/text emphasis, controls, and visual correspondence in addition to color.
- [ ] **T023** Keep the deliberate time jump non-invented and the final 2026 treatment meaningful; do not add résumé, employment, technology-inventory, or unrelated gaming content.
- [ ] **T024** Add mobile/coarse-pointer/narrow/zoom-constrained CSS fallback to normal single-column chronological flow; do not attach wheel interception there or build a second component tree.
- [ ] **T025** Add reduced-motion Story rules that minimize non-essential transitions while retaining stage controls and active-state clarity.
- [ ] **T026** Re-run focused App/Story tests after styling and inspect for token reuse, no horizontal overflow intent, no hidden required text, no custom main scroll container, and no pointer-intercepting decoration.

**Checkpoint:** Desktop is a bounded visual stage; mobile and unsupported environments remain normal, complete document flow.

## Phase 5 — Accessibility, Content, and Scope Audits

- [ ] **T027** Extend/reuse axe-core coverage for semantic regressions introduced by controls and stage markup. Resolve only genuine violations with native semantics first.
- [ ] **T028** Verify keyboard use: both document anchors, Previous/Next controls, visible focus, disabled boundaries, complete screen-reader chronology, and no mouse-wheel-only requirement.
- [ ] **T029** Verify reduced motion leaves every Story operation functional and no motion is required for comprehension.
- [ ] **T030** Audit exact rendered copy against the authoritative approved-copy section in `spec.md`, including `With sound.`, the Spanish qualification, UNICEN sentence, deliberate time jump, and exact final line.
- [ ] **T031** Audit historical/editorial boundaries: no exact Fantavision date, CD-ROM speed, unsupported Slackware detail, invented chronology, employment history, or gaming content beyond the approved Alpha Centauri and LAN-party technical context.
- [ ] **T032** Confirm no Story imagery is added unless an image has owner-approved placement plus local source/ownership/license/attribution evidence. Otherwise retain abstract CSS fallback and omit the pixelated photo.
- [ ] **T033** Audit dependencies and production scope: no new dependency, router, GSAP/animation library, backend, API, persistence, localization, global scroll lock, custom main scroll container, or SPEC-007+ capability.

**Checkpoint:** The revised interaction remains accessible, content-exact, text-complete, static, image-safe, and in scope.

## Phase 6 — Rendered Validation and Quality Gates

- [ ] **T034** Perform rendered desktop review at 1280px and 1536px: ordinary entry to `#about`, stationary stage while milestones advance, one gesture/one step, forward/backward progression, no viewport movement between milestones, and natural exit at both outer boundaries.
- [ ] **T035** Perform rendered mobile/tablet review at 375px and 768px: natural touch scrolling, sequential chronology, no wheel-stage behavior, no scroll trap, no ordinary-content horizontal overflow, readable anchors and hierarchy.
- [ ] **T036** Perform rendered accessibility review at 200% zoom and with reduced motion: focus, controls, contrast intent, no clipping/overlap, stage fallback, and complete chronology. Record jsdom/axe limits for physical scrolling, motion, contrast, and layout.
- [ ] **T037** Run and pass `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run test:run`, `npm run validate:data`, `npm run build`, and repository-root `git diff --check`.
- [ ] **T038** Complete full diff, static-output, exact-copy, historical-fact, dependency, and scope-drift review. Confirm Vite `/hmeclazcke-portfolio/` base, GitHub Pages compatibility, backend independence, and unchanged SiteShell contract.
- [ ] **T039** Start the local frontend only after T027–T038 pass and report the exact local review URL.

**Checkpoint:** Revised implementation and evidence are ready for renewed owner review.

## Phase 7 — PORTFOLIO OWNER VISUAL APPROVAL REQUIRED

- [ ] **T045 — PORTFOLIO OWNER VISUAL APPROVAL REQUIRED** Stop and obtain explicit portfolio-owner review. Review Home and Header anchors; `#about` arrival; stage entry; forward/backward wheel/trackpad progression; one-gesture protection; first/final boundary release; absence of outside-stage/global interception; Previous/Next keyboard controls; semantic chronology; 375px, 768px, 1280px, 1536px, 200% zoom, and reduced motion; time jump; final 2026 treatment; `With sound.`; and abstract imagery fallback. Do not mark this complete or execute T046–T055 without explicit owner approval.

## Phase 8 — Owner Feedback and Final Convergence

- [ ] **T046** Record explicit renewed portfolio-owner feedback. If no refinement is requested, record a no-op only after approval evidence covers T045.
- [ ] **T047** Implement only explicitly requested SPEC-006-local refinements. Do not add historical content, imagery, dependencies, or later-spec scope without approval.
- [ ] **T048** Re-run affected tests, rendered review, exact-copy/historical audits, and quality gates after refinement.
- [ ] **T049** After approval, update durable documentation only if justified; do not document CSS details or SPEC-011 methodology.
- [ ] **T050** Update lifecycle documents only when evidence supports actual status, preserving the Current Development Environment and SPEC-005 completion.
- [ ] **T051** Update README only if the completed public feature materially changes external-reader information under repository policy.
- [ ] **T052** Validate every SPEC-006 FR and SC, including the revised bounded-stage requirements and owner approval.
- [ ] **T053** Run final applicable quality gates.
- [ ] **T054** Complete final accessibility, responsive, historical, scope, and diff review.
- [ ] **T055** Mark SPEC-006 complete only when T001–T054 have genuinely succeeded; do not commit or push.

## Completion

SPEC-006 remains incomplete. Completion requires explicit renewed owner approval after the revised bounded desktop stage has passed all quality gates, preserves full semantic chronology and mobile natural scrolling, and releases ordinary document scrolling at both Story boundaries.
