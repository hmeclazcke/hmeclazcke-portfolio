# Tasks: Site Shell and Visual Foundation

**ID:** SPEC-004  
**Phase:** Phase 1 — Static Portfolio  
**Spec:** `docs/specs/004-site-shell-visual-foundation/spec.md`  
**Plan:** `docs/specs/004-site-shell-visual-foundation/plan.md`  
**Status:** Approved

## Purpose

This task list decomposes SPEC-004 into dependency-ordered, independently verifiable implementation work. It establishes only a reusable visual foundation and semantic site shell; it does not implement portfolio feature content.

Tasks use this format:

```text
- [ ] Txxx [P?] [US?] Description with file path
```

`[P]` is reserved for work that can safely proceed independently without shared-file, package-state, or validation-order dependencies. No current task is marked `[P]` because package state, global styles, shell composition, tests, review, and documentation are ordered or shared concerns.

Tests are mandatory. A task may be marked complete only after its stated implementation and verification have actually succeeded.

---

# Phase 1 — Visual Foundation Dependencies and Structure

## Goal

Add only the approved local dependencies and establish the focused style structure needed by the shell while preserving the current static frontend, Vite configuration, canonical-data validation, and GitHub Pages deployment path.

- [ ] T001 Add only `@fontsource-variable/space-grotesk`, `@fontsource-variable/jetbrains-mono`, and `axe-core` to `frontend/package.json`, then update `frontend/package-lock.json` through npm. Do not add Tailwind, Sass, CSS-in-JS, styled-components, Carbon React, Primer React, component libraries, animation libraries, or unrelated dependencies.

- [ ] T002 Create the approved focused styling structure at `frontend/src/styles/tokens.css` and `frontend/src/styles/global.css`, without creating a generic design-system package, speculative component library, or a stylesheet for later portfolio features.

- [ ] T003 Review `frontend/vite.config.ts`, `frontend/tsconfig.app.json`, `frontend/package.json`, and `.github/workflows/deploy-pages.yml`; preserve the Vite project-site base path, static build, root canonical-data boundary, `npm run validate:data`, and existing Pages deployment behavior without configuration changes unless implementation makes a plan-approved change necessary.

**Checkpoint:** The project has only the approved dependencies and an appropriately small style foundation location; no framework, backend, routing, graph, or later feature has been introduced.

---

# Phase 2 — User Story 2: Semantic Shell Through TDD

**Story:** US2  
**Priority:** P1

## Goal

Replace the unstructured walking skeleton only with the approved semantic shell, preserving its temporary content and exposing no future navigation.

### Red

- [ ] T004 [US2] Update `frontend/src/App.test.tsx` first with observable React Testing Library expectations for a banner/header landmark, main landmark, contentinfo/footer landmark, primary identity `Hernán Meclazcke`, secondary handle `hmeclazcke`, the existing `Hello, world!` heading, the existing Lorem Ipsum paragraph, and no navigation links to unavailable sections.

- [ ] T005 [US2] Run `npm run test:run -- src/App.test.tsx` from `frontend/` and confirm the new shell behavior test fails because the current application lacks the required shell landmarks and public identity.

### Green

- [ ] T006 [US2] Create `frontend/src/components/shell/SiteShell.tsx`, `frontend/src/components/shell/SiteHeader.tsx`, and `frontend/src/components/shell/SiteFooter.tsx` with only the approved native semantic shell structure. Use `header`, `main`, and `footer` before ARIA; render `Hernán Meclazcke` as primary identity and `hmeclazcke` as secondary technical accent; render no navigation links, logo, company identity, feature placeholder, or contact content.

- [ ] T007 [US2] Update `frontend/src/App.tsx` to place the unchanged temporary `Hello, world!` heading and existing Lorem Ipsum paragraph in `SiteShell` main content. Preserve one logical page `h1`; do not turn the placeholder into Home content or render SPEC-003 canonical data.

- [ ] T008 [US2] Re-run `npm run test:run -- src/App.test.tsx` from `frontend/` and confirm every semantic-shell, identity, temporary-content, and no-fake-navigation expectation passes without CSS-class or implementation-detail assertions.

**Checkpoint:** The visible application has semantic header, main, and footer landmarks, approved identity treatment, unchanged placeholder content, and no misleading navigation.

---

# Phase 3 — Styling Architecture and Dark-First Tokens

## Goal

Implement the small native-CSS foundation that gives the semantic shell its reusable dark-first visual roles without scattered arbitrary values.

