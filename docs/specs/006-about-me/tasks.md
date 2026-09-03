# Task Breakdown: About Me

> **Final T045 interaction supersession:** Tasks referring to wheel interception, cooldowns, stage eligibility, or a clickable time-jump are replaced by the native-scroll plus invisible-scroll-space and sticky-stage contract. Final owner approval is recorded.

**ID:** SPEC-006  
**Phase:** Phase 1 — Static Portfolio  
**Spec:** `docs/specs/006-about-me/spec.md`  
**Plan:** `docs/specs/006-about-me/plan.md`  
**Status:** Complete

## Revision Status

Portfolio-owner review rejected the implementation presented at the former T045 checkpoint. The revised stationary desktop stage is approved for implementation; the owner subsequently rejected its proposed visible Previous/Next buttons in favor of focused Arrow-key progression. No task below is complete until it is evidenced against this final interaction contract.

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
- [ ] **T007** Add failing tests for focused desktop-stage Arrow-key progression: `ArrowDown`/`ArrowRight` advance, `ArrowUp`/`ArrowLeft` reverse, the same active index drives the visual, and outward-boundary keys retain normal browser behavior. Verify visible Previous/Next buttons are absent.
- [ ] **T008** Add failing tests for the wheel contract using the smallest deterministic event helper: qualifying forward input advances exactly one step and calls `preventDefault`; qualifying backward input reverses one step and calls `preventDefault` only when a milestone exists in that direction.
- [ ] **T009** Add failing tests for boundary release: backward at the first and forward at the final milestone leave state unchanged and do not call `preventDefault`.
- [ ] **T010** Add failing tests for horizontal/zero/modifier/below-threshold input ignored without interception, one-gesture lock preventing repeated advancement, listener attachment only while desktop stage eligibility is true, and listener cleanup on deactivation/unmount.
- [ ] **T011** Run the focused bounded-stage test suite and record its expected red state before production changes.
- [ ] **T012** Keep tests behavioral: mock only needed event/listener/eligibility boundaries, do not emulate browser scroll internals or test CSS implementation details.

**Checkpoint:** The new owner-approved input, release, and accessible-control contract is observable and red.

## Phase 3 — Replace Rejected Desktop Mechanics

- [ ] **T013** Remove the rejected long-document desktop active-milestone mechanism, including sticky milestone-stage assumptions and `IntersectionObserver` closest-to-center selection. Preserve the semantic list and approved data.
- [ ] **T014** Implement local `activeIndex` with explicit one-step previous/next helpers shared by focused Arrow-key and bounded wheel progression; do not add global state.
- [ ] **T015** Implement desktop-stage eligibility based on the desktop width breakpoint, fine-pointer condition, and intentional stage viewport presence; do not add a desktop-height fallback. If `IntersectionObserver` is retained, use it only for stage eligibility and disconnect it cleanly.
- [ ] **T016** Implement one non-passive wheel listener only while the stage is eligible. Normalize delta mode into direction, ignore non-qualifying input, and use a small local cooldown/lock that cannot consume future ordinary page scrolling.
- [ ] **T017** Implement outward boundary release exactly: first/backward and final/forward do not prevent default, do not alter active state, and permit document scrolling away from Story.
- [ ] **T018** Implement focused desktop-stage Arrow-key handling using the shared active-index helpers, visible focus, and outward-boundary release. Do not render Previous/Next buttons or introduce a keyboard trap.
- [ ] **T019** Re-run T006–T010 tests and confirm green, including listener cleanup, one-step progression, gesture lock, boundaries, Arrow-key behavior, and semantic content persistence.

**Checkpoint:** The rejected desktop mechanics have been replaced by a local bounded-stage state machine with an accessible non-wheel alternative.

## Phase 4 — Viewport Stage and Responsive Presentation

- [ ] **T020** Replace the long desktop milestone-document layout with a compact one-viewport Story Grid/Flex stage using existing SiteShell `wide` mode and SPEC-004 tokens. It must remain active and fit at 1280×720, 1366×768, 1536×864, and 1920×1080 without a timeline scrollbar or height-driven sequential fallback. Do not modify SiteShell.
- [ ] **T021** Render left-side compact progress/timeline and a right-side stable-aspect-ratio active narrative/abstract media rectangle without making the active panel the sole narrative source. Keep the rectangle when imagery is absent.
- [ ] **T022** Make active state legible through node position/geometry, heading/text emphasis, and visual correspondence in addition to color.
- [ ] **T023** Keep the deliberate time jump non-invented and the final 2026 treatment meaningful; do not add résumé, employment, technology-inventory, or unrelated gaming content.
- [ ] **T024** Add below-breakpoint mobile/coarse-pointer/touch CSS fallback to normal single-column chronological flow; do not attach wheel interception there or build a second component tree. Do not use ordinary desktop height as a fallback condition.
- [ ] **T025** Add reduced-motion Story rules that minimize non-essential transitions while retaining Arrow-key functionality and active-state clarity.
- [ ] **T026** Re-run focused App/Story tests after styling and inspect for token reuse, no horizontal overflow intent, no hidden required text, no custom main scroll container, and no pointer-intercepting decoration.

