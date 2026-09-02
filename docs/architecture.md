# Architecture

## Purpose

This document describes the current high-level architecture of the portfolio and the architectural boundaries that guide its evolution.

It documents the current state and established architectural direction, not the history of past decisions.

Product requirements are defined elsewhere under `docs/`. This document must not duplicate detailed feature specifications.

Architecture should evolve only when a product requirement justifies the change.

---

## Architectural Principles

- Prefer the simplest architecture that satisfies the current product requirements.
- Introduce frameworks, infrastructure, services, protocols, and dependencies only when they solve a concrete problem.
- Keep architectural boundaries explicit.
- Keep project-owned data independent from presentation and framework-specific code.
- Prefer established project patterns over introducing new ones.
- Do not duplicate authoritative documentation across files; reference the appropriate source instead.
- Record the current architectural state rather than maintaining a narrative changelog.
- Significant architectural changes must be explicit and documented before or together with their implementation.
- Avoid speculative abstractions and infrastructure.

---

## Repository Model

The project is organized as a monorepo.

The monorepo does not imply a single deployment unit. Frontend and backend may be built and deployed independently from the same repository.

The intended high-level structure is:

```text
hmeclazcke-portfolio/
├── AGENTS.md
├── README.md
├── docs/
├── frontend/
├── backend/
└── data/
```

Only directories required by implemented or approved specifications should exist.

The presence of a directory in this architectural model does not imply that it must be created immediately.

### Responsibilities

- `docs/`
  - Authoritative project documentation.
  - Product vision.
  - Architecture.
  - Roadmap.
  - Quality rules.
  - Current project state.
  - Feature specifications, plans, and tasks.

- `frontend/`
  - Public portfolio user interface.
  - Interactive visualizations.
  - Browser-side interaction.
  - Presentation of portfolio and externally sourced public information.

- `backend/`
  - Server-side application capabilities, if and when required.
  - Secure external integrations.
  - API boundaries.
  - Operations that cannot or should not execute in the browser.

- `data/`
  - Project-owned structured portfolio information.
  - Independent from frontend component implementation.
  - Version-controlled when appropriate.

Frontend- and backend-specific architectural rules should eventually live in nested `AGENTS.md` files when those modules exist.

---

## System Context

At a high level, the portfolio may interact with project-owned data and external public platforms.

```text
                    ┌───────────────────┐
                    │      Visitor      │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │     Frontend      │
                    │  Portfolio / UI   │
                    └──────┬─────┬──────┘
                           │     │
              project data │     │ public information
                           │     │
                           ▼     ▼
                    ┌─────────┐  ┌─────────┐
                    │  Data   │  │ GitHub  │
                    └─────────┘  └─────────┘

                    Backend capabilities
                    may be introduced later
                    when product requirements
                    require server-side behavior.
```

This diagram represents architectural direction, not necessarily the current implemented state.

---

## Frontend

The frontend is responsible for the public interactive experience.

Expected product responsibilities include:

- Home presentation.
- About Me content and visual identity.
- Interactive technology graph.
- Portfolio project exploration.
- GitHub-related public information.
- Contact and links to external profiles.
- Presentation of how the portfolio itself was engineered.

The frontend technology is not yet finalized.

A React-based solution is expected to be evaluated.

The choice between a client-side React application and a framework such as Next.js must be based on actual requirements such as rendering strategy, routing, deployment, SEO, and server-side capabilities rather than preference alone.

No frontend framework decision should be considered final until documented through the relevant specification and plan.

---

## Portfolio Data

Project-owned portfolio information must be modeled separately from UI components.

Expected concepts include:

- technologies;
- companies or professional contexts;
- portfolio projects;
- learning contexts;
- relationships between technologies and contexts;
- technology categories;
- technology lifecycle or usage status.

The central relationship model is conceptually:

```text
Technology <-> Professional Context
Technology <-> Portfolio Project
Technology <-> Learning Context
```

