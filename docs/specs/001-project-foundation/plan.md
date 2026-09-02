# Implementation Plan: Project Foundation

**ID:** SPEC-001  
**Phase:** Phase 1 — Static Portfolio  
**Spec:** `docs/specs/001-project-foundation/spec.md`  
**Status:** Approved  
**Created:** 2026-09-02

## Summary

Establish the Phase 1 frontend foundation as a statically buildable React application using TypeScript and Vite.

The foundation will provide:

- local frontend development;
- deterministic dependency management;
- static type checking;
- linting;
- deterministic formatting;
- automated component testing;
- production static builds;
- repeatable quality-gate commands.

The implementation must remain intentionally minimal.

It must not implement real portfolio content, visual design, GitHub Pages deployment, GitHub Actions deployment, portfolio data, routing, backend capabilities, or other later specifications.

---

## Technical Context

### Runtime

- Node.js 24 LTS is the project baseline.
- npm is the package manager.
- Exact dependency versions are captured by `package-lock.json`.

The project should remain compatible with later supported Node.js versions where practical, but Node.js 24 LTS is the development baseline for this specification.

### Frontend

- React.
- TypeScript.
- Client-side application.
- Vite as the frontend development server and production build tool.

### Testing

- Vitest as the test runner.
- React Testing Library for React component behavior.
- jsdom as the browser-like test environment.

### Code Validation

- ESLint for linting and static source validation.
- TypeScript compiler for static type checking.
- Prettier for deterministic source formatting.

### Storage

Not applicable.

SPEC-001 introduces no application persistence or portfolio data model.

### Deployment

No deployment implementation is included in this specification.

The production build must generate a static artifact suitable for the Phase 1 architecture.

GitHub Pages and GitHub Actions deployment belong to SPEC-002.

---

## Technical Decisions

### TD-001 — React SPA

Use a client-side React application rather than Next.js or another full-stack React framework for the Phase 1 foundation.

### Rationale

The current product architecture requires:

- a statically deployable frontend;
- browser-side interaction;
- no backend dependency for the core portfolio;
- eventual GitHub Pages hosting;
- no current requirement for server-side rendering or server-side React capabilities.

A full-stack React framework would introduce capabilities that SPEC-001 does not currently require.

This decision may be revisited only if later product requirements establish a concrete need.

---

### TD-002 — TypeScript

Use TypeScript for frontend source code.

### Rationale

The project is intended to evolve into an interactive application with structured portfolio data, graph relationships, external integrations, and multiple UI components.

Static typing provides useful validation as that complexity grows and establishes a compile-time quality gate from the beginning.

---

### TD-003 — Vite

Use Vite for frontend development and production builds.

### Responsibilities

Vite will provide:

- local development server;
- React development integration;
- TypeScript-aware frontend tooling;
- production static build generation;
- later compatibility with the GitHub Pages deployment model.

The expected production artifact directory is:

```text
frontend/dist/
```

GitHub Pages base-path configuration is intentionally deferred to SPEC-002.

---

### TD-004 — npm

Use npm as the package manager.

### Rationale

npm is already distributed with Node.js and satisfies the current project requirements without introducing another package-management tool.

The generated `package-lock.json` must be committed so installations can be reproduced consistently.

---

### TD-005 — Vitest

Use Vitest as the frontend test runner.

### Rationale

Vitest integrates naturally with the Vite development environment and supports the project's TDD workflow without introducing an unrelated test toolchain.

Tests executed as a quality gate must run once and terminate with an appropriate process exit code.

Watch mode may exist for development but is not itself a completion gate.

---

### TD-006 — React Testing Library

Use React Testing Library for behavior-oriented React component tests.

Tests should prefer observable user-facing behavior and accessible DOM queries over testing component implementation details.

SPEC-001 only requires enough component testing infrastructure to prove that the foundation is usable.

---

### TD-007 — jsdom

Use jsdom as the default browser-like environment for React component tests executed through Vitest.

Real-browser or end-to-end testing is not required by SPEC-001.

It may be introduced later when product behavior justifies it.

---

### TD-008 — ESLint

Use ESLint for frontend linting and static source validation.

