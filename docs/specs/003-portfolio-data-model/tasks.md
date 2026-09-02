# Tasks: Portfolio Data Model

**ID:** SPEC-003  
**Phase:** Phase 1 — Static Portfolio  
**Spec:** `docs/specs/003-portfolio-data-model/spec.md`  
**Plan:** `docs/specs/003-portfolio-data-model/plan.md`  
**Status:** Approved

## Purpose

This task list decomposes SPEC-003 into dependency-ordered, independently verifiable implementation work. It establishes canonical portfolio data and its validation boundary only; it does not render portfolio UI or a graph.

Tasks use this format:

```text
- [ ] Txxx [P?] [US?] Description with file path
```

`[P]` is used only where work is safe to perform concurrently without shared files, package state, or incomplete prerequisite decisions. `[US1]`, `[US2]`, and `[US3]` refer to the user stories in the specification. Foundation, validation, documentation, and convergence tasks do not require a user-story label.

Tests are mandatory. A task may be marked complete only after its stated implementation and verification have actually succeeded.

---

# Phase 1 — Canonical Data Contracts and Representative Dataset

## Goal

Create the three repository-owned canonical collections while preserving the approved separation among Technologies, Contexts, and Technology–Context Relationships.

- [x] T001 Create `data/technologies.json`, `data/contexts.json`, and `data/relationships.json` as separate canonical collections containing only the portfolio-owner-confirmed representative records in `spec.md`; do not embed those records in React components or create one file per Technology.

- [x] T002 Verify the initial files contain exactly the approved entity kinds and no graph coordinates, layout settings, colors, CSS classes, date fields, degrees, roles, repositories, employment-history detail, or other presentation/CV fields. Preserve the separately documented approximate IAC timing without inventing a more precise date.

**Checkpoint:** The repository has only the planned canonical-data structure and approved representative facts, separated from UI concerns.

---

# Phase 2 — User Story 3: Structural Validation Through TDD

**Story:** US3  
**Priority:** P1

## Goal

Establish deterministic JSON Schema Draft 2020-12 structural validation using Ajv v8 before cross-file integrity rules are introduced.

### Red

- [x] T003 [US3] Add failing structural-validation tests in `frontend/scripts/portfolio-data-validation.test.mjs` for malformed Technology, Context, and Relationship records, including valid Relationships with only `learned`, only `used`, and both meanings.

- [x] T004 [US3] Extend the failing structural-validation tests with unsupported Technology category, Technology relevance, Context type, and Relationship meaning values, plus an empty meanings collection and duplicate meanings in one Relationship.

- [x] T005 [US3] Run the focused validation test file from `frontend/` and confirm it fails for the expected missing structural-validation behavior before adding Ajv, schemas, or validation implementation.

### Green

- [x] T006 [US3] Add the minimal Ajv v8 dependency to `frontend/package.json` and update `frontend/package-lock.json` through npm so JSON Schema Draft 2020-12 validation is available in the existing Node/npm toolchain.

- [x] T007 [US3] Create `data/schema/technologies.schema.json`, `data/schema/contexts.schema.json`, and `data/schema/relationships.schema.json`, then implement the minimum reusable structural-validation module at `frontend/scripts/portfolio-data-validation.mjs`. Require stable non-empty identities, human-readable names, approved controlled vocabularies, no undeclared presentation metadata, and a non-empty unique `meanings` collection with only `learned` and `used`.

- [x] T008 [US3] Re-run `frontend/scripts/portfolio-data-validation.test.mjs` through the focused Vitest command and confirm every Phase 2 test passes without weakening schemas or expectations.

**Checkpoint:** Invalid record shapes and unsupported controlled values are deterministically rejected before semantic validation is considered.

---

# Phase 3 — User Story 3: Cross-File Semantic Integrity Through TDD

**Story:** US3  
**Priority:** P1

## Goal

Add deterministic whole-dataset integrity validation while keeping it separate from per-collection schema validation.

### Red

