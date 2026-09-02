# Product Roadmap

## Purpose

This roadmap decomposes the portfolio into small, independently specifiable capabilities.

It defines the intended delivery order, scope boundaries, dependencies, and current status at a high level.

It intentionally does not contain detailed requirements, technical design, or implementation tasks.

For each roadmap item:

- detailed requirements belong in its `spec.md`;
- technical design and implementation decisions belong in its `plan.md`;
- executable work belongs in its `tasks.md`.

Roadmap identifiers are stable references and should remain unchanged once specifications begin referencing them.

## Status Legend

- `planned` — not yet started.
- `in-progress` — currently being specified, planned, implemented, or validated.
- `done` — implemented and validated against its specification and applicable quality gates.
- `deferred` — intentionally postponed.

---

# Phase 1 — Static Portfolio

## Goal

Deliver a complete, useful, publicly accessible portfolio that works without the project backend.

The Phase 1 portfolio will be deployed statically to GitHub Pages through GitHub Actions.

At the end of this phase, visitors must be able to explore the core portfolio even if no backend exists or any optional dynamic integration is unavailable.

## Completion Criteria

Phase 1 is complete when:

- the portfolio is publicly accessible through GitHub Pages over HTTPS;
- deployment is automated through GitHub Actions;
- the core site works without the project backend;
- Home and About Me are available;
- the technology graph is interactive and driven by structured portfolio data;
- technologies can be related to professional, portfolio, and learning contexts;
- selected portfolio projects can be explored;
- relevant public GitHub information can be shown without becoming a dependency of the core experience;
- contact and external-profile links are available;
- the portfolio explains relevant aspects of how it was engineered;
- the site behaves appropriately across supported screen sizes and interaction modes;
- applicable quality gates pass.

## Specifications

| ID | Specification | Intent | Scope Boundary | Depends On | Status |
|---|---|---|---|---|---|
| SPEC-001 | Project Foundation | Establish the minimum frontend project foundation and development tooling required to begin implementation. | No real portfolio content or final UI. Must support producing a static deployment artifact compatible with the planned Phase 1 deployment model. | — | done |
| SPEC-002 | Hello World Deployment | Validate the complete delivery path by publicly deploying a minimal page containing `Hello, world!` and Lorem Ipsum. | Validates frontend build, GitHub Actions and GitHub Pages deployment only. No real portfolio design or content. | SPEC-001 | done |
| SPEC-003 | Portfolio Data Model | Define the project-owned structured representation of technologies, contexts, projects, classifications, statuses, and relationships. | Defines data concepts and validation needs. Does not implement the final graph visualization. | SPEC-001 | done |
| SPEC-004 | Site Shell and Visual Foundation | Establish the common site structure, navigation foundation, and initial visual language used by the public portfolio. | Shared presentation foundation only. Feature-specific content remains in later specs. | SPEC-001 | planned |
| SPEC-005 | Home | Build the main public entry experience and concise technical presentation. | Does not reproduce a traditional résumé or detailed professional history. | SPEC-004 | planned |
| SPEC-006 | About Me | Present a personal but professionally focused introduction, including the intended use of personal visual material. | Does not duplicate LinkedIn professional history. | SPEC-004 | planned |
| SPEC-007 | Technology Graph | Build the interactive graph representing technologies and their relationships to professional, portfolio, and learning contexts. | Core graph visualization and relationship navigation only. Must run without the backend. | SPEC-003, SPEC-004 | planned |
| SPEC-008 | Technology Graph Exploration | Add richer graph interaction such as exploration, selection, filtering, and contextual detail where justified by the product design. | Extends the existing graph without introducing backend-dependent intelligence. | SPEC-007 | planned |
| SPEC-009 | Portfolio Projects | Present selected portfolio projects and connect them to technologies and public source repositories. | Does not duplicate full professional employment history. | SPEC-003, SPEC-004 | planned |
| SPEC-010 | Public GitHub Integration | Enrich the portfolio with useful public GitHub information that can be obtained without the project backend. | GitHub information is an enhancement. GitHub failure or rate limiting must not break the static portfolio. | SPEC-004 | planned |
| SPEC-011 | How This Portfolio Was Built | Present selected public information about the engineering practices and architecture used to build the portfolio itself. | Public engineering overview only. Internal agent instructions, temporary notes, and implementation planning remain internal. | SPEC-004 | planned |
| SPEC-012 | Contact and External Profiles | Provide clear access to approved external destinations such as LinkedIn, GitHub, and email. | No downloadable résumé and no duplicate LinkedIn work history by default. | SPEC-004 | planned |
| SPEC-013 | Accessibility, Responsive Design and UX Hardening | Validate and improve the completed Phase 1 experience across relevant devices, screen sizes, accessibility needs, loading states, and failure states. | Cross-cutting hardening only. No new major product capabilities. | SPEC-005 through SPEC-012 as applicable | planned |
| SPEC-014 | Static Portfolio Release | Validate and release the complete Phase 1 portfolio as the stable public version. | Release readiness, final Phase 1 validation, and deployment only. Backend capabilities remain outside this phase. | All required Phase 1 specifications | planned |

