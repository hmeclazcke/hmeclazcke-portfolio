# Current Project State

## Purpose

This document provides a concise snapshot of the current development state so that a new human or agent session can quickly determine where work should resume.

It is not a changelog, roadmap, specification, or implementation journal.

Detailed and authoritative information belongs in the corresponding project documents.

Keep this file short and current.

---

## Project

**Name:** hmeclazcke-portfolio

**Current phase:** Pre-Development Foundation

**Active specification:** None

**Workflow stage:** Project documentation and SDD foundation

---

## Current Objective

Complete the initial project documentation and development governance required before starting implementation.

The next major milestone is to begin Phase 1 — Static Portfolio.

---

## Completed Foundation

The following project-level artifacts have been established:

- `AGENTS.md`
  - Defines permanent working rules for AI agents.
  - Establishes SDD, TDD, change discipline, Git safety, documentation rules, and README maintenance.

- `docs/vision.md`
  - Defines the product vision and intended user experience.

- `docs/architecture.md`
  - Defines the current high-level architecture and architectural boundaries.
  - Establishes the static-core / dynamic-enhancement model.
  - Establishes GitHub Pages and GitHub Actions as the Phase 1 frontend deployment model.

- `docs/roadmap.md`
  - Defines the major delivery phases and ordered specifications.

- `docs/quality-gates.md`
  - Defines project-wide completion and validation requirements.

---

## Current Architectural Direction

The following decisions are already established and should not be re-decided without an explicit architectural change:

- The repository is a monorepo.
- Phase 1 delivers a complete static portfolio.
- The Phase 1 frontend will be deployed to GitHub Pages through GitHub Actions.
- The core portfolio must remain usable without backend availability.
- The technology graph must operate from project-owned structured data without requiring the backend.
- Frontend and future backend components may be deployed independently.
- Phase 2 introduces backend and dynamic capabilities.
- GitHub is an external public data source.
- LinkedIn remains the destination for detailed professional experience.
- OpenAPI will be introduced only when an application-owned API boundary exists.
- MCP will be introduced only for a justified agent/tool integration use case.

For complete architectural detail, consult `docs/architecture.md`.

---

## Next Step

Create and refine:

**SPEC-001 — Project Foundation**

Expected artifacts:

```text
docs/specs/
└── 001-project-foundation/
    ├── spec.md
    ├── plan.md
    └── tasks.md
```

The specification must be defined before implementation begins.

---

## Following Milestone

After SPEC-001 is completed, proceed to:

**SPEC-002 — Hello World Deployment**

Its purpose is to validate the complete delivery path with a minimal public page containing:

- `Hello, world!`
- Lorem Ipsum content

The milestone must validate the frontend build, GitHub Actions workflow, and GitHub Pages deployment before real portfolio features are built.

---

## Pending Product Design Work

The detailed visual identity has not yet been specified.

Current direction includes:

- predominantly dark visual identity;
- inspiration from late-20th-century cyberpunk aesthetics such as *The Matrix* and *Blade Runner*;
- a contemporary interface rather than a retro website recreation;
- modern controls and interaction patterns;
- integration of the technology graph into the overall visual language;
- use of personal photographic material in the About Me experience.

These are preliminary design inputs, not yet an approved design specification or design system.

They should be refined during the appropriate Phase 1 specification rather than implemented directly from this document.

---

## Session Resume Rule

When resuming work:

1. Read the root `AGENTS.md`.
2. Read this file.
3. Read the documentation relevant to the active specification.
4. If an active specification exists, continue from its recorded workflow stage.
5. Do not start a different specification unless the current work has been completed, deferred, or explicitly reprioritized.

Update this document whenever the active specification, workflow stage, current objective, or immediate next step materially changes.