- [x] T009 [US3] Extend `frontend/scripts/portfolio-data-validation.test.mjs` with failing cases for duplicate Technology IDs, duplicate Context IDs, a dangling `technologyId`, a dangling `contextId`, duplicate Technology–Context associations with the same endpoint pair regardless of meanings, and a non-canonical order when both meanings are present.

- [x] T010 [US3] Run the focused validation tests and confirm each new case fails because the corresponding cross-file semantic rule is not yet implemented.

### Green

- [x] T011 [US3] Extend `frontend/scripts/portfolio-data-validation.mjs` with the minimum semantic checks for unique Technology IDs, unique Context IDs, valid Relationship endpoints, one canonical Relationship per `technologyId`/`contextId` pair, and canonical `learned` then `used` ordering when both meanings apply; preserve deterministic, record-specific error messages.

- [x] T012 [US3] Re-run the focused validation tests and confirm structural and semantic test cases pass, with every invalid fixture rejected for its intended rule.

**Checkpoint:** Canonical data cannot contain duplicate identities, dangling endpoints, or ambiguous duplicate associations.

---

# Phase 4 — Repeatable Data-Validation Command

## Goal

Expose the approved local/CI command without creating separate tooling or a second validation workflow.

- [x] T013 Create `frontend/scripts/validate-portfolio-data.mjs` as the small command entry point for the reusable validation module; it must validate all three canonical files and exit non-zero with useful errors when validation fails.

- [x] T014 Add `validate:data` to `frontend/package.json`, invoking `frontend/scripts/validate-portfolio-data.mjs` without adding a package manager, runtime, backend, or unrelated command layer.

- [x] T015 Run `npm run validate:data` from `frontend/` and confirm the approved representative dataset succeeds.

- [x] T016 Verify command failure semantics using an isolated invalid test fixture through `frontend/scripts/portfolio-data-validation.test.mjs` or an equivalent non-persistent test invocation; confirm the validation entry point reports non-zero failure without retaining invalid canonical data.

**Checkpoint:** `npm run validate:data` is a repeatable, focused quality gate with verified positive and negative behavior.

---

# Phase 5 — User Story 1: Static Frontend Canonical-Data Access

**Story:** US1  
**Priority:** P1

## Goal

Make canonical root data available to future React consumers at build time without rendering portfolio UI or duplicating portfolio records.

### Red

- [x] T017 [US1] Add a focused failing data-access test at `frontend/src/data/portfolio-data.test.ts` that imports the planned frontend data boundary and verifies it exposes the canonical Technology, Context, and Relationship collections without HTTP fetching.

- [x] T018 [US1] Run the focused data-access test from `frontend/` and confirm it fails because the data-access boundary and/or root-data resolution is not yet configured.

### Green

- [x] T019 [US1] Update `frontend/tsconfig.app.json` with the minimum `resolveJsonModule` and path configuration necessary to resolve repository-root `data/` imports from frontend source.

- [x] T020 [US1] Update `frontend/vite.config.ts` with the matching root-data alias and only the necessary Vite development-server filesystem allowance for the repository-root `data/` directory; preserve the existing GitHub Pages base path and do not add routing.

- [x] T021 [US1] Create `frontend/src/data/portfolio-data.ts` as the single frontend data-access boundary that statically imports and exposes the three root canonical collections. Do not add React components, runtime HTTP fetches, data copying, graph behavior, or backend access.

- [x] T022 [US1] Re-run the focused data-access test and confirm it passes; inspect `frontend/src/data/portfolio-data.ts` and React source to confirm the data is imported at compile/bundle time and the technology inventory is not duplicated in components.

**Checkpoint:** Future frontend features can consume the project-owned data through one static boundary while the visible application remains unchanged.

---

# Phase 6 — User Stories 1, 2, and 3: Initial Dataset Validation

**Stories:** US1, US2, US3  
**Priority:** P1

## Goal

Prove that the actual initial dataset represents only confirmed facts and demonstrates the required many-to-many model.

