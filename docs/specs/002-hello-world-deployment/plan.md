# Implementation Plan: Hello World Deployment

**ID:** SPEC-002  
**Phase:** Phase 1 — Static Portfolio  
**Spec:** `docs/specs/002-hello-world-deployment/spec.md`  
**Status:** Approved

## Summary

Extend the completed SPEC-001 React SPA with only a visible `Hello, world!` heading and one short Lorem Ipsum paragraph. Configure the Vite production build for the GitHub Pages project path, then introduce one GitHub Actions workflow that validates, builds, uploads, and deploys the static artifact.

The implementation validates the first public delivery path at:

```text
https://hmeclazcke.github.io/hmeclazcke-portfolio/
```

No backend, routing, final visual design, or portfolio feature is required.

## Technical Context

### Existing Foundation

SPEC-001 established the following frontend baseline:

- React SPA with TypeScript and Vite;
- npm with Node.js 24 LTS;
- Vitest, React Testing Library, and jsdom;
- ESLint, Prettier, and TypeScript validation;
- static production output at `frontend/dist/`;
- completion gates run from `frontend/`:

  ```text
  npm run format:check
  npm run lint
  npm run typecheck
  npm run test:run
  npm run build
  ```

The application remains independently usable without a project backend.

### Deployment Context

- GitHub Pages is the Phase 1 static-hosting target.
- GitHub Actions is the deployment mechanism.
- GitHub Pages has already been manually configured at `Settings → Pages → Source → GitHub Actions`.
- The repository project-site path is `/hmeclazcke-portfolio/`.
- The expected public HTTPS URL is `https://hmeclazcke.github.io/hmeclazcke-portfolio/`.

The existing GitHub Pages and GitHub Actions references in `docs/references.md` are the authoritative external guidance for the deployment workflow.

## Technical Decisions

### TD-001 — Minimal Semantic Walking-Skeleton Content

Reuse the existing `App` component and render only:

- one `h1` containing `Hello, world!`; and
- one short `p` containing Lorem Ipsum placeholder text.

The existing `main` landmark remains the application root. No CSS, design tokens, layout system, navigation, routing, or other portfolio content is introduced.

### TD-002 — Vite Project-Site Base Path

Configure Vite's production `base` option as:

```text
/hmeclazcke-portfolio/
```

This ensures generated production asset URLs resolve under the GitHub Pages project-site path. It does not introduce client-side routing or change the local development architecture.

### TD-003 — Test-First Content Verification

Update the existing React Testing Library test before changing `App.tsx`. The test will behaviorally verify the accessible main landmark, the `Hello, world!` heading, and the Lorem Ipsum paragraph. The implementation then adds only the markup necessary to satisfy that test.

### TD-004 — One GitHub Pages Deployment Workflow

Create `.github/workflows/deploy-pages.yml` as the sole workflow introduced by this specification.

It will:

- run on pushes to `main` and support `workflow_dispatch`;
- run on `ubuntu-latest`;
- use Node.js 24;
- use `npm ci` in `frontend/` for reproducible installation;
- run the five established frontend completion gates in `frontend/`;
- upload only `frontend/dist/` as the Pages artifact; and
- deploy only a successfully validated and built artifact.

The workflow will use these action versions:

- `actions/checkout@v7`;
- `actions/setup-node@v7`;
- `actions/configure-pages@v5`;
- `actions/upload-pages-artifact@v4`;
- `actions/deploy-pages@v4`.

### TD-005 — Separate Validation/Build and Deployment Jobs

The workflow will define:

1. a `build` job that checks out source, configures Pages, sets up Node, installs dependencies, runs all frontend gates, builds, and uploads the Pages artifact; and
2. a `deploy` job that depends on successful completion of `build` and deploys the uploaded artifact.

The `build` job will run npm commands using `frontend/` as its working directory. The `deploy` job will use the `github-pages` environment and expose the deployed URL through the deployment step's `page_url` output.

### TD-006 — Least-Privilege Pages Permissions

Grant only the permissions needed by the relevant job:

- build: `contents: read` and `pages: write` for source checkout and Pages configuration/artifact preparation;
- deploy: `pages: write` and `id-token: write` for GitHub Pages deployment with OIDC.

No repository secret, personal access token, custom deployment token, or third-party deployment service is used.

### TD-007 — Non-Conflicting Deployment Concurrency

Use the standard GitHub Pages deployment concurrency group:

```text
group: pages
cancel-in-progress: false
```

This serializes production deployments while allowing an already started Pages deployment to finish rather than being interrupted by a newer run.

## Expected Repository Changes

During implementation, change only the files required by this specification:

```text
hmeclazcke-portfolio/
├── .github/
│   └── workflows/
│       └── deploy-pages.yml       # new Pages validation/deployment workflow
├── frontend/
│   ├── src/
│   │   ├── App.tsx                # minimal visible content
│   │   └── App.test.tsx           # TDD coverage for visible content
│   └── vite.config.ts             # GitHub Pages base path
├── README.md                      # verified public URL after remote deployment
└── docs/
    ├── architecture.md            # implemented deployment boundary
    ├── quality-gates.md           # CI/CD validation behavior
    ├── roadmap.md                 # actual SPEC-002 status
    └── current.md                 # active/completed workflow state
```