- [ ] T009 Create the compact raw and semantic token definitions in `frontend/src/styles/tokens.css`, using the exact approved plan values: `#07110e`, `#0d1916`, `#13231e`, `#27433a`, `#4e7767`, `#f2f7f4`, `#b5c7c0`, `#63f2a6`, `#f5b971`, `#d6ff70`, and `#1d4d3a`; define the approved semantic color, spacing, radius, content-width, typography, shadow, and glow roles without an excessive token system.

- [ ] T010 Create `frontend/src/styles/global.css` and import it through the frontend entry point. Implement the minimal reset/base behavior, document canvas, semantic text defaults, selection/highlight, `color-scheme: dark`, logical typography defaults, reusable spacing behavior, readable content-width support, and reduced-motion baseline using semantic tokens.

- [ ] T011 Create focused CSS Modules beside the shell components only where component-specific layout or decoration is required: `frontend/src/components/shell/SiteShell.module.css`, `frontend/src/components/shell/SiteHeader.module.css`, and `frontend/src/components/shell/SiteFooter.module.css`. Consume semantic tokens rather than duplicating raw values, and do not create a generic component library.

- [ ] T012 Apply the approved layered dark-surface hierarchy, subtle and strong border roles, restrained green primary accent, restrained amber/copper secondary accent, visible focus indicator, and restrained shadows/glow to the shell. Verify `--color-border-subtle` is decorative only and never the sole visual boundary for an important control, focus state, or status.

**Checkpoint:** Shared visual concepts are centralized in native CSS custom properties, global behavior remains document-level, and component CSS Modules contain only focused shell styling.

---

# Phase 4 — Typography and Local Font Loading

## Goal

Use the approved self-hosted variable fonts and a small responsive hierarchy without making technical typography harm content readability.

- [ ] T013 Import only the required normal weight-axis, language-subset resources from `@fontsource-variable/space-grotesk` and `@fontsource-variable/jetbrains-mono` through `frontend/src/styles/global.css` or its focused style entry. Confirm no Google Fonts or other runtime font CDN request is introduced.

- [ ] T014 Define and apply the approved typography roles in `frontend/src/styles/tokens.css` and the relevant shell CSS Modules: Space Grotesk for site identity, headings, body, and meta text; JetBrains Mono only for `hmeclazcke` and restrained technical accents; robust system fallbacks for both.

- [ ] T015 Apply the approved responsive identity and heading sizing with `clamp()` where it materially improves scaling, while preserving readable conventional body typography and avoiding excessive uppercase, tracking, glow, condensed treatment, or monospaced long-form text.

**Checkpoint:** The static artifact self-hosts only the approved font resources, body content remains readable, and technical typography is an accent rather than an all-page style.

---

# Phase 5 — Responsive Shell

## Goal

Make the shell intentionally usable from narrow mobile through wide desktop while retaining room for future full-width features without implementing them.

- [ ] T016 Implement responsive shell layout in the shell CSS Modules using Grid and/or Flexbox only where needed, centered readable content, fluid inline padding, and a non-rendered full-width layout capability for later feature regions. Do not implement a graph region or navigation solely for responsive testing.

- [ ] T017 Add only the two plan-approved layout breakpoints around 48rem and 80rem when actual shell layout behavior needs them; use fluid values for intermediate sizes and avoid a framework-like breakpoint system.

- [ ] T018 Perform and record preliminary responsive inspection at 375px, 768px, 1280px, and 1536px. Verify no ordinary-content horizontal scrolling, readable line lengths, usable spacing, sensible header/footer behavior, uncrowded narrow-screen atmosphere, and continued architectural possibility for future full-width regions.

**Checkpoint:** The shell adapts intentionally across the four representative viewport classes without creating navigation or future portfolio features.

---

# Phase 6 — User Stories 1 and 3: Accessibility Through TDD

**Stories:** US1, US3  
**Priority:** P1

## Goal

Make accessibility a tested shell foundation while recognizing that automated jsdom checks do not prove every rendered-browser concern.

### Red

- [ ] T019 [US3] Add a focused initially failing accessibility test for the fully rendered shell in `frontend/src/App.test.tsx` or a focused adjacent shell test. Use the installed `axe-core` integration with the existing Vitest and React Testing Library environment, and document the intended jsdom rule limitations in the test.

- [ ] T020 [US3] Run the focused accessibility test from `frontend/` and confirm it fails before the axe invocation or required semantic correction is implemented.

### Green

