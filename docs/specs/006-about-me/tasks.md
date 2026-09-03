# Task Breakdown: About Me

**ID:** SPEC-006  
**Phase:** Phase 1 — Static Portfolio  
**Spec:** `docs/specs/006-about-me/spec.md`  
**Plan:** `docs/specs/006-about-me/plan.md`  
**Status:** Approved

## Task Summary

Implement the public-facing **Explore My Story** section defined by the approved internal artifact **SPEC-006 — About Me**. The feature is an in-page, progressively enhanced story: normal document scrolling and semantic chronological content are foundational; CSS sticky positioning and local `IntersectionObserver` active state enhance the wide-screen presentation only.

No task introduces React Router, a generic timeline/CMS framework, global state, a scroll/animation library, a backend, runtime external content, image hotlinks, or SPEC-007+ functionality. No task below is `[P]`: data, tests, shared App composition, Home/Header links, styling, observer behavior, visual review, and documentation have ordered dependencies or shared files.

## Phase 1 — Story Data and Content Contract Through TDD

**Goal:** Establish one focused, readonly Story data source containing only the approved narrative, separate from SPEC-003 canonical data.

- [ ] **T001** Create a focused failing contract test at `frontend/src/components/story/storyMilestones.test.ts` before production data exists. Assert the planned ordered records have stable ids; approved period/title values; readonly narrative lines; an explicit non-invented time-jump record; no use of `frontend/src/data/portfolio-data.ts`; and optional visual metadata only.

- [ ] **T002** Extend the failing contract test to assert every authoritative approved line from `docs/specs/006-about-me/spec.md` is represented exactly, including the LOGO opening, 486 hardware facts, IAC/BASIC/Fantavision wording without a forced year, Visual Basic/Sound Blaster/CD-ROM wording without a speed, course humor, Slackware text plus separate `With sound.`, LAN-party text, `Técnico en Informática Personal y Profesional`, `I started studying at UNICEN.`, the deliberate time jump, the 2026 narrative, and `And after all these years, I still have fun programming.`

- [ ] **T003** Run the focused Story data-contract test from `frontend/` and confirm it fails for the expected missing module/data reason before creating production data.

- [ ] **T004** Create `frontend/src/components/story/storyMilestones.ts` with the minimum readonly `StoryMilestone` type and ordered collection. Use only feature-local ids, period labels, titles, exact approved narrative lines, an explicit time-jump record, and optional visual metadata; do not create a CMS/content engine, infer dates, add technologies, or import SPEC-003 data.

- [ ] **T005** Re-run the focused Story data-contract test and confirm it is green. Review the collection against the authoritative **Approved visible labels and public copy** section in `docs/specs/006-about-me/spec.md`; record that no unsupported historical, employment, gaming, CD-ROM, Slackware, Fantavision-year, or UNICEN-degree detail exists.

**Checkpoint:** One feature-local, exact-copy Story data contract exists and does not alter the canonical data model.

## Phase 2 — Section and Anchor Behavior Through TDD

**Goal:** Express externally observable Story, Home, and Header behavior before changing production components.

- [ ] **T006** Update `frontend/src/App.test.tsx` first with failing behavior expectations for an `Explore My Story` section heading, `id="about"`, exactly one Home `Explore My Story` `<a href="#about">`, and exactly one SiteHeader `Story` `<a href="#about">`.

- [ ] **T007** Extend the failing App test to assert no Technologies, Projects, GitHub, or Contact navigation link; no button substitutes for either anchor; existing approved SPEC-005 Home copy remains present; and no client-side routing behavior is introduced.

- [ ] **T008** Extend the failing behavior coverage to assert all approved milestones and exact narrative lines are present in semantic DOM order, including the official qualification, UNICEN sentence, separate `With sound.` line, deliberate time jump, and exact final closing line. Do not assert CSS classes, wrappers, or implementation-only structure.

- [ ] **T009** Run the focused App test and confirm it fails because the current application has no `#about` section, Story anchors, or semantic timeline content; preserve the red evidence before production changes.

**Checkpoint:** Observable requirements for approved copy, anchor navigation, semantic chronology, and no unfinished navigation are expressed before implementation.

## Phase 3 — Minimal Semantic Story and Required Links

