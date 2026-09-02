# Quality Gates

## Purpose

This document defines the project-wide conditions that must be satisfied before work can be considered complete.

Quality gates apply in addition to the acceptance criteria defined by each specification.

A specification is not complete merely because its visible functionality appears to work.

The exact commands used to enforce these gates will evolve as the frontend, backend, and development tooling are introduced.

---

## Core Rule

A change must not be reported as complete unless:

- its specification acceptance criteria are satisfied;
- applicable automated tests pass;
- applicable static analysis and validation checks pass;
- the project builds successfully where relevant;
- no known regression has been introduced;
- the implementation remains consistent with the documented architecture;
- required documentation is updated;
- any skipped or unavailable gate is explicitly reported with its reason.

A failed required gate means the work is not complete.

---

## Specification Validation

Every implemented specification must be validated against its own acceptance criteria.

Before marking a specification as `done`:

- review the implemented behavior against the approved `spec.md`;
- confirm that all required acceptance criteria are satisfied;
- verify that the implementation has not silently expanded beyond the approved scope;
- identify any unmet or partially met requirement explicitly;
- update the roadmap and current project state only after validation succeeds.

Implementation success alone is not sufficient.

---

## Testing

The project follows Test-Driven Development as defined in `AGENTS.md`.

Applicable automated tests must pass before work is considered complete.

Testing should progressively include, where relevant:

- unit tests;
- component tests;
- integration tests;
- API contract tests;
- architecture tests;
- regression tests;
- end-to-end tests for critical user flows.

Not every type of test is required for every specification.

The appropriate test level should be selected based on the behavior being implemented.

Tests must not be removed, weakened, skipped, or rewritten solely to make a failing implementation pass.

Bug fixes should include a regression test whenever reasonably possible.

---

## Build

Any affected deployable component must build successfully.

Examples include:

- frontend production build;
- backend application build;
- generated deployment artifacts.

A successful development server or local preview does not replace a production build check when a production build exists.

Build commands will be documented here once the relevant project tooling is established.

---

## Formatting

Source code and supported project files must comply with the project's configured formatting rules.

Formatting should be deterministic and automated where practical.

Formatting tools and commands will be defined when the relevant frontend and backend tooling is introduced.

Formatting failures must be resolved before completion unless an explicit documented exception exists.

---

## Linting and Static Analysis

Applicable linting and static-analysis checks must pass.

These may progressively include:

- frontend linting;
- TypeScript type checking;
- Java static analysis;
- architecture validation;
- dependency rules;
- security-oriented checks.

Tools must only be introduced when their value and maintenance cost are justified.

The absence of a particular tool does not waive existing architectural or code-quality requirements.

---

## Type Safety

Where the selected technology provides static type checking, type errors must be treated as quality-gate failures.

For example, if TypeScript is selected for the frontend, its configured type-checking process must pass.

The exact type-check command will be documented once the frontend foundation is established.

---

## Architecture Validation

Changes must remain consistent with `docs/architecture.md`.

Validation should confirm, where applicable, that:

- the static portfolio remains independent from backend availability;
- project-owned portfolio data remains separate from presentation implementation;
- external systems remain explicit architectural boundaries;
- backend functionality does not become a hidden requirement for the static core;
- new infrastructure or dependencies are justified by an approved requirement;
- framework-specific concerns do not leak across intended architectural boundaries.

Automated architecture tests may be introduced where they provide clear value.

---

## Static Portfolio Availability

For Phase 1, the core portfolio must remain usable without the project backend.

Applicable validation should confirm that:

- static content loads successfully;
- the technology graph can operate from project-owned structured data;
- core navigation remains usable;
- failure of optional dynamic integrations does not cause the overall portfolio to fail;
- unavailable dynamic capabilities expose an understandable degraded, loading, retry, or unavailable state where relevant.

This is a required Phase 1 quality characteristic.

---

## Accessibility and Responsive Behavior

When user-facing UI exists, applicable validation should include:

- keyboard accessibility for interactive elements;
- semantic HTML where appropriate;
- readable content across supported screen sizes;
- reasonable focus behavior;
- appropriate labels for controls;
- no critical interaction that depends solely on pointer input;
- no known severe accessibility regression.

Automated accessibility tooling may supplement, but does not replace, meaningful behavioral review.