- [ ] T021 [US3] Integrate the smallest correct `axe-core` invocation for the rendered shell test, disabling only jsdom-unreliable rules such as `color-contrast` and documenting why manual rendered-browser contrast review remains mandatory. Correct violations with native semantic HTML before adding ARIA.

- [ ] T022 [US3] Complete shell accessibility styling in `frontend/src/styles/global.css` and shell CSS Modules: visible `:focus-visible` treatment, no color-only information, reduced-motion handling, no rapid flashing, practical text scaling/200% zoom behavior, and usable interaction target sizing where interactive controls actually exist.

- [ ] T023 [US3] Re-run the focused accessibility test and confirm it passes. Record that axe/jsdom supplements—but does not establish—real rendered color contrast, keyboard, zoom, reduced-motion, or visual-atmosphere conformance.

**Checkpoint:** Semantic landmarks, logical heading hierarchy, focus, motion, scaling, and automated accessibility behavior are covered without unnecessary ARIA or an additional end-to-end framework.

---

# Phase 7 — Atmospheric Treatment

## Goal

Add the approved original atmosphere through restrained CSS-only decoration that supports, rather than competes with, readability.

- [ ] T024 Apply only approved CSS-only atmospheric details in the relevant shell CSS Modules: restrained gradients, low-opacity technical/grid lines, limited luminous accents, subtle geometric framing, and non-interactive pseudo-elements. Do not add downloaded/generated imagery, movie material, Matrix code rain, CRT overlays across content, glitches, particles, large continuous animation, or an animation library.

- [ ] T025 Verify at the representative viewport widths that decorative layers remain behind content, use no pointer interception, do not interfere with keyboard focus, do not reduce placeholder readability, and do not create horizontal overflow.

**Checkpoint:** The shell has an original and restrained technical atmosphere rather than a retro-web recreation, hacker parody, or copied movie interface.

---

# Phase 8 — Local Automated Quality Gates and Scope Checkpoint

## Goal

Validate the completed local shell implementation before asking the portfolio owner to review its appearance.

- [ ] T026 Run the complete applicable frontend quality-gate sequence from `frontend/`: `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run test:run`, `npm run validate:data`, and `npm run build`; record actual results and fix only SPEC-004-scope failures.

- [ ] T027 Inspect the generated `frontend/dist/` artifact and configuration to confirm the existing Vite project-site path, static build, GitHub Pages compatibility, bundled local font resources, and backend independence are preserved; confirm canonical data is not visually rendered.

- [ ] T028 Perform a pre-approval scope-drift and git-diff review. Confirm no final Home, About Me, personal photo, Technology Graph, graph library, portfolio-data presentation, Projects, GitHub integration, Contact, routing, backend, API, OpenAPI, MCP, authentication, persistence, analytics, light-theme toggle, or SPEC-005+ functionality was introduced.

**Checkpoint:** Automated validation, static-build inspection, canonical-data non-presentation review, and scope/diff review have succeeded locally.

---

# Phase 9 — PORTFOLIO OWNER VISUAL APPROVAL REQUIRED

## Goal

Obtain explicit portfolio-owner approval of the actual rendered visual foundation; automated tests cannot substitute for this approval.

- [ ] T029 Start the local Vite development application from `frontend/` when needed for owner review, report the local URL, and make the shell available for direct inspection without changing application scope.

## MANDATORY STOP — PORTFOLIO OWNER VISUAL APPROVAL REQUIRED

After T029, Codex MUST stop and wait for explicit portfolio-owner feedback. SPEC-004 remains `in-progress`.

The portfolio owner must review at minimum:

- overall dark-first impression;
- professional/cyberpunk balance and contemporary rather than retro-web character;
- restraint of green and amber accents;
- primary identity and secondary-handle treatment;
- header/main/footer hierarchy;
- typography, readability, and visual spacing;
- mobile/narrow and desktop/wide behavior; and
- any excessive, cliché, distracting, or visually poor effect.

Tasks T030 through T044 MUST remain unchecked until the owner provides explicit feedback. Codex must not interpret automated test success as visual approval.

---

# Phase 10 — Visual Feedback Refinement

## Goal

Apply only approved visual feedback while maintaining the SPEC-004 boundary.

- [ ] T030 After explicit portfolio-owner feedback, record whether the shell is approved or identify the requested SPEC-004 visual refinements. Do not treat feedback as authorization for SPEC-005+ content.

- [ ] T031 If refinements are requested, update only the relevant SPEC-004 shell, token, typography, or CSS Module files; preserve the approved architecture, temporary content, no-navigation decision, canonical-data non-presentation, and scope boundaries.