Use the current flat-config format supported by ESLint.

Linting responsibilities must remain distinct from formatting responsibilities.

---

### TD-009 — Prettier

Use Prettier for deterministic formatting.

Prettier should be installed as a local development dependency and its version captured by the package lock.

Provide separate commands for:

- applying formatting;
- verifying formatting without modifying files.

Do not use formatting failures as an excuse to mix unrelated source changes into a specification.

---

## Explicitly Deferred Decisions

SPEC-001 does not select or introduce:

- Next.js;
- React Router;
- a CSS framework;
- Tailwind CSS;
- a component library;
- a state-management library;
- a graph visualization library;
- a portfolio data schema;
- a backend;
- OpenAPI;
- MCP;
- authentication;
- persistence;
- GitHub API integration;
- GitHub Actions deployment;
- GitHub Pages deployment configuration.

Those decisions belong to later specifications when required.

---

## Project Structure

After SPEC-001 is implemented, the relevant repository structure is expected to resemble:

```text
hmeclazcke-portfolio/
├── AGENTS.md
├── .gitignore
├── docs/
│   └── specs/
│       └── 001-project-foundation/
│           ├── spec.md
│           ├── plan.md
│           └── tasks.md
│
└── frontend/
    ├── AGENTS.md
    ├── package.json
    ├── package-lock.json
    ├── tsconfig.json
    ├── vite.config.ts
    ├── eslint.config.*
    ├── .prettierrc
    ├── .prettierignore
    ├── index.html
    └── src/
        ├── main.tsx
        ├── App.tsx
        └── test/
            └── setup.ts
```

The exact scaffold may contain additional configuration files generated or required by the selected current Vite/TypeScript tooling.

Generated configuration should be retained only when it serves a concrete project requirement.

Do not preserve demo assets or sample code merely because the scaffold generated them.

---

## Minimal Application Strategy

The frontend must contain only the minimum application code necessary to:

- start React successfully;
- render a valid application root;
- support an automated component test;
- produce a production static build.

Do not implement the planned `Hello, world!` or Lorem Ipsum page.

That user-visible milestone belongs to SPEC-002.

Do not introduce the final site design, navigation, portfolio sections, technology graph, or visual identity during SPEC-001.

---

## Testing Strategy

Development follows the TDD rules established in `AGENTS.md`.

For SPEC-001, testing should prove that the frontend testing infrastructure is functional without prematurely testing later product features.

At minimum:

1. establish Vitest with a jsdom environment;
2. establish React Testing Library;
3. write a minimal failing component behavior test before the corresponding minimal application implementation;
4. implement only enough application code to make that test pass;
5. run the test suite successfully.

The initial test must verify observable rendered behavior or structure rather than internal React implementation details.

No end-to-end test framework is introduced by this specification.

---

## Quality Gate Commands

SPEC-001 will establish npm scripts representing the frontend quality gates.

The intended command interface is:

```text
npm run dev
npm run format
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run test:run
npm run build
npm run preview
```

### Command Semantics

- `npm run dev`
  - Starts the local Vite development server.

- `npm run format`
  - Applies configured formatting.

- `npm run format:check`
  - Verifies formatting without modifying files.

- `npm run lint`
  - Runs ESLint and fails when configured lint rules fail.

- `npm run typecheck`
  - Runs TypeScript static validation without producing the production artifact.

- `npm run test`
  - Runs Vitest in the developer-friendly mode selected during implementation.

- `npm run test:run`
  - Runs the complete frontend test suite once and exits.
  - This is the test command used as a completion quality gate.

- `npm run build`
  - Produces the static production artifact.

- `npm run preview`
  - Serves the production artifact locally for inspection.
  - It is a preview tool, not a production server.

The exact underlying CLI arguments belong to implementation and must use the installed project-local tools.

These commands must be documented in `docs/quality-gates.md` when implemented.

---

## Frontend Agent Instructions

SPEC-001 should introduce:

```text
frontend/AGENTS.md
```

because the frontend now becomes an independently governed area of the monorepo.

It should contain only frontend-specific instructions.

It must extend rather than duplicate the root `AGENTS.md`.

Expected concerns include:

- React and TypeScript conventions;
- frontend TDD expectations;
- behavior-oriented component testing;
- accessibility-aware implementation;
- static-core independence from backend availability;
- frontend quality-gate commands;
- dependency discipline;
- scope discipline.

Detailed frontend rules must be based on the actual tooling introduced by this specification.

---

## Architecture and Governance Check

Before implementation is considered complete, verify that the plan remains compatible with:

- `AGENTS.md`;
- `docs/vision.md`;
- `docs/architecture.md`;
- `docs/quality-gates.md`;
- `docs/roadmap.md`.

### Required Checks

- The frontend remains independently statically buildable.
- No backend is introduced.
- No backend availability is required.
- No deployment work from SPEC-002 is implemented.
- No portfolio feature from later specifications is implemented.
- No unnecessary infrastructure or framework is introduced.
- TDD remains enforceable.
- Quality gates are repeatable and documented.
- Frontend-specific instructions do not duplicate repository-wide instructions unnecessarily.

No known governance or architectural exception is required by this plan.

---

## Documentation Updates Required During Implementation

When the selected foundation is implemented, update the authoritative documentation as appropriate.

At minimum:

### `docs/architecture.md`

Record finalized frontend foundation decisions:

- React SPA;
- TypeScript;
- Vite;
- npm;
- Node.js 24 LTS baseline.

Do not add implementation-level package details that do not belong in architecture documentation.

### `docs/quality-gates.md`

Add the concrete frontend validation commands established by SPEC-001.

### `docs/roadmap.md`

Reflect the actual SPEC-001 status.

### `docs/current.md`

Track SPEC-001 as the active specification and update its workflow stage as work progresses.

### `README.md`

Update only if the completed foundation introduces information that is useful to an external repository visitor, following `AGENTS.md`.

---

## Implementation Approach

Implementation should proceed incrementally.

1. Establish the frontend project structure.
2. Establish package management and Node.js baseline.
3. Establish the React + TypeScript + Vite foundation.
4. Remove generated demo content not required by the specification.
5. Establish the test environment.
6. Use TDD to establish the minimal React application behavior.
7. Establish linting.
8. Establish type checking.
9. Establish deterministic formatting.
10. Establish production build and local production preview.
11. Execute all applicable frontend quality gates.
12. Update authoritative project documentation.
13. Validate the result against SPEC-001.
14. Confirm that no SPEC-002 or later feature work was introduced.

Detailed executable steps belong in `tasks.md`.

---

## Risks and Mitigations

### Risk — Scaffold introduces unnecessary demo content

**Mitigation:** Remove generated example assets, styling, and components that are not required by SPEC-001.

### Risk — Tooling becomes more complex than the application foundation

**Mitigation:** Introduce only the tools required by the specification and project-wide quality gates.

### Risk — Deployment work leaks into SPEC-001

**Mitigation:** Produce a static artifact but defer GitHub Actions, GitHub Pages, repository-path configuration, and public deployment to SPEC-002.

### Risk — Visual-design decisions are made prematurely

**Mitigation:** Do not introduce CSS frameworks, component libraries, or final styling. Visual design belongs to later Phase 1 specifications.

### Risk — Tests verify implementation details

**Mitigation:** Use React Testing Library and observable DOM behavior rather than component internals.

### Risk — Frontend setup becomes dependent on future backend work

**Mitigation:** Validate development, tests, and production build with no project backend running.

---

## Scope Validation

This plan satisfies SPEC-001 without implementing:

- real portfolio content;
- `Hello, world!` deployment content;
- public deployment;
- final visual identity;
- technology graph;
- portfolio data;
- GitHub integration;
- backend capabilities;
- OpenAPI;
- MCP.

If implementation requires any of these capabilities, stop and reassess scope before proceeding.

---

## Plan Completion Condition

This plan is ready for task decomposition when:

1. all technical choices required for SPEC-001 are explicit;
2. no unresolved technical decision blocks implementation;
3. the plan remains consistent with the approved specification;
4. the plan remains consistent with project architecture and governance;
5. implementation can be decomposed into small, verifiable tasks without inventing additional architectural decisions.