The current frontend test suite includes a focused `axe-core` check for the rendered shell. Its jsdom invocation disables only `color-contrast`, which axe-core documents as unreliable in jsdom. Rendered-browser review remains required for actual contrast, keyboard focus, text resizing, reduced-motion, atmosphere, and responsive behavior.

---

## Documentation

Documentation is part of the implementation.

Before completing work, update authoritative project documentation when the change materially affects:

- product behavior;
- architecture;
- roadmap status;
- quality requirements;
- project setup or execution;
- current project state.

The root `README.md` should be updated only when the completed change affects information relevant to external readers, following the rules in `AGENTS.md`.

Do not duplicate detailed information across documentation files unnecessarily.

---

## Deployment Validation

Specifications that affect deployment must validate the relevant deployment path.

For Phase 1, this may include:

- successful frontend production build;
- successful GitHub Actions workflow;
- successful GitHub Pages deployment;
- public HTTPS accessibility;
- correct operation under the deployed GitHub Pages path.

A local build alone is not sufficient evidence that a deployment specification is complete.

The implemented Pages workflow runs `npm ci`, then `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run validate:data`, `npm run test:run`, and `npm run build` from `frontend/`. Only a successful build job uploads `frontend/dist/`; the dependent deployment job then publishes that artifact to GitHub Pages. Deployment validation requires a successful real workflow run and a successful public HTTPS and project-path asset check, in addition to the local gates.

For future backend capabilities, backend deployment will have its own applicable gates and must remain independent from the static frontend deployment.

---

## External Integration Resilience

External integrations must not silently compromise the core portfolio experience.

When a specification introduces or changes an external integration, validate as appropriate:

- successful response handling;
- loading behavior;
- unavailable-service behavior;
- error behavior;
- rate-limit behavior where relevant;
- preservation of the static core when the external dependency fails.

External service availability itself is not considered a project quality gate; the application's behavior when that service is unavailable is.

---

## Security

Security checks should be proportional to the capability being introduced.

At minimum:

- secrets must never be committed to the repository;
- browser-delivered code must not contain private credentials;
- sensitive server-side credentials must remain server-side;
- dependencies should not be introduced from untrusted or unexplained sources;
- authentication and authorization requirements, when introduced, must be validated explicitly.

More specific security gates should be added when backend, authentication, or privileged functionality is introduced.

---

## Quality Gate Scope

Not every gate applies to every change.

Examples:

- a documentation-only change may not require a frontend production build;
- a frontend-only change should not require backend tests when the backend is unaffected;
- a backend-only change should not require unrelated frontend checks;
- a deployment change must validate the deployment path it modifies.

Run the smallest set of gates that fully validates the affected scope.

Do not skip a relevant gate merely to save time.

---

## Skipped or Unavailable Gates

If an applicable quality gate cannot be executed:

1. do not silently ignore it;
2. identify the gate;
3. explain why it could not be run;
4. report the resulting uncertainty;
5. do not claim full completion when the missing gate materially affects confidence in the result.

Temporary inability to execute a gate must not be represented as a successful gate.

---

## Current Gate Commands

Run frontend commands from `frontend/`.

- `npm run format`: apply Prettier formatting before validation when source formatting has changed.
- `npm run format:check`: verify formatting without modifying files; required for frontend changes.
- `npm run lint`: run ESLint static source validation; required for frontend changes.
- `npm run typecheck`: run the TypeScript compiler without producing a build artifact; required for frontend changes.
- `npm run validate:data`: validate canonical portfolio JSON structurally and across collections; required whenever canonical data or its validation boundary changes, and enforced in the Pages build job before tests and production build.
- `npm run test:run`: run the complete Vitest suite once and exit; required for frontend changes with applicable tests.
- `npm run build`: produce the Vite static production artifact; required when frontend production output is affected and for frontend specification completion.

`npm run dev` and `npm run preview` support local development and local static-artifact inspection respectively; they do not replace the corresponding validation gates.

---

## Evolution

This document should evolve with the project.

When a new tool or component introduces a repeatable validation command:

1. document the command here;
2. define when it must be run;
3. ensure CI enforces it when appropriate;
4. keep local and CI validation behavior aligned where practical.

Quality gates should remain understandable, reproducible, and directly connected to real project risks.