- [ ] T032 Re-run tests and every relevant local quality gate after any refinement. If a refinement materially affects appearance, restart the local review and obtain explicit renewed portfolio-owner approval before proceeding.

- [ ] T033 Confirm explicit portfolio-owner visual approval after the final reviewed appearance; retain the evidence in the implementation report without adding temporary approval notes to public documentation.

**Checkpoint:** The owner has explicitly approved the actual visual foundation, and any requested changes are green and remain within SPEC-004 scope.

---

# Phase 11 — Documentation Convergence

## Goal

Update authoritative documents only after successful validation and portfolio-owner visual approval establish the implemented state.

- [ ] T034 Update `docs/architecture.md` with the actual shell, native-CSS, semantic-token, and static font-loading boundary at an architectural level; do not turn it into a catalog of individual CSS values.

- [ ] T035 Update `docs/quality-gates.md` only if the implemented accessibility tooling establishes a repeatable quality-gate responsibility.

- [ ] T036 Update `docs/references.md` only for materially influential Fontsource, axe-core, MDN, Primer, or Carbon sources actually used by the implementation.

- [ ] T037 Update the SPEC-004 entry in `docs/roadmap.md` and `docs/current.md` with the actual lifecycle state and immediate next step, preserving the Current Development Environment section.

- [ ] T038 Review `README.md` against the public-documentation policy; update it only if the completed visual foundation materially changes useful external developer information, otherwise record that no README update is required.

**Checkpoint:** Authoritative and public documentation reflect verified implementation and visual-approval facts rather than intentions.

---

# Phase 12 — Final Convergence

## Goal

Prove the approved visual foundation is complete, accessible, responsive, visually approved, and free from later-feature scope drift.

- [ ] T039 Review the implementation against every functional requirement FR-001 through FR-020 in `docs/specs/004-site-shell-visual-foundation/spec.md`; record evidence for each requirement.

- [ ] T040 Review the implementation against every success criterion SC-001 through SC-008 in `docs/specs/004-site-shell-visual-foundation/spec.md`; record evidence for each criterion.

- [ ] T041 Perform the final manual accessibility and responsive review at 375px, 768px, 1280px, and 1536px, including rendered contrast, visible focus, keyboard operation for implemented controls, 200% zoom/text resizing, and reduced-motion behavior.

- [ ] T042 Confirm the portfolio-owner visual approval from T033 remains applicable to the final implementation, or repeat the required review if a subsequent material visual change occurred.

- [ ] T043 Perform final scope-drift and git-diff review. Explicitly confirm SPEC-004 introduced no final Home content, About Me, personal photo, Technology Graph, graph library, portfolio-data presentation, Projects, GitHub integration, Contact, routing, backend, API, authentication, persistence, light-theme toggle, or SPEC-005+ functionality.

- [ ] T044 Confirm all implementation, shell behavior, accessibility test, local-gate, static-build, visual-review, portfolio-owner approval, documentation, requirement, success-criterion, responsive, scope, and diff-review evidence has succeeded. Leave SPEC-004 `in-progress` and report the exact missing evidence if any required task remains incomplete.

**Checkpoint:** SPEC-004 may be marked complete only when all required tasks, including explicit portfolio-owner visual approval, have succeeded.

---

## Dependencies

```text
Visual Foundation Dependencies and Structure
        ↓
Semantic Shell Through TDD
        ↓
Styling Architecture and Typography
        ↓
Responsive Shell and Accessibility Through TDD
        ↓
Atmospheric Treatment
        ↓
Local Automated Quality Gates and Scope Checkpoint
        ↓
PORTFOLIO OWNER VISUAL APPROVAL REQUIRED
        ↓
Visual Feedback Refinement
        ↓
Documentation Convergence
        ↓
Final Convergence
        ↓
SPEC-004 completion
```

## User Story Dependencies

- US2 establishes the semantic shell before visual, responsive, and accessibility concerns are applied.
- US1 depends on the shell and visual foundation, then requires manual visual review.
- US3 depends on the semantic shell and visual foundation, then requires automated and manual accessibility evidence.
- Documentation convergence depends on successful local validation and explicit portfolio-owner visual approval.
- Final convergence depends on all preceding implementation, validation, feedback, documentation, and approval work.

## Completion

All required tasks must either complete successfully or remain explicitly incomplete with their evidence and impact. Passing automated tests or a local build alone does not complete SPEC-004; completion also requires manual responsive/accessibility validation and explicit portfolio-owner visual approval.