**Goal:** Implement the smallest feature composition that makes the red behavior tests pass.

- [ ] **T010** Create `frontend/src/components/story/StorySection.tsx` to render the semantic `<section id="about">`, visible `Explore My Story` heading, and all feature-local milestones in document order. Use native section/list/article/heading semantics before ARIA and preserve the existing logical Home `h1` relationship.

- [ ] **T011** Create `frontend/src/components/story/StoryMilestone.tsx` only if it holds the real responsibility of rendering one milestone's period, title, and all narrative lines. Otherwise retain this focused rendering in `StorySection`; do not create a generic reusable Timeline component.

- [ ] **T012** Update `frontend/src/App.tsx` to render `StorySection` after the existing `HomeHero` within the completed `SiteShell` using the plan-approved `wide` content mode. Preserve `SiteShell`, `SiteFooter`, backend independence, and all approved SPEC-005 Home strings.

- [ ] **T013** Update `frontend/src/components/home/HomeHero.tsx` and `frontend/src/components/shell/SiteHeader.tsx` only as necessary to add one native Home `<a href="#about">Explore My Story</a>` and one native Header `<a href="#about">Story</a>`. Do not add a second Home action, future navigation items, React Router, JavaScript scrolling, or route state.

- [ ] **T014** Re-run the focused App behavior tests from T006–T009 and confirm they are green. Verify the two anchors are keyboard-focusable native links, Header has exactly one `Story` link, and all text remains rendered without active-state enhancement.

**Checkpoint:** The static, semantic Story and its two real anchor entry points exist before visual or observer enhancement.

## Phase 4 — Semantic Chronology and No-JavaScript Resilience

**Goal:** Make complete chronological access an implementation invariant rather than a by-product of desktop styling.

- [ ] **T015** Add or refine focused Story behavior tests at `frontend/src/components/story/StorySection.test.tsx` to assert chronological `ol`/`li` (or equivalent native chronological) structure, all records in source order, complete narrative content regardless of supplied active id, and no removal of inactive milestone text from the DOM or accessibility tree.

- [ ] **T016** Implement only the smallest semantic markup or component adjustments needed for T015. Keep the companion visual supplementary; do not duplicate required narrative into an active-only panel or add ARIA that fabricates semantics.

- [ ] **T017** Re-run the focused Story semantic tests and confirm green. Inspect the rendered no-enhancement case to verify visitors and screen readers can obtain every approved line with JavaScript active-state behavior unavailable.

**Checkpoint:** The chronological document is complete and intelligible without JavaScript, animation, sticky positioning, or imagery.

## Phase 5 — Desktop Timeline Visual Foundation

**Goal:** Add the original Story-local visual structure using only existing SPEC-004 foundations.

- [ ] **T018** Create `frontend/src/components/story/StorySection.module.css` and apply it from Story components. Use existing semantic tokens, Space Grotesk/JetBrains Mono roles, green/amber accents, surfaces, borders, focus treatment, and CSS Modules; add no raw global palette, styling framework, or animation dependency.

- [ ] **T019** Implement the sequential baseline and wide-layout composition: a normal-flow chronological timeline on the left and an initially non-essential companion region on the right. Add restrained timeline line, nodes/circles, period/title hierarchy, narrative measure, and visual space without changing `SiteShell`.

- [ ] **T020** Implement non-color-only active-ready styling through marker geometry/border, typography emphasis, and companion correspondence in addition to accent color. Include a deliberate time-jump treatment and visually meaningful final 2026 treatment without turning the feature into a résumé timeline.

- [ ] **T021** Run the focused App/Story tests after styling and confirm they remain green. Inspect styles for only existing token reuse, no generic design-system primitive, and no hidden text or pointer-intercepting decoration.

**Checkpoint:** Story has an accessible sequential visual baseline and a wide desktop composition before sticky/observer enhancement.

## Phase 6 — Active Milestone Enhancement Through TDD

**Goal:** Add deterministic local active state as a browser enhancement, not a scroll-control mechanism.

- [ ] **T022** Document the feature-level activation contract in the focused Story test: initialize to the first milestone; observe records in a narrow viewport-centered band; select the intersecting record nearest the observer root center; break equal-distance ties by source order; and retain full DOM content regardless of active id.

