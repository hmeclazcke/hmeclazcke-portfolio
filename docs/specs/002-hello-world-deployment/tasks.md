# Tasks: Hello World Deployment

**ID:** SPEC-002  
**Phase:** Phase 1 — Static Portfolio  
**Spec:** `docs/specs/002-hello-world-deployment/spec.md`  
**Plan:** `docs/specs/002-hello-world-deployment/plan.md`  
**Status:** Approved

## Purpose

This task list decomposes SPEC-002 into dependency-ordered, independently verifiable work.

Tasks use this format:

```text
- [ ] Txxx [P?] [US?] Description with file path
```

`[P]` is used only for work that may safely proceed in parallel without shared-file, package-state, or deployment-order dependencies. `[US1]`, `[US2]`, and `[US3]` map to the user stories in `spec.md`.

Remote and public validation are intentionally separated from local implementation. A successful local build does not complete SPEC-002.

---

# Phase 1 — Minimal Visible Application Through TDD

## Goal

Add only the approved walking-skeleton content while preserving the semantic application root and no final design or portfolio functionality.

- [x] T001 [US1] Update `frontend/src/App.test.tsx` first with behavioral expectations for the accessible application root, a visible `Hello, world!` heading, and a visible short Lorem Ipsum paragraph.

- [x] T002 [US1] Run `npm run test:run` from `frontend/` and confirm that the updated test fails for the expected missing visible-content behavior before changing production code.

- [x] T003 [US1] Update `frontend/src/App.tsx` with only semantic markup required to render one `Hello, world!` `h1` and one short Lorem Ipsum `p` inside the existing `main` landmark; do not add styling, navigation, routing, design tokens, or later-spec functionality.

- [x] T004 [US1] Re-run `npm run test:run` from `frontend/` and confirm that the updated behavioral test passes.

**Checkpoint:** The local application exposes only the minimal visible walking-skeleton content and its test is green.

---

# Phase 2 — GitHub Pages-Compatible Production Build

## Goal

Make the Vite static artifact resolve correctly at the configured GitHub Pages project-site path without introducing routing.

- [x] T005 [US1] Configure `frontend/vite.config.ts` with the production Vite base path `/hmeclazcke-portfolio/`, without adding routing or changing the static, backend-independent architecture.

- [x] T006 [US1] Run `npm run test:run` and `npm run build` from `frontend/` after the base-path change; confirm both pass.

- [x] T007 [US1] Inspect `frontend/dist/index.html` and generated asset references after the build; confirm production asset URLs use the `/hmeclazcke-portfolio/` project-site path and no route-specific behavior was introduced.

**Checkpoint:** The local production artifact is compatible with the GitHub Pages project-site path.

---

# Phase 3 — GitHub Actions CI/CD Workflow

## Goal

Define the source-controlled Pages workflow that validates, builds, uploads, and deploys only validated static output.

- [x] T008 [US2] Create `.github/workflows/deploy-pages.yml` with triggers for pushes to `main` and `workflow_dispatch`, running on `ubuntu-latest` with Node.js 24.

- [x] T009 [US2] Configure the workflow build/validation job in `.github/workflows/deploy-pages.yml` to use `actions/checkout@v7`, `actions/configure-pages@v5`, `actions/setup-node@v7`, `npm ci` from `frontend/`, and the required frontend commands in order: `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run test:run`, and `npm run build`.

- [x] T010 [US2] Configure the build job to upload only `frontend/dist/` using `actions/upload-pages-artifact@v4`, and configure least-privilege build permissions for repository contents read access and required Pages access.

- [x] T011 [US2] Configure a separate deployment job in `.github/workflows/deploy-pages.yml` that uses `needs: build`, the `github-pages` environment, `actions/deploy-pages@v4`, a deployment-step identifier, exposed `page_url`, and only the Pages/OIDC permissions required for deployment.

- [x] T012 [US2] Configure the standard Pages deployment concurrency policy in `.github/workflows/deploy-pages.yml` with group `pages` and `cancel-in-progress: false`, without introducing secrets, tokens, custom deployment services, or unrelated workflows.

**Checkpoint:** The workflow structure makes deployment dependent on a successful validated build and uploads only the static Pages artifact.

---

# Phase 4 — Local Validation Checkpoint

## Goal

Prove the local implementation and source-controlled workflow are ready for the user to commit and push, while explicitly withholding all remote completion claims.

- [x] T013 [US2] Run the complete applicable frontend quality-gate sequence from `frontend/`: `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run test:run`, and `npm run build`.

- [x] T014 [US1] Verify the generated `frontend/dist/` artifact is static, contains the approved visible content, and uses repository-project-path asset references.

- [x] T015 [US2] Review `.github/workflows/deploy-pages.yml` against the approved plan: triggers, Node version, reproducible install, action versions, commands, permissions, artifact path, job dependency, environment, output, and concurrency policy.

- [x] T016 Perform a SPEC-002 scope-drift review confirming that no final design, routing, portfolio data, graph functionality, GitHub API, backend, OpenAPI, MCP, authentication, persistence, custom domain, analytics, or unrelated automation was introduced.

- [x] T017 Review the current repository diff for accidental or unrelated changes and report any issue before remote validation begins.

## USER COMMIT/PUSH REQUIRED