- [x] T023 [US1] Verify `data/technologies.json` includes Java and React with `current`, BASIC and Visual Basic with `historical`, and C, Oracle, and Smalltalk with no unconfirmed `relevance` value.

- [x] T024 [US2] Verify `data/contexts.json` includes Unitech and TeraCode as `professional`, UNICEN and IAC as `learning`, hmeclazcke-portfolio and Reactive RAG Document Processor as `portfolio`, and Personal Projects as the generic `personal-project` context. Verify IAC’s canonical record contains only the approved Context contract fields (`id`, `name`, and `type`) and does not encode its private-institute provenance or approximate-1990s timing; verify UNICEN contains no degree implication; and verify Personal Projects contains no invented project detail.

- [x] T025 [US2] Verify `data/relationships.json` contains only the twelve confirmed associations and meanings from `spec.md`: the five professional/portfolio associations and C → Personal Projects and BASIC → Personal Projects with only `used`; and C → UNICEN, Java → UNICEN, Oracle → UNICEN, Smalltalk → UNICEN, and BASIC → IAC with only `learned`. Confirm no additional `learned` meaning is inferred for Personal Projects, portfolio, or other associations.

- [x] T026 [US2] Verify representative many-to-many capability through the canonical relationships: at least one Technology connects to multiple Contexts and at least one Context connects to multiple Technologies, with valid references and no duplicate equivalent Relationships.

- [x] T027 [US3] Run `npm run validate:data` from `frontend/` against the actual canonical files and confirm structural validity, unique canonical IDs, valid endpoints, controlled non-empty meanings, deterministic meaning order, and no duplicate Technology–Context associations.

**Checkpoint:** The actual dataset is valid, representative, extendable, and limited to confirmed portfolio facts.

---

# Phase 7 — Existing GitHub Pages Build Integration

## Goal

Run canonical-data validation in the existing Pages build/validation job before production build and deployment.

- [x] T028 Update `.github/workflows/deploy-pages.yml` only as necessary to run `npm run validate:data` in the existing `build` job after type checking and before tests/build; do not create another workflow or alter deployment permissions, triggers, artifact scope, or deployment behavior.

- [x] T029 Review `.github/workflows/deploy-pages.yml` and verify a data-validation failure stops the existing build job before `npm run build`, thereby preventing the dependent deployment job from running.

**Checkpoint:** The existing GitHub Pages path cannot deploy canonical data that fails validation.

---

# Phase 8 — Local Quality Gates and Scope Checkpoint

## Goal

Validate the implemented local data boundary before documentation reflects the completed work.

- [x] T030 Run the complete applicable frontend quality-gate sequence from `frontend/`: `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run validate:data`, `npm run test:run`, and `npm run build`; record actual results.

- [x] T031 Inspect the generated `frontend/dist/` artifact and confirm the static build remains compatible with `/hmeclazcke-portfolio/`, bundles canonical data without runtime HTTP fetches, and has no project-backend dependency.

- [x] T032 Perform a SPEC-003 scope-drift review confirming that no graph rendering/library/coordinates/layout, site shell, visual design, Matrix / Blade Runner styling, About Me, GitHub API integration, backend, OpenAPI, MCP, authentication, persistence, or SPEC-004+ functionality was added.

- [x] T033 Review the current git diff for unrelated or accidental changes and report any issue before documentation convergence.

**Checkpoint:** Local quality gates pass and the implementation remains inside the approved data-model scope.

---

# Phase 9 — Documentation Convergence

## Goal

Update authoritative documentation only after the data model, validation command, frontend boundary, CI configuration, and local quality gates are genuinely validated.

- [x] T034 Update `docs/architecture.md` with the implemented canonical root-data boundary, schema/validation boundary, and static frontend consumption design, without adding graph or backend architecture.

- [x] T035 Update `docs/quality-gates.md` with `npm run validate:data` and its required local/CI placement in the existing Pages build workflow.