**Checkpoint:** Desktop is a bounded visual stage; mobile and unsupported environments remain normal, complete document flow.

## Phase 5 — Accessibility, Content, and Scope Audits

- [ ] **T027** Extend/reuse axe-core coverage for semantic regressions introduced by stage markup and focused keyboard behavior. Resolve only genuine violations with native semantics first.
- [ ] **T028** Verify keyboard use: both document anchors, focused Arrow-key progression, visible focus, first/final boundary release, complete screen-reader chronology, and no mouse-wheel-only requirement.
- [ ] **T029** Verify reduced motion leaves every Story operation functional and no motion is required for comprehension.
- [ ] **T030** Audit exact rendered copy against the authoritative approved-copy section in `spec.md`, including `With sound.`, the Spanish qualification, UNICEN sentence, deliberate time jump, and exact final line.
- [ ] **T031** Audit historical/editorial boundaries: no exact Fantavision date, CD-ROM speed, unsupported Slackware detail, invented chronology, employment history, or gaming content beyond the approved Alpha Centauri and LAN-party technical context.
- [ ] **T032** Confirm no Story imagery is added unless an image has owner-approved placement plus local source/ownership/license/attribution evidence. Otherwise retain abstract CSS fallback and omit the pixelated photo.
- [ ] **T033** Audit dependencies and production scope: no new dependency, router, GSAP/animation library, backend, API, persistence, localization, global scroll lock, custom main scroll container, or SPEC-007+ capability.

**Checkpoint:** The revised interaction remains accessible, content-exact, text-complete, static, image-safe, and in scope.

## Phase 6 — Rendered Validation and Quality Gates

- [ ] **T034** Perform rendered desktop review at 1280×720, 1366×768, 1536×864, and 1920×1080: ordinary entry to `#about`, stationary stage while milestones advance, one gesture/one step, forward/backward progression, no viewport movement between milestones, compact fully visible progress timeline, stable media rectangle, and natural exit at both outer boundaries.
- [ ] **T035** Perform rendered mobile/tablet review at 375px and 768px: natural touch scrolling, sequential chronology, no wheel-stage behavior, no scroll trap, no ordinary-content horizontal overflow, readable anchors and hierarchy.
- [ ] **T036** Perform rendered accessibility review at 200% zoom and with reduced motion: focused stage, Arrow-key behavior, contrast intent, no clipping/overlap, stage fallback, and complete chronology. Record jsdom/axe limits for physical scrolling, motion, contrast, and layout.
- [ ] **T037** Run and pass `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run test:run`, `npm run validate:data`, `npm run build`, and repository-root `git diff --check`.
- [ ] **T038** Complete full diff, static-output, exact-copy, historical-fact, dependency, and scope-drift review. Confirm Vite `/hmeclazcke-portfolio/` base, GitHub Pages compatibility, backend independence, and unchanged SiteShell contract.
- [ ] **T039** Start the local frontend only after T027–T038 pass and report the exact local review URL.

**Checkpoint:** Revised implementation and evidence are ready for renewed owner review.

## Phase 7 — PORTFOLIO OWNER VISUAL APPROVAL REQUIRED

- [x] **T045 — PORTFOLIO OWNER VISUAL APPROVAL REQUIRED** Owner approved the desktop and mobile Story interaction.

## Phase 8 — Owner Feedback and Final Convergence

- [x] **T046** Record explicit renewed portfolio-owner feedback: T045 interaction approved; owner supplied exact Story-media and favicon direction.
- [x] **T047** Implement only explicitly requested SPEC-006-local refinements. Do not add historical content, imagery, dependencies, or later-spec scope without approval.
- [x] **T048** Re-run affected tests, rendered review, exact-copy/historical audits, and quality gates after refinement.
- [x] **T049** After approval, update durable documentation only if justified; do not document CSS details or SPEC-011 methodology.
- [x] **T050** Update lifecycle documents only when evidence supports actual status, preserving the Current Development Environment and SPEC-005 completion.
- [x] **T051** Update README only if the completed public feature materially changes external-reader information under repository policy.
- [x] **T052** Validate every SPEC-006 FR and SC, including the revised bounded-stage requirements and owner approval.
- [x] **T053** Run final applicable quality gates.
- [x] **T054** Complete final accessibility, responsive, historical, scope, and diff review.
- [x] **T055** Mark SPEC-006 complete only when T001–T054 have genuinely succeeded; do not commit or push.

## Completion

SPEC-006 is complete. Final owner approval confirms the approved desktop and mobile Story interaction, media, favicon paths, and applicable quality gates.
