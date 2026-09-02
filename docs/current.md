# Current Project State

## Purpose

This document provides a concise snapshot of the current development state so that a new human or agent session can quickly determine where work should resume.

It is not a changelog, roadmap, specification, or implementation journal.

Detailed and authoritative information belongs in the corresponding project documents.

Keep this file short and current.

---

## Project

**Name:** hmeclazcke-portfolio

**Current phase:** Phase 1 — Static Portfolio

**Active specification:** None — SPEC-002 is complete

**Workflow stage:** Ready for the next approved specification

---

## Current Development Environment

- AI coding agent: OpenAI Codex CLI
- Model: GPT-5.6 Terra
- Reasoning effort: Medium
- IDE: IntelliJ IDEA
- Terminal: PowerShell

---

## Current Objective

Select and approve the next specification before implementation begins.

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

- `frontend/`
  - React + TypeScript + Vite static frontend foundation.
  - npm-managed dependencies, Vitest, React Testing Library, jsdom, ESLint, and Prettier.
  - Independent local development, static build, and local preview without a project backend.

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
- The frontend is a React SPA using TypeScript and Vite, with npm and Node.js 24 LTS as its baseline.

For complete architectural detail, consult `docs/architecture.md`.

---

## Next Step

Select the next approved Phase 1 specification. Do not begin implementation until its specification, plan, and tasks are approved.

---

## Following Milestone

The next planned milestone is:

**SPEC-003 — Portfolio Data Model**

SPEC-002 is complete: its GitHub Actions workflow successfully validated, built, and deployed the static frontend to GitHub Pages at:

`https://hmeclazcke.github.io/hmeclazcke-portfolio/`

The next specification must remain within its approved scope and follow the repository SDD workflow.

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