A technology may participate in multiple contexts.

For example:

```text
Java
 ├── Unitech
 ├── TeraCode
 └── Portfolio Projects

React
 ├── TeraCode
 └── Portfolio Projects

BASIC
 └── Historical Learning Context
```

The model must allow the application to distinguish concepts such as:

- learned;
- used professionally;
- used in portfolio projects;
- historical;
- currently active.

These distinctions must be represented as data rather than inferred only from visual presentation.

The exact schema and storage format remain undecided.

A simple version-controlled structured representation should be preferred initially if it satisfies the approved requirements.

Persistence infrastructure must not be introduced until the product requires it.

---

## Technology Graph

The interactive technology graph is a core product capability.

The graph should be generated from structured portfolio data rather than hard-coded visual relationships.

The graph must be able to run entirely in the browser using project-owned structured data. It must not require backend capabilities to display or navigate the portfolio's technical history.

Graph nodes may represent concepts such as:

- technologies;
- companies or professional contexts;
- portfolio projects;
- learning contexts.

Edges represent meaningful relationships between those concepts.

The visualization layer must remain separate from the underlying relationship data so that changing the graph library does not require redesigning the portfolio data model.

The specific graph visualization library is not yet selected.

---

## Static Core and Dynamic Enhancements

The core public portfolio is a static-capable frontend experience. It includes the Home and About Me experience, personal visual identity, interactive technology graph, project-owned structured technology and relationship data, company, learning-context, and portfolio-project relationships, base portfolio project information, contact and external-profile links, and public information about how the portfolio was built.

Dynamic or server-side capabilities are optional enhancements to this core, not prerequisites for its use. Examples include backend APIs, AI/LLM functionality, MCP-based capabilities, authentication or administration, and server-side integrations.

The frontend must degrade gracefully when an optional capability is loading or temporarily unavailable. The static portfolio must remain usable, and optional capabilities may expose loading, retry, unavailable, or degraded states without causing the overall site to fail.

---

## External Integrations

External systems must be treated as external boundaries rather than as part of the internal portfolio model.

### GitHub

GitHub is expected to be an external source of public development information.

Where standard GitHub APIs satisfy the requirement, they should be preferred.

Possible information includes:

- public repositories;
- repository metadata;
- languages;
- links to source code;
- other public development information when useful to the product.

GitHub-derived information and project-owned portfolio information are different data sources and should remain conceptually distinct.

The application should not duplicate GitHub data unnecessarily when it can obtain appropriate public information directly.

### LinkedIn

LinkedIn remains the primary external destination for detailed professional experience.

The portfolio should link to LinkedIn rather than duplicate a traditional résumé or full employment history.

Automatic LinkedIn synchronization is not currently a requirement.

---

## Backend Boundary

A backend is not required by default and must not be a dependency of the core public portfolio.

It should be introduced only when a specification establishes a real server-side responsibility.

Examples include:

- protecting credentials or secrets;
- authenticated administration;
- server-side external API integration;
- persistent application state;
- controlled aggregation or transformation of external data;
- intelligent or agent-based capabilities;
- functionality that cannot safely execute in the browser.

If a backend is introduced, frontend and backend must remain separate architectural boundaries. Backend capabilities enhance the static core and must not prevent its operation when unavailable.

Backend business rules should not depend directly on framework or infrastructure details.

For sufficiently complex backend behavior, Clean Architecture / Hexagonal Architecture principles should guide dependency direction and separation of concerns.

Detailed Java/Spring conventions belong in `backend/AGENTS.md`, not in this document.

---

## API Boundary

If the portfolio introduces its own HTTP API, the API becomes an explicit architectural boundary between consumers and server-side capabilities.

The API contract should be documented using a standard machine-readable format.

OpenAPI is the intended candidate for this responsibility.

Where appropriate, the preferred direction is:

```text
Product requirement
        ↓
API contract
        ↓
Server implementation
        ↓
Client integration
```