No package dependency, backend module, data directory, route, or additional workflow is expected.

## TDD / Testing Strategy

The frontend content change follows the existing TDD discipline:

1. update `frontend/src/App.test.tsx` to express the required visible heading and paragraph behavior;
2. run `npm run test:run` and confirm it fails because the current empty application root has no required content;
3. update `frontend/src/App.tsx` with the minimal semantic markup;
4. rerun the test and confirm it passes;
5. run the full local frontend gate sequence.

The test will query observable accessible DOM behavior rather than React implementation details. The existing `main` landmark test remains covered.

## CI/CD Design

### Build Job

The `build` job is the deployment gate. It will execute, in order:

1. `actions/checkout@v7`;
2. `actions/configure-pages@v5`;
3. `actions/setup-node@v7` with Node.js 24 and npm caching keyed by `frontend/package-lock.json`;
4. `npm ci` from `frontend/`;
5. `npm run format:check`;
6. `npm run lint`;
7. `npm run typecheck`;
8. `npm run test:run`;
9. `npm run build`;
10. `actions/upload-pages-artifact@v4` with `frontend/dist/` as the only uploaded artifact path.

Default GitHub Actions failure behavior stops later steps, so a failed install, quality gate, or build prevents artifact upload and prevents the dependent deployment job.

### Deployment Job

The `deploy` job will use `needs: build`, the `github-pages` environment, and `actions/deploy-pages@v4`. Its deployment step will have an identifier so the job can expose the action's `page_url` output as the environment URL.

The workflow will not automate GitHub repository settings. The manually configured Pages source remains an external prerequisite.

## Deployment Validation

Completion requires three distinct validation layers.

### 1. Local Validation

Run from `frontend/`:

```text
npm run format:check
npm run lint
npm run typecheck
npm run test:run
npm run build
```

Also use the local Vite preview to confirm the static artifact can be served. Local success is necessary but insufficient for SPEC-002 completion.

### 2. GitHub Actions Workflow Validation

After the workflow is available on `main`, verify an actual GitHub Actions run:

- starts from a push to `main` or an explicit `workflow_dispatch` run;
- completes the build job successfully;
- reports each required quality gate as successful;
- uploads the generated Pages artifact; and
- completes the dependent Pages deployment job successfully.

Failure behavior must also preserve the workflow's job dependency: a failed build job must leave the deployment job unexecuted.

### 3. Public Deployment Validation

After a successful deployment job, verify all of the following at:

```text
https://hmeclazcke.github.io/hmeclazcke-portfolio/
```

- HTTPS responds successfully;
- `Hello, world!` is visible;
- Lorem Ipsum placeholder text is visible; and
- generated Vite JavaScript and other assets load from the `/hmeclazcke-portfolio/` project path without asset-resolution failures.

If the execution environment cannot directly inspect the public site in a browser, implementation must report that limitation and must not claim successful public validation or mark SPEC-002 done without independently verifiable evidence.

## Documentation Updates

Only after the real GitHub Actions deployment and public HTTPS validation succeed:

- add `https://hmeclazcke.github.io/hmeclazcke-portfolio/` to `README.md`;
- update `docs/architecture.md` with the implemented GitHub Actions-to-GitHub Pages static deployment boundary;
- update `docs/quality-gates.md` with the actual CI/CD validation and deployment behavior;
- update the SPEC-002 status in `docs/roadmap.md`; and
- update `docs/current.md` with the actual workflow state and immediate next step.

Do not mark SPEC-002 done based on local validation alone.

## Risks and Mitigations

### Risk — Incorrect project-site asset paths

**Mitigation:** Set Vite's production base path explicitly and verify loaded assets at the public project-site URL.

### Risk — Invalid source reaches production

**Mitigation:** Make deployment depend on the build job, and make the build job run every established completion gate before artifact upload.

### Risk — Overlapping deployments conflict

**Mitigation:** Use the standard `pages` concurrency group with in-progress cancellation disabled.

### Risk — Repository Pages settings do not match the workflow

**Mitigation:** Treat `Settings → Pages → Source → GitHub Actions` as an explicit external prerequisite and verify the real deployment job before completion.

### Risk — Local success is mistaken for public deployment success

**Mitigation:** Require successful remote workflow and public HTTPS/browser verification before documentation convergence or specification completion.

## Scope Validation

This plan satisfies SPEC-002 without introducing:

- final design or Matrix / Blade Runner styling;
- a site shell, navigation, or routing;
- portfolio data or graph functionality;
- GitHub API integration;
- backend code, OpenAPI, MCP, authentication, or persistence;
- custom domains or analytics; or
- unrelated CI automation.

## Plan Completion Condition

This plan is ready for task decomposition when:

1. the minimal frontend content and its behavior-oriented TDD cycle are explicit;
2. the Vite project-site path is explicit;
3. the workflow trigger, jobs, action versions, commands, permissions, artifact path, dependency, environment, and concurrency policy are explicit;
4. manual GitHub Pages configuration is recognized as an external prerequisite;
5. local, workflow, and public deployment validation are distinguished; and
6. no unresolved decision requires architecture or product changes beyond SPEC-002.