- [ ] **T023** Add initially failing Story active-state tests at `frontend/src/components/story/StorySection.test.tsx` for default active presentation, deterministic active change from supplied observer entries, active visual correspondence, unchanged semantic text, and observer cleanup on unmount.

- [ ] **T024** Add the smallest deterministic jsdom-compatible `IntersectionObserver` test double in `frontend/src/test/setup.ts`, or a focused adjacent test helper if that avoids global test coupling. It must capture observed elements, expose controlled callback invocation, and record `disconnect`; it must not imitate browser internals beyond the tested contract.

- [ ] **T025** Run the focused active-state tests and confirm their expected red state before implementing observer setup or active state.

- [ ] **T026** Add feature-local active milestone state and an `IntersectionObserver` lifecycle to `frontend/src/components/story/StorySection.tsx`. Observe milestone elements only when enhancement applies, derive the active id by the documented deterministic rule, avoid updating identical state, and disconnect on cleanup. Do not add scroll listeners, continuous position calculations, global state, Redux, Zustand, or route state.

- [ ] **T027** Create `frontend/src/components/story/StoryVisual.tsx` only if a distinct companion visual responsibility remains after implementation. It may consume the active milestone for optional visual emphasis, but it must not become the only source of narrative text or hide inactive milestones.

- [ ] **T028** Re-run active-state, semantic, and App tests. Confirm green behavior for deterministic active changes and cleanup, while the unavailable-observer/no-enhancement case still contains the complete story.

**Checkpoint:** `IntersectionObserver` changes only local Story presentation; it neither controls visitor scrolling nor gates narrative access.

## Phase 7 — Sticky Desktop Scrollytelling Without Scroll Hijacking

**Goal:** Complete the desktop visual effect while preserving normal browser document scrolling.

- [ ] **T029** Add desktop-only CSS `position: sticky` to the companion Story visual region with a deliberate block-start inset, Grid/Flex layout, and no custom Story scroll container. Ensure the Story section is the intended containing region and avoid `overflow: hidden`, `auto`, or `scroll` on ancestor elements that would create an unintended sticky/scrolling ancestor.

- [ ] **T030** Verify the implementation contains no wheel-event listener/preventDefault behavior, scroll lock, synthetic progress, custom main-story scroll container, or scroll-to interception. Verify active progression occurs from ordinary document movement and the sticky region releases naturally at the story end.

- [ ] **T031** Perform focused rendered-browser desktop review at 1280px and 1536px: verify entry into `#about`, normal wheel/document scroll, progression through milestones, active visual response, readable chronology, natural release after the timeline, and no sticky overlap/clipping.

**Checkpoint:** Wide-screen storytelling is visually anchored by CSS while the page itself continues to scroll normally.

## Phase 8 — Mobile and Tablet Sequential Fallback

**Goal:** Prioritize natural touch document flow over desktop scrollytelling.

- [ ] **T032** Add responsive/coarse-pointer Story CSS so narrow and touch-oriented layouts render each milestone's period/title, narrative, optional visual treatment, and next milestone sequentially. Disable or neutralize the competing sticky two-column presentation where necessary; do not create a second mobile component tree.

- [ ] **T033** Perform rendered-browser review at 375px and 768px. Verify normal touch scrolling, complete sequential content, no scroll trap, no ordinary-content horizontal overflow, readable hierarchy, usable anchor navigation, and no dependence on desktop active-marker behavior.

**Checkpoint:** Mobile and tablet retain the whole story through native vertical document scrolling.

## Phase 9 — Reduced Motion and Accessibility Verification

**Goal:** Preserve the existing accessibility foundation while validating Story-specific behavior.

- [ ] **T034** Add reduced-motion rules in `frontend/src/components/story/StorySection.module.css` that minimize or remove Story-only opacity/transform/node transitions under `prefers-reduced-motion: reduce`; preserve meaning and active-state readability without transitions.

- [ ] **T035** Reuse and extend the existing axe-core coverage in `frontend/src/App.test.tsx` or focused Story test only for observable semantic regressions. Run it and resolve violations through the smallest native semantic change; do not weaken rules or use ARIA merely to satisfy a check.