- [x] T036 Review `docs/references.md` and add the official JSON Schema Draft 2020-12 and/or Ajv reference only if the implementation makes either materially influential beyond the references already recorded.

- [x] T037 Update the SPEC-003 status in `docs/roadmap.md` only when all required implementation and validation evidence supports its actual lifecycle state.

- [x] T038 Update `docs/current.md` with the actual SPEC-003 workflow state and immediate next step, preserving the Current Development Environment section.

- [x] T039 Review the root `README.md` against `AGENTS.md` public-documentation policy; update it only if the completed canonical-data workflow materially changes external developer information, otherwise record that no README change is required.

**Checkpoint:** Authoritative project documentation reflects verified implementation facts, not intentions.

---

# Phase 10 — Final Requirements and Convergence

## Goal

Prove that SPEC-003 is complete, extendable through canonical data alone, and free of later-spec scope.

- [x] T040 Review the implementation against every functional requirement FR-001 through FR-018 and every data-integrity requirement DIR-001 through DIR-007 in `docs/specs/003-portfolio-data-model/spec.md`; record evidence for each requirement.

- [x] T041 Review the implementation against every success criterion SC-001 through SC-008 in `docs/specs/003-portfolio-data-model/spec.md`; record evidence for each criterion.

- [x] T042 Verify extensibility with a focused valid test fixture or equivalent non-persistent validation case: adding one valid Technology, Context, and Relationship requires canonical-data changes only, passes validation, and requires no React component change or graph-library dependency.

- [x] T043 Perform the final scope review, explicitly confirming SPEC-003 introduced no graph rendering, graph visualization library, graph coordinates/layout, site shell, final visual design, Matrix / Blade Runner styling, About Me, GitHub API, backend, OpenAPI, MCP, authentication, persistence, or SPEC-004+ functionality.

- [x] T044 Review the final repository diff for accidental, unrelated, or undocumented changes; resolve or report every issue before declaring SPEC-003 complete.

- [x] T045 Confirm all applicable implementation, test, validation-command, CI-configuration, documentation, requirement, success-criterion, scope, and diff-review evidence has succeeded; leave SPEC-003 incomplete and report the exact missing evidence if any required task remains unchecked.

**Checkpoint:** SPEC-003 may be marked complete only when every required task has succeeded and the canonical data model is proven independent of React presentation, graph libraries, external services, and a backend.

---

# Dependencies

```text
Canonical Data Contracts and Representative Dataset
        ↓
Structural Validation Through TDD
        ↓
Cross-File Semantic Integrity Through TDD
        ↓
Repeatable Data-Validation Command
        ↓
Static Frontend Canonical-Data Access
        ↓
Initial Dataset Validation
        ↓
Existing GitHub Pages Build Integration
        ↓
Local Quality Gates and Scope Checkpoint
        ↓
Documentation Convergence
        ↓
Final Requirements and Convergence
        ↓
SPEC-003 completion
```

## User Story Dependencies

- US3 establishes structural and semantic confidence before the command and CI gate rely on canonical data.
- US1 depends on valid canonical collections and creates the frontend access boundary without implementing a consumer UI.
- US2 depends on the valid relationships and verifies the model can express meaningful technology contexts and many-to-many associations.
- Documentation convergence depends on genuinely validated implementation and local quality-gate results.
- Final convergence depends on all preceding phases.

## Parallel Execution Guidance

Parallel work is intentionally limited because the data collections, schemas, validator, package manifest/lock file, Vite configuration, workflow, and documentation have dependency order or shared-file constraints.

No task is marked `[P]`. The canonical collections, structural contracts, validation implementation, package state, frontend configuration, workflow, and documentation each depend on earlier work or modify shared files.

## Completion

All required tasks must be completed successfully or explicitly identified as blocked with their evidence and impact. A passing build alone does not complete SPEC-003; completion requires deterministic canonical-data validation, the static frontend boundary, CI integration, documentation convergence, and final requirement/scope evidence.
