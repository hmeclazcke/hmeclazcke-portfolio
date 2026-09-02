# Tasks: Project Foundation

**ID:** SPEC-001  
**Phase:** Phase 1 — Static Portfolio  
**Spec:** `docs/specs/001-project-foundation/spec.md`  
**Plan:** `docs/specs/001-project-foundation/plan.md`  
**Status:** Approved

## Purpose

This task list decomposes SPEC-001 into dependency-ordered, independently verifiable implementation work.

Tasks follow this format:

```text
- [ ] Txxx [P?] [US?] Description with file path
```

Where:

- `[P]` means the task may be executed in parallel with other eligible tasks because it does not depend on incomplete work in the same files.
- `[US1]`, `[US2]`, and `[US3]` map directly to the user stories defined in `spec.md`.
- Setup, foundational, documentation, and final-validation tasks do not require a user-story label.

Tests are mandatory for this specification because the repository governance and SPEC-001 explicitly require TDD.

---

# Phase 1 — Project Setup

## Goal

Create the minimum React + TypeScript + Vite project structure and deterministic dependency baseline required by the implementation plan.

- [ ] T001 Scaffold the React + TypeScript frontend using the current official Vite `react-ts` template under `frontend/`, without creating deployment configuration or backend code.

- [ ] T002 Install the frontend dependencies using npm and generate the committed dependency lock file at `frontend/package-lock.json`.

- [ ] T003 Declare the Node.js 24 LTS development baseline in `frontend/package.json` without introducing an additional package manager or runtime-management dependency.

- [ ] T004 Install the SPEC-001 development dependencies required for Vitest, React Testing Library, jsdom, and Prettier in `frontend/package.json`, using project-local dependencies and recording their exact resolved versions in `frontend/package-lock.json`.

- [ ] T005 Remove Vite-generated demo assets, demo styling, and sample content that are not required by SPEC-001 from `frontend/src/` while preserving only the minimum structure required to establish the application through TDD.

---

# Phase 2 — Foundational Tooling

## Goal

Establish the shared validation and agent tooling required before the SPEC-001 user stories can be completed.

No user-story implementation should be considered complete until these foundational tasks are finished.

- [ ] T006 Configure Vitest with the jsdom test environment and shared test setup using `frontend/vite.config.ts` and `frontend/src/test/setup.ts`.

- [ ] T007 Configure deterministic formatting with Prettier using `frontend/.prettierrc` and `frontend/.prettierignore`.

- [ ] T008 Review and normalize the Vite-generated ESLint configuration in `frontend/eslint.config.*` so linting covers the frontend TypeScript and React source without taking responsibility for formatting.

- [ ] T009 Configure the required npm command interface in `frontend/package.json`: `dev`, `format`, `format:check`, `lint`, `typecheck`, `test`, `test:run`, `build`, and `preview`.

- [ ] T010 Create `frontend/AGENTS.md` containing only frontend-specific agent instructions derived from the approved SPEC-001 tooling, root `AGENTS.md`, and relevant guidance recorded in `docs/references.md`; do not duplicate repository-wide rules unnecessarily.

**Checkpoint:** Frontend tooling foundation exists and user-story implementation may begin.

---

# Phase 3 — User Story 1: Start Frontend Development

**Story:** US1  
**Priority:** P1

## Goal

A developer working from a fresh checkout can prepare and start the frontend locally using documented and repeatable project commands.

## Independent Test

The frontend can be installed and started locally without undocumented manual configuration and without a project backend.

### TDD Cycle

- [ ] T011 [US1] Create a failing React Testing Library test in `frontend/src/App.test.tsx` that verifies the minimal application exposes an observable application root using an accessible `main` landmark, without introducing real portfolio content or SPEC-002 `Hello, world!` content.

- [ ] T012 [US1] Execute the SPEC-001 test command and confirm that `frontend/src/App.test.tsx` fails for the expected missing application-root behavior before implementing that behavior.