- [ ] **T036** Perform rendered accessibility review: keyboard Home/Header anchors and existing visible focus; semantic chronology and screen-reader-oriented content inspection; intended contrast and non-color active indication; reduced-motion behavior; 200% zoom/text resizing; no clipping/overlap; touch usability; and no scroll trap. Record axe/jsdom limits for rendered contrast, motion, sticky behavior, and scroll accessibility.

**Checkpoint:** Story remains fully understandable and operable without motion, pointer precision, or the desktop enhancement.

## Phase 10 — Imagery and Fallback Decision During Execution

**Goal:** Keep assets optional and lawful without blocking the complete text-led experience.

- [ ] **T037** Check whether any image proposed for Story has explicit portfolio-owner placement approval and a resolved source, ownership/license, permitted-use, attribution, and local-asset decision. If none qualifies, record the abstract/CSS companion treatment as the implementation choice; do not create or fetch an external asset.

- [ ] **T038** If and only if approved local assets exist, add them under `frontend/src/assets/story/`, reference them through the focused Story data/visual boundary, and supply meaningful alt text or decorative treatment as appropriate. Do not hotlink, copy unapproved copyrighted historical material, fabricate asset provenance, or place the pixelated personal photo without explicit approval.

- [ ] **T039** Verify the visual experience remains intentional when every optional asset is absent and when only a subset is present. Confirm imagery is not required to understand chronology, public copy, time jump, or active state.

**Checkpoint:** Missing imagery cannot block, obscure, or weaken the Story narrative.

## Phase 11 — Exact-Copy and Historical-Fact Audit

**Goal:** Verify the final rendered content against the authoritative approved-copy source before owner review.

- [ ] **T040** Audit rendered Story data and DOM against **Approved visible labels and public copy** in `docs/specs/006-about-me/spec.md`. Verify the LOGO opening; 486 facts; IAC/BASIC/Fantavision wording; Visual Basic/Sound Blaster/CD-ROM wording; courses/humor; Slackware story; separate `With sound.`; LAN-party wording; exact Spanish qualification; UNICEN non-graduation wording; C/C++/Java/Oracle milestones; deliberate time jump; 2026 narrative; and exact final line. Record any mismatch as a failure; do not silently edit copy.

- [ ] **T041** Perform historical-boundary and editorial audit. Confirm Fantavision has no invented year, no CD-ROM speed or Slackware version/kernel/sound-card/configuration detail exists, no missing years/employment history are invented, Alpha Centauri appears only in its technical Slackware context, LAN parties remain hands-on PC/network culture, and no prohibited gaming history enters the feature.

**Checkpoint:** Approved public wording, uncertainty, humor, and technical-history boundaries are verified before owner review.

## Phase 12 — Local Quality Gates and Scope Checkpoint

**Goal:** Prove local readiness before requesting visual approval.

- [ ] **T042** Run from `frontend/` and pass `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run test:run`, `npm run validate:data`, and `npm run build`; then run `git diff --check` from the repository root. Resolve only SPEC-006-local failures and rerun affected checks.

- [ ] **T043** Complete dependency, static-output, scope-drift, and complete git-diff reviews. Confirm no new dependency; Vite base `/hmeclazcke-portfolio/`, GitHub Pages compatibility, backend independence, and canonical-data validation remain intact; no runtime external image/content dependency exists; SiteShell is unchanged; and no SPEC-007+ functionality, React Router, backend/API, authentication, persistence, localization, scroll hijacking, or animation framework was introduced.

- [ ] **T044** Start the local frontend development application for portfolio-owner review only after T040–T043 pass. Record and report the exact local URL without committing or pushing.

**Checkpoint:** Local implementation, audits, quality gates, and static-build behavior are ready for owner review.

## Phase 13 — PORTFOLIO OWNER VISUAL APPROVAL REQUIRED

**MANDATORY STOP:** After T044, Codex must stop and wait for explicit portfolio-owner feedback. Automated tests, builds, and local inspection do not substitute for this review.