---

# Phase 2 — Backend and Dynamic Capabilities

## Goal

Introduce server-side and intelligent capabilities that add real product value while preserving the independently usable Phase 1 static portfolio.

The backend is an enhancement boundary.

Its availability must not become a requirement for accessing the core portfolio.

The backend will be deployed independently from the GitHub Pages frontend.

Its hosting provider remains undecided until the relevant specification and plan evaluate the available options.

## Specifications

| ID | Specification | Intent | Scope Boundary | Depends On | Status |
|---|---|---|---|---|---|
| SPEC-015 | Backend Foundation | Establish the minimum server-side project foundation required for Phase 2 development. | No artificial business features and no infrastructure introduced solely to showcase technologies. | Phase 1 | planned |
| SPEC-016 | Backend Deployment Walking Skeleton | Validate that the backend can be built and deployed independently and reached by the frontend through a minimal server-side capability. | Deployment and connectivity validation only. The hosting provider will be selected during specification planning. | SPEC-015 | planned |
| SPEC-017 | Application API Contract | Define the first application-owned HTTP API boundary and its authoritative OpenAPI contract. | Introduces OpenAPI only for concrete application API requirements. | SPEC-015 | planned |
| SPEC-018 | Frontend–Backend Integration | Connect optional frontend capabilities to the application backend while preserving graceful degradation and static-core independence. | Backend failure must not prevent use of Phase 1 capabilities. | SPEC-016, SPEC-017 | planned |
| SPEC-019 | Intelligent Portfolio Capability | Introduce a useful AI-assisted interaction grounded in the portfolio or public repository information. | Must solve a concrete product use case. No generic chatbot solely for technology demonstration. | SPEC-018 | planned |
| SPEC-020 | MCP Integration | Introduce MCP where the intelligent capability genuinely benefits from controlled access to tools, resources, or repository information. | MCP must not replace ordinary API integration where standard APIs are sufficient. | SPEC-019 | planned |
| SPEC-021 | Dynamic Capabilities Release | Validate and release the selected Phase 2 capabilities while preserving the independent availability of the static portfolio. | Phase 2 release and resilience validation only. | Required Phase 2 specifications | planned |

---

## Deferred or Conditional Capabilities

The following capabilities are intentionally not committed specifications yet:

- OAuth or other authentication;
- administrative UI;
- persistent database storage;
- private portfolio-management capabilities;
- server-side GitHub synchronization;
- additional AI capabilities;
- additional external integrations.

A deferred capability should become a specification only when a concrete product requirement justifies it.

---

## Roadmap Rules

- A phase is a high-level delivery grouping, not a specification.
- Each `SPEC-xxx` roadmap item becomes one independently managed specification.
- Each specification should be small enough to implement and validate without requiring the agent to reason over an unnecessarily large scope.
- Each specification owns its detailed requirements and acceptance criteria.
- Its implementation plan owns technical design and technology-specific decisions.
- Its task file owns the executable implementation breakdown.
- Do not add implementation details to this roadmap.
- Complete prerequisite specifications before dependent specifications unless an explicit parallel-work decision is documented.
- Update specification status as work progresses.
- Once created, link each roadmap entry to its corresponding specification directory.
- Keep specification identifiers stable for traceability.
- If a roadmap item becomes too large, explicitly decompose it into smaller independently specifiable capabilities rather than silently expanding its scope.
- If project direction materially changes, update this roadmap and the affected authoritative documentation before allowing implementation to drift.