- [ ] T013 [US1] Implement the minimum React application structure in `frontend/src/App.tsx` required to satisfy the failing application-root test, without adding portfolio content, final styling, navigation, or later-spec functionality.

- [ ] T014 [US1] Ensure `frontend/src/main.tsx` mounts the minimal application correctly without adding business or portfolio behavior.

- [ ] T015 [US1] Re-run the relevant frontend test and confirm that the TDD test now passes.

### Fresh Setup and Local Execution

- [ ] T016 [US1] Verify that the dependency installation procedure represented by `frontend/package.json` and `frontend/package-lock.json` succeeds by following the documented fresh-checkout frontend installation procedure from the frontend directory.

- [ ] T017 [US1] Start the frontend using `npm run dev`, verify that the Vite development application becomes browser-accessible, and terminate the development process after verification.

**Checkpoint:** US1 is independently usable and testable.

---

# Phase 4 — User Story 2: Validate Frontend Changes

**Story:** US2  
**Priority:** P1

## Goal

Developers and AI agents have deterministic commands for validating frontend changes.

## Independent Test

Every validation command established by SPEC-001 executes successfully against valid source and reports failure when its applicable rule is intentionally violated.

- [ ] T018 [US2] Run `npm run format` against the SPEC-001 frontend files and ensure formatting is deterministic.

- [ ] T019 [US2] Run `npm run format:check` and confirm that correctly formatted source passes without modifying files.

- [ ] T020 [US2] Run `npm run lint` and confirm that the valid frontend source passes ESLint validation.

- [ ] T021 [US2] Run `npm run typecheck` and confirm that the valid frontend source passes TypeScript static validation without generating a production artifact.

- [ ] T022 [US2] Run `npm run test:run` and confirm that the complete frontend test suite executes once, terminates, and reports success.

- [ ] T023 [US2] Verify failure semantics for linting and/or static type checking using a temporary intentionally invalid source file under `frontend/src/`; confirm that the applicable command fails, then remove the temporary validation file without retaining it as project source.

- [ ] T024 [US2] Verify failure semantics for automated tests by temporarily introducing a controlled failing expectation in the relevant test context, confirm that `npm run test:run` reports failure, then restore the approved passing test without retaining the intentional failure.

**Checkpoint:** US2 provides repeatable positive and negative validation evidence.

---

# Phase 5 — User Story 3: Produce a Static Build

**Story:** US3  
**Priority:** P1

## Goal

The frontend can produce and locally serve a production-ready static artifact without requiring the future project backend.

## Independent Test

A production static artifact is generated successfully and can be previewed locally while no project backend exists or is running.

- [ ] T025 [US3] Run `npm run build` and verify that Vite generates the expected static production artifact under `frontend/dist/`.

- [ ] T026 [US3] Inspect the generated `frontend/dist/` artifact to confirm that it contains only static frontend output and does not depend on a project backend to be produced.

- [ ] T027 [US3] Run `npm run preview`, verify that the generated production artifact is locally browser-accessible, and terminate the preview process after verification.

- [ ] T028 [US3] Confirm that both production build and preview validation succeed with no project backend present or running.

**Checkpoint:** US3 proves that the frontend foundation satisfies the Phase 1 static-build architecture.

---

# Phase 6 — Documentation and Governance Alignment

## Goal

Make the authoritative repository documentation reflect the technology and command decisions finalized by SPEC-001.

- [ ] T029 Update `docs/architecture.md` to record the finalized SPEC-001 frontend foundation decisions at the appropriate architectural level: React SPA, TypeScript, Vite, npm, and Node.js 24 LTS.

- [ ] T030 Update `docs/quality-gates.md` with the concrete frontend commands established by SPEC-001 and document when each gate applies.

- [ ] T031 Review `docs/references.md` and update it only if implementation introduced a materially influential authoritative source that is not already recorded.