**Mandatory stop.** After T013 through T017 pass, Codex MUST stop. Codex MUST NOT commit or push. Codex must report that the local SPEC-002 implementation is ready for the user to commit and push to `main`.

Tasks T018 through T035 MUST remain unchecked at this checkpoint. SPEC-002 remains `in-progress` until the user has committed and pushed, explicitly asks Codex to continue, and the remote and public validation stages have succeeded.

---

# Phase 5 — Remote GitHub Actions Validation

## Goal

Verify the actual remote workflow rather than inferring remote success from local commands or workflow source.

- [x] T018 [US2] After the user confirms a commit and push to `main` and explicitly asks to continue, identify the corresponding real GitHub Actions workflow run for `.github/workflows/deploy-pages.yml`.

- [x] T019 [US2] Verify the observed workflow build job completed successfully, used the required frontend validation/build sequence, and uploaded the generated Pages artifact.

- [x] T020 [US2] Verify the observed deployment job ran only after the successful build job, completed successfully, and reported the configured GitHub Pages deployment URL.

- [x] T021 [US2] Verify deployment-gating evidence: the workflow job dependency prevents the deployment job from running after a failed build or required prior step; if the observed remote run fails, record the failure and leave dependent deployment/public-validation tasks incomplete rather than claiming success.

**Checkpoint:** A real GitHub Actions run provides evidence that only a validated static artifact can reach the deployment job.

---

# Phase 6 — Public GitHub Pages Validation

## Goal

Verify the actual deployed site over HTTPS at the expected public URL.

- [x] T022 [US3] Verify that `https://hmeclazcke.github.io/hmeclazcke-portfolio/` is publicly reachable through HTTPS and returns a successful page response.

- [x] T023 [US3] Verify the public page visibly renders `Hello, world!` and the approved short Lorem Ipsum paragraph.

- [x] T024 [US3] Verify the public page's Vite assets load successfully from `/hmeclazcke-portfolio/` and that the deployed page has no dependency on a project backend.

- [x] T025 [US3] Record the public-validation method: retain direct-browser evidence from T022 through T024 when available, or obtain equivalent verifiable evidence when it is not. If neither form of evidence is available, leave T022 through T025 incomplete, report the limitation, and do not mark SPEC-002 done.

**Checkpoint:** The real public Pages deployment, content, asset path, HTTPS availability, and backend independence are evidenced.

---

# Phase 7 — Documentation Convergence

## Goal

Update authoritative documentation only after remote and public deployment evidence supports the actual state.

- [x] T026 [US3] Update `README.md` with the verified live URL `https://hmeclazcke.github.io/hmeclazcke-portfolio/` only after T022 through T024 are complete.

- [x] T027 Update `docs/architecture.md` with the implemented GitHub Actions-to-GitHub Pages static deployment boundary only after remote deployment and public validation succeed.

- [x] T028 Update `docs/quality-gates.md` with the actual CI/CD validation and deployment behavior only after the corresponding remote workflow has succeeded.

- [x] T029 Update the SPEC-002 entry in `docs/roadmap.md` to reflect its actual state only when completion evidence justifies the update.

- [x] T030 Update `docs/current.md` with the actual SPEC-002 workflow state and immediate next step, preserving the Current Development Environment section.

**Checkpoint:** Public-facing and authoritative documentation reflect verified deployment facts rather than intended behavior.

---

# Phase 8 — Final Convergence

## Goal

Prove the implementation satisfies the approved specification without scope drift and only then permit SPEC-002 completion.

- [x] T031 Review the resulting implementation against every functional requirement FR-001 through FR-015 in `docs/specs/002-hello-world-deployment/spec.md`.

- [x] T032 Review the resulting implementation against every success criterion SC-001 through SC-007 in `docs/specs/002-hello-world-deployment/spec.md`.

- [x] T033 Perform a final scope-drift review confirming that no SPEC-003 or later functionality was introduced.

- [x] T034 Review the final repository diff for unrelated or accidental changes and report any issue before declaring SPEC-002 complete.

- [x] T035 Confirm all local, remote workflow, and public deployment validation evidence is successful; leave SPEC-002 `in-progress` and report the specific incomplete evidence if any required validation could not be performed.

**Checkpoint:** SPEC-002 may be marked complete only after all required local, remote, public, documentation, and scope-validation tasks are complete.

---

# Dependencies

```text
Minimal Visible Application Through TDD
        ↓
GitHub Pages-Compatible Production Build
        ↓
GitHub Actions CI/CD Workflow
        ↓
Local Validation Checkpoint
        ↓
USER COMMIT/PUSH REQUIRED
        ↓
Remote GitHub Actions Validation
        ↓
Public GitHub Pages Validation
        ↓
Documentation Convergence
        ↓
SPEC-002 Complete
```

## User Story Dependencies

- US1 depends on the completed SPEC-001 frontend foundation and precedes the production build configuration.
- US2 depends on the locally validated build and workflow source.
- US3 depends on a successful real GitHub Actions deployment.
- Documentation convergence depends on verified remote and public deployment facts.
- Final convergence depends on every preceding stage, including the user commit/push checkpoint.

## Completion

All tasks must either be completed successfully or explicitly identified as blocked with their evidence and impact. A local build, workflow file review, or unverified deployment URL alone does not complete SPEC-002.