- [ ] **T045 — PORTFOLIO OWNER VISUAL APPROVAL REQUIRED** Obtain explicit review of: Home `Explore My Story` and Header `Story` anchors; arrival at `#about`; public section title; personal-versus-résumé feel; timeline line/nodes/hierarchy; active milestone behavior; desktop sticky entry/progression/normal wheel scroll/natural exit; time jump; final 2026 treatment; `With sound.` treatment; imagery/fallback; 375px, 768px, 1280px, 1536px, and 200% zoom; mobile natural scroll; reduced motion; and keyboard focus/operation of both anchors. Leave every following task unchecked until explicit feedback is received.

## Phase 14 — Owner Feedback Refinement

- [ ] **T046** Record explicit portfolio-owner feedback. If no refinement is requested, document this phase as a no-op and mark T045 complete only when approval evidence covers the required review.

- [ ] **T047** If refinement is requested, modify only approved SPEC-006-local files from the planned Home, Header, Story, or approved-local-asset areas. Do not add historical content, imagery, dependencies, navigation, or later-spec capability without separately approved scope.

- [ ] **T048** After any refinement, rerun all affected tests, reduced-motion/accessibility/responsive review, exact-copy and historical audits, and applicable quality gates. Repeat owner review when a change materially affects appearance or interaction.

## Phase 15 — Documentation Convergence

- [ ] **T049** After successful validation and explicit owner approval, review `docs/architecture.md`, `docs/quality-gates.md`, and `docs/references.md`. Update only for a durable implemented decision such as native progressive-enhancement scrollytelling, CSS sticky plus IntersectionObserver, or desktop/mobile interaction distinction; do not document CSS values or milestone copy as architecture.

- [ ] **T050** Update `docs/roadmap.md` and `docs/current.md` only when lifecycle evidence supports the actual SPEC-006 state, preserving the Current Development Environment section and SPEC-005 completion record.

- [ ] **T051** Review `README.md` against the public-documentation policy and update only if the completed public Story feature materially affects external-reader information. Do not add internal planning, agent workflow, or SPEC-011 methodology content.

## Phase 16 — Final Convergence

- [ ] **T052** Verify every SPEC-006 functional requirement FR-001 through FR-037 and success criterion SC-001 through SC-019 against implementation and recorded evidence, including exact copy, anchors, semantic chronology, enhancement resilience, sticky behavior, mobile fallback, reduced motion, imagery fallback, static deployment compatibility, and owner approval.

- [ ] **T053** Run the final applicable quality-gate sequence after all approved refinements: `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run test:run`, `npm run validate:data`, `npm run build`, and `git diff --check`.

- [ ] **T054** Complete final historical, accessibility, responsive, scope, and git-diff reviews. Confirm SPEC-006 introduced no Technology Graph, Graph Exploration, Projects, GitHub integration, SDD methodology, Contact, cursor follower, React Router, backend/API, authentication, persistence, localization, scroll hijacking, or animation framework. Confirm documentation claims only verified facts and owner approval evidence.

- [ ] **T055** Mark SPEC-006 complete in lifecycle documentation only after T001–T054 have genuinely succeeded, all conditional refinement work is either completed or honestly recorded as a no-op, and no required evidence remains missing. Do not commit or push.

## Dependency Flow

```text
T001–T005  Story data contract (red → green)
      ↓
T006–T009  App/anchor/semantic behavior red
      ↓
T010–T014  Minimal Story and links green
      ↓
T015–T017  Semantic chronology resilience
      ↓
T018–T021  Visual baseline
      ↓
T022–T028  Observer active-state red → green
      ↓
T029–T033  Sticky desktop and mobile fallback
      ↓
T034–T041  Accessibility, imagery fallback, exact-copy/historical audit
      ↓
T042–T044  Local gates and local review URL
      ↓
T045         PORTFOLIO OWNER VISUAL APPROVAL REQUIRED (STOP)
      ↓
T046–T048  Owner feedback / conditional refinement
      ↓
T049–T051  Documentation convergence
      ↓
T052–T055  Final convergence and lifecycle completion
```

## Completion

SPEC-006 is complete only when every required task has successful evidence, its core narrative is exact, normal scrolling and progressive enhancement are verified, no prohibited scope has leaked, all applicable quality gates pass, selected imagery (if any) is properly approved and sourced, and the portfolio owner explicitly approves the rendered experience. The owner checkpoint is mandatory; no automated result can substitute for it.