- [ ] T032 Create or update the root `README.md` with the minimum fresh-checkout frontend development workflow established by SPEC-001: prerequisites including the Node.js baseline; installing frontend dependencies with npm; starting the frontend locally; the directory from which frontend commands are executed; confirmation that no project backend is required for local Phase 1 frontend development; and the main validation commands established by SPEC-001. Keep the README concise and appropriate for external developers while keeping `docs/` authoritative according to `AGENTS.md`.

- [ ] T033 Update the SPEC-001 entry in `docs/roadmap.md` to reflect the actual implementation state only after implementation and validation status justify the change.

- [ ] T034 Update `docs/current.md` with the actual SPEC-001 workflow state and immediate next step, preserving the current development-environment context separately from permanent architecture.

---

# Phase 7 — Final Quality Gates and Convergence

## Goal

Prove that the implemented foundation satisfies the approved specification, implementation plan, architecture, and quality rules without leaking work from later specifications.

- [ ] T035 Run the complete applicable frontend quality-gate sequence from `frontend/`: `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run test:run`, and `npm run build`.

- [ ] T036 Verify that all required quality gates completed successfully and explicitly report any skipped or unavailable gate according to `docs/quality-gates.md`.

- [ ] T037 Review the resulting implementation against every functional requirement `FR-001` through `FR-017` in `docs/specs/001-project-foundation/spec.md`.

- [ ] T038 Review the resulting implementation against success criteria `SC-001` through `SC-007` in `docs/specs/001-project-foundation/spec.md`.

- [ ] T039 Perform a scope-drift review and confirm that SPEC-001 has not implemented GitHub Actions deployment, GitHub Pages configuration, `Hello, world!`, Lorem Ipsum, final visual design, portfolio data, technology graph functionality, GitHub API integration, backend code, OpenAPI, MCP, authentication, or persistence.

- [ ] T040 Review the final repository diff for unrelated or accidental changes and report any issue before declaring SPEC-001 complete.

---

# Dependencies

## Phase Dependencies

```text
Phase 1 — Project Setup
        ↓
Phase 2 — Foundational Tooling
        ↓
        ├──────────────┐
        ↓              ↓
US1 — Development   tooling available
        ↓
US2 — Validation
        ↓
US3 — Static Build
        ↓
Documentation Alignment
        ↓
Final Quality Gates
        ↓
SPEC-001 completion
```

## User Story Dependencies

- US1 depends on the project setup and foundational tooling.
- US2 depends on the validation tooling established during the foundation and on valid minimal source from US1.
- US3 depends on the working frontend established by US1 and validated by US2.
- Documentation alignment depends on technical decisions being actually implemented rather than merely planned.
- Final convergence depends on all required user stories and documentation updates being complete.

---

# Parallel Execution Guidance

Parallel work is intentionally limited in SPEC-001 because many setup tasks modify shared files such as `frontend/package.json`, `frontend/vite.config.ts`, and project documentation.

Do not mark work as parallel merely because it appears conceptually independent.

Potential parallel work should only be performed when:

- tasks modify different files;
- neither task depends on an unfinished decision from the other;
- package-management state is not being modified concurrently;
- authoritative documentation is not being edited concurrently.

Correctness and reproducibility take priority over maximizing parallelism.

---

# Implementation Strategy

## First Objective — Working Local Foundation

Complete:

```text
Project Setup
    ↓
Foundational Tooling
    ↓
US1
```

At this point the frontend should run locally and have a functioning TDD environment.

## Second Objective — Repeatable Validation

Complete US2 and prove that the quality commands correctly distinguish valid from invalid changes.

## Third Objective — Static Production Artifact

Complete US3 and prove that the application builds and previews independently from any backend.

## Final Objective — Converge

Update authoritative documentation, execute all gates, and validate the implementation against the approved specification.

Do not begin SPEC-002 until SPEC-001 is formally completed.

---

# Completion

All tasks must either:

- be completed successfully; or
- be explicitly identified as blocked or not applicable with a documented reason.

Unchecked required tasks prevent SPEC-001 from being marked `done`.