Generated artifacts may later be used when they provide clear value, for example generating typed frontend API clients from an authoritative API contract.

Generated artifacts must always have a clearly defined source and must not become an independently edited source of truth.

OpenAPI should not be introduced before an application-owned API boundary actually exists.

---

## MCP Boundary

MCP is not a replacement for ordinary application APIs.

It should be introduced only when an AI agent or model needs controlled access to tools, resources, or external systems.

A potential future use case is an intelligent portfolio capability capable of inspecting or reasoning about public GitHub repositories through MCP-enabled tooling.

Until such a product capability is specified, MCP remains an architectural direction rather than an implemented dependency.

---

## Deployment

Deployment should initially favor the simplest solution compatible with the product.

Preferred characteristics are:

- free hosting suitable for a personal portfolio;
- no injected advertising;
- HTTPS;
- GitHub integration;
- automated deployment;
- minimal operational maintenance.

The Phase 1 frontend will be deployed statically to GitHub Pages. It must remain statically deployable and must not require the project backend to serve its core content.

Phase 1 deployment will use GitHub Actions to build the frontend, produce the static deployment artifact, and deploy that artifact to GitHub Pages.

Frontend and backend may be built and deployed independently. Any future backend must be deployed separately from GitHub Pages, which hosts the static frontend only. Server-side infrastructure should only be deployed once a feature genuinely requires server-side execution.

The future backend hosting provider remains undecided. Detailed GitHub Actions workflow configuration, frontend base-path and routing configuration, and build commands belong in the relevant specification and plan.

---

## Documentation and Architecture Evolution

The documentation under `docs/` is the authoritative project knowledge base.

This file owns high-level architectural structure and boundaries.

Detailed requirements belong in specifications and must not be duplicated here.

When an approved specification requires an architectural change:

1. identify the architectural impact;
2. evaluate the relevant alternatives and trade-offs;
3. make the decision explicitly;
4. update the authoritative architecture documentation;
5. implement the approved design;
6. verify that the resulting implementation matches the documented architecture.

If a future architectural decision requires substantial reasoning or long-term justification, a dedicated Architecture Decision Record (ADR) may be introduced rather than expanding this document indefinitely.

---

## Current Architectural Decisions

The following decisions are currently established:

- The project is a monorepo.
- The monorepo does not imply a single deployment unit; frontend and backend may be built and deployed independently.
- Project documentation is maintained under `docs/`.
- Portfolio-owned structured data is kept conceptually separate from presentation code.
- The technology graph is driven by structured relationship data.
- The core public portfolio, including its technology graph, must remain usable without a backend.
- Dynamic and server-side capabilities are optional enhancements to the static core.
- The frontend must degrade gracefully when an optional dynamic capability is unavailable.
- The Phase 1 frontend will be deployed statically to GitHub Pages through GitHub Actions.
- The Phase 1 frontend must not require the project backend to serve core content.
- Any future backend will be deployed separately from GitHub Pages.
- GitHub is treated as an external public data source.
- LinkedIn remains the destination for detailed professional experience.
- A backend will only be introduced when justified by product requirements.
- A backend will be introduced in Phase 2 for justified dynamic and server-side capabilities, while remaining optional for the operation of the Phase 1 static portfolio.
- OpenAPI will only be introduced when an application-owned API boundary exists.
- MCP will only be introduced for a genuine agent/tool integration use case.
- Infrastructure must not be introduced solely to showcase a technology.

---

## Open Architectural Decisions

The following decisions intentionally remain unresolved:

- React SPA vs Next.js or another React-based architecture.
- Graph visualization library.
- Exact portfolio data schema and file format.
- GitHub integration strategy and caching requirements.
- Exact backend capabilities and scope.
- Backend language, framework, and module structure.
- Authentication and authorization requirements.
- Persistence requirements.
- OpenAPI tooling and code-generation strategy.
- MCP use case and implementation.
- Future backend CI/CD implementation.
- Future backend hosting provider.
