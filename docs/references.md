# Project References

## Purpose

This document records external standards, official documentation, reference implementations, and community material used to inform the project's engineering practices and technical decisions.

Its purpose is traceability.

It allows a human or AI agent to understand where project conventions and recommendations originated without turning external guidance into implicit project requirements.

Project decisions remain authoritative only when they are explicitly recorded in the project's own documentation.

---

## Reference Policy

External references are classified by authority.

### Primary / Authoritative Sources

Official specifications, product documentation, standards, or documentation maintained by the organization responsible for the technology.

These should normally be preferred when validating technical behavior or current recommended usage.

### Reference Implementations

Real-world projects, repositories, or engineering examples used to study practical organization and implementation patterns.

Their decisions are examples, not project requirements.

### Community Guidance

High-quality articles, tutorials, or practitioner guidance used for additional perspective.

These sources may inform discussion but must not override primary documentation or established project decisions.

---

## Decision Rule

A reference does not automatically become a project requirement.

When evaluating external guidance:

1. Prefer primary and authoritative sources.
2. Compare guidance with the actual needs of this project.
3. Consider reference implementations as examples rather than templates to copy blindly.
4. Record accepted project decisions in the appropriate authoritative project document.
5. Do not silently change project architecture or requirements because an external source recommends a different approach.
6. If an external source conflicts with current project documentation, report the conflict before changing implementation.

---

# Agent Instructions and Agent-Oriented Development

## AGENTS.md Open Format

**Classification:** Primary / ecosystem standard

**Source:** AGENTS.md — open format for coding-agent instructions  
**Domain:** agents.md

**Used for:**

- root `AGENTS.md`;
- nested module-specific `AGENTS.md` files;
- separation between human-facing README content and agent-specific instructions;
- predictable repository instructions for coding agents.

**Project interpretation:**

`AGENTS.md` provides persistent instructions for agents but should not become the repository's complete documentation system.

---

## OpenAI — Harness Engineering

**Classification:** Primary engineering guidance

**Source:** OpenAI — Harness engineering: leveraging Codex in an agent-first world  
**Domain:** openai.com

**Used for:**

- keeping `AGENTS.md` concise;
- using structured repository documentation as a system of record;
- using `AGENTS.md` primarily as a map to deeper documentation;
- avoiding monolithic instruction files that become stale;
- maintaining durable project knowledge outside transient agent conversations.

**Project interpretation:**

The project maintains detailed knowledge under `docs/` while keeping agent instructions focused and navigable.

---

# Spec-Driven Development

## GitHub Spec Kit

**Classification:** Primary reference implementation and methodology documentation

**Source:** GitHub Spec Kit  
**Domain:** github.com/github/spec-kit and github.github.com/spec-kit

**Used for:**

- Spec-Driven Development concepts;
- separation between specification, implementation plan, tasks, and implementation;
- roadmap decomposition;
- independently specifiable slices;
- stable specification identifiers;
- user stories and acceptance criteria;
- cross-artifact consistency concepts.

**Core workflow studied:**

```text
Spec
  ↓
Plan
  ↓
Tasks
  ↓
Implement
  ↓
Validate / Converge
```

**Project interpretation:**

This project practices SDD manually rather than installing Spec Kit.

Spec Kit is used as a methodological and structural reference, not as project tooling.

---

## GitHub Spec Kit — Spec of Specs

**Classification:** Primary methodology reference

**Source:** GitHub Spec Kit — Spec of Specs  
**Domain:** github.github.com/spec-kit

**Used for:**

- decomposing large project phases into smaller specs;
- roadmap structure;
- keeping each spec independently understandable and implementable;
- stable identifiers for traceability.

**Project interpretation:**

Project phases are high-level delivery groupings.

Each `SPEC-xxx` entry is an independent specification with its own:

```text
spec.md
plan.md
tasks.md
```

---

## GitHub Spec Kit Templates

**Classification:** Primary methodology reference

**Source:** GitHub Spec Kit specification, plan, and task templates  
**Domain:** github.com/github/spec-kit

**Used for:**

- specification structure;
- user stories;
- functional requirement identifiers;
- measurable success criteria;
- technical-context sections in implementation plans;
- dependency-aware task decomposition.

The templates are adapted to this project's needs rather than copied mechanically.

---

# Repository and Agent Reference Implementations

## Hephaestus

**Classification:** Reference implementation

**Source:** Hephaestus  
**Organization:** Technical University of Munich ecosystem  
**Domain:** github.com/ls1intum/Hephaestus

**Relevant characteristics:**

- monorepo;
- Java / Spring Boot backend;
- React frontend;
- OpenAPI;
- hierarchical `AGENTS.md`;
- frontend- and backend-specific agent instructions;
- quality gates;
- generated artifacts;
- CI workflows;
- architecture documentation;
- Architecture Decision Records.

**Patterns studied for this project:**

- root vs module-specific agent instructions;
- monorepo governance;
- explicit quality-gate commands;
- Git safety rules for agents;
- frontend/backend responsibility separation;
- keeping generated artifacts tied to authoritative sources.

**Project interpretation:**

Hephaestus is a practical reference, not a template to reproduce.

Technology or architecture used by Hephaestus must not be introduced into this portfolio unless justified independently.

---

## OpenAI / Vercel React Best Practices for Agents

**Classification:** Reference implementation / engineering guidance

**Source:** React Best Practices skill in OpenAI's plugin repository, based on Vercel Engineering guidance  
**Domain:** github.com/openai/plugins

**Potential future use:**

- `frontend/AGENTS.md`;
- React implementation reviews;
- React performance guidance;
- avoiding unnecessary rendering and data-fetching problems;
- bundle-size awareness;
- agent-oriented React quality reviews.

**Project interpretation:**

These guidelines should be evaluated when frontend implementation becomes substantial.

They must not be copied wholesale into the project instructions.

Only relevant rules should become project rules.

---

# Frontend Foundation

## React Documentation

**Classification:** Primary

**Source:** React official documentation  
**Domain:** react.dev

**Used for:**

- React application architecture;
- evaluation of framework vs from-scratch React approaches;
- React application development guidance.

**Relevant project decision:**

Phase 1 currently plans a client-side React application because the static portfolio does not require server-side React capabilities.

This remains a project decision rather than a general claim that SPA architecture is preferable for React applications.

---

## TypeScript Documentation

**Classification:** Primary

**Source:** TypeScript Handbook  
**Domain:** typescriptlang.org

**Used for:**

- TypeScript language behavior;
- static type checking;
- frontend type-safety decisions.

**Project interpretation:**

TypeScript is used as a static type-checking layer for frontend JavaScript development.

---

## JSON Schema Draft 2020-12

**Classification:** Primary standard

**Source:** JSON Schema Draft 2020-12 specification
**Domain:** json-schema.org

**Used for:**

- structural contracts for canonical portfolio JSON collections;
- controlled canonical data values and prohibited undeclared fields.

---

## Ajv

**Classification:** Primary project documentation

**Source:** Ajv documentation
**Domain:** ajv.js.org

**Used for:**

- Node-based Draft 2020-12 validation of canonical portfolio data.

---

## Vite Documentation

**Classification:** Primary

**Source:** Vite official documentation  
**Domain:** vite.dev

**Used for:**

- frontend development server;
- React frontend build tooling;
- production static artifacts;
- local production preview;
- GitHub Pages deployment considerations;
- repository base-path configuration.

**Relevant project characteristics:**

- Vite production builds produce a static artifact.
- Static output can be deployed to GitHub Pages.
- GitHub Pages project sites require repository-path-aware configuration.

Detailed deployment configuration belongs to SPEC-002.

---

## Vitest Documentation

**Classification:** Primary

**Source:** Vitest official documentation  
**Domain:** vitest.dev

**Used for:**

- frontend automated tests;
- Vite-native test execution;
- repeatable frontend test quality gates.

---

## Testing Library

**Classification:** Primary project documentation

**Source:** React Testing Library documentation  
**Domain:** testing-library.com

**Used for:**

- behavior-oriented component testing;
- testing observable UI behavior;
- avoiding unnecessary coupling between tests and React implementation details.

**Guiding principle adopted conceptually:**

Tests should resemble how users interact with the software whenever practical.

---

## ESLint

**Classification:** Primary

**Source:** ESLint official documentation  
**Domain:** eslint.org

**Used for:**

- JavaScript and TypeScript linting;
- static source validation;
- frontend quality gates.

Linting and formatting remain separate responsibilities.

---

## Prettier

**Classification:** Primary

**Source:** Prettier official documentation  
**Domain:** prettier.io

**Used for:**

- deterministic source formatting;
- non-mutating formatting validation in quality gates and CI.

---

## Node.js

**Classification:** Primary

**Source:** Node.js official release documentation  
**Domain:** nodejs.org

**Used for:**

- selecting supported Node.js runtime baselines;
- verifying LTS status.

The current SPEC-001 plan uses Node.js 24 LTS as its development baseline.

---

## Fontsource Variable Fonts

**Classification:** Primary project documentation
**Source:** Fontsource Variable Fonts documentation
**Domain:** fontsource.org

**Used for:**

- self-hosting the Space Grotesk Variable and JetBrains Mono Variable font assets through npm;
- selecting a normal weight-axis Latin subset; and
- retaining local system-font fallbacks without a runtime font CDN.

---

## Primer Design Tokens

**Classification:** Reference design-system documentation
**Source:** GitHub Primer color usage documentation
**Domain:** primer.style

**Used for:**

- distinguishing raw values from functional semantic visual roles; and
- keeping component-specific visual tokens minimal.

Primer is a reference only; Primer packages are not a project dependency.

---

## Carbon Color Tokens

**Classification:** Reference design-system documentation
**Source:** Carbon Design System color overview
**Domain:** carbondesignsystem.com

**Used for:**

- applying role-based color tokens to a dark layered-surface foundation.

Carbon is a reference only; Carbon packages are not a project dependency.

---

# Accessibility and Web Quality

## WCAG 2.2

**Classification:** Primary standard

**Source:** W3C Web Content Accessibility Guidelines 2.2  
**Domain:** w3.org

**Potential use:**

- accessibility acceptance criteria;
- keyboard navigation;
- focus behavior;
- perceivable and operable interactions;
- future accessibility quality gates.

**Project interpretation:**

Accessibility requirements should be introduced and validated through the relevant frontend specifications rather than treated as an afterthought during final polishing.

---

## MDN `prefers-reduced-motion`

**Classification:** Primary web-platform documentation
**Source:** MDN Web Docs
**Domain:** developer.mozilla.org

**Used for:**

- CSS handling that substantially reduces non-essential motion when a user requests it.

---

## axe-core

**Classification:** Primary project documentation
**Source:** Deque axe-core documentation
**Domain:** github.com/dequelabs/axe-core

**Used for:**

- focused automated accessibility checks in the existing Vitest and jsdom environment; and
- documenting that jsdom cannot reliably evaluate axe-core's `color-contrast` rule.

---

# Deployment and CI/CD

## GitHub Pages

**Classification:** Primary

**Source:** GitHub Pages official documentation  
**Domain:** docs.github.com

**Used for:**

- Phase 1 static hosting;
- HTTPS public deployment;
- GitHub Pages publishing model.

---

## GitHub Actions for GitHub Pages

**Classification:** Primary

**Source:** GitHub official documentation for custom GitHub Pages workflows  
**Domain:** docs.github.com

**Used for:**

- Phase 1 automated deployment;
- build and deployment separation;
- Pages artifact upload;
- Pages deployment workflow.

Detailed workflow implementation belongs to SPEC-002.

---

# Architecture Documentation

## C4 Model

**Classification:** Primary documentation from the model's creator

**Source:** C4 model for visualising software architecture  
**Domain:** c4model.com

**Potential use:**

- system-context diagrams;
- container diagrams;
- deployment diagrams;
- communicating architecture at different levels of abstraction.

**Project interpretation:**

Use only the diagram levels that materially improve architectural understanding.

The project is not required to produce every C4 diagram.

---

# Future Backend and API References

These references are recorded now because they correspond to planned Phase 2 directions.

They do not represent implemented Phase 1 dependencies.

## OpenAPI Specification

**Classification:** Primary standard

**Source:** OpenAPI Specification  
**Domain:** spec.openapis.org

**Potential use:**

- application-owned HTTP API contracts;
- machine-readable API definitions;
- contract-first API development;
- possible generated API clients.

OpenAPI should only become an active project dependency when an application-owned API boundary exists.

---

## Model Context Protocol

**Classification:** Primary specification

**Source:** Model Context Protocol specification  
**Domain:** modelcontextprotocol.io

**Potential use:**

- controlled agent access to tools and resources;
- repository-aware intelligent portfolio capabilities;
- future MCP client/server architecture.

MCP must not be used as a replacement for ordinary API integration when a standard API is sufficient.

---

## Spring Boot Documentation

**Classification:** Primary

**Source:** Spring Boot reference documentation  
**Domain:** docs.spring.io

**Potential future use:**

- Phase 2 backend implementation;
- Spring application architecture;
- backend testing;
- integration testing.

Exact backend technology decisions remain subject to the relevant Phase 2 specifications.

---

# Community Guidance

## Kirill Markin — Codex Rules

**Classification:** Community guidance

**Source:** Kirill Markin — Codex rules for AI development  
**Domain:** kirill-markin.com

**Ideas studied:**

- keeping agent instructions explicit;
- minimizing unnecessary changes;
- avoiding speculative abstractions;
- DRY / KISS / YAGNI-oriented guidance;
- strong typing;
- explicit error handling;
- testing discipline.

**Project interpretation:**

Useful ideas are evaluated individually.

Recommendations are not copied automatically, particularly when they conflict with this project's architecture, language, or engineering goals.

---

# Technology Graph Visualization

## SVG and Keyboard Accessibility

**Classification:** Primary standards and guidance

**Sources:** W3C SVG Accessibility and WAI-ARIA Graphics Module; MDN Keyboard Accessible guidance
**Domains:** w3.org; developer.mozilla.org

**Used for:**

- requiring accessible names, visible focus, and semantic alternatives for graph visuals;
- ensuring interactive graph controls remain keyboard operable;
- recognizing that SVG/canvas rendering alone does not provide equivalent structured understanding.

## Browser Graph Visualization Candidates

**Classification:** Official library documentation

**Sources:** Cytoscape.js, D3 force simulation, React Flow accessibility documentation
**Domains:** js.cytoscape.org; d3js.org; reactflow.dev

**Used for:**

- evaluating stable layout, performance, motion, and accessibility constraints for SPEC-007 planning;
- preserving the separation between canonical graph facts and a replaceable visualization implementation.

**Project interpretation:**

These sources inform realistic requirements only. SPEC-007 does not select or add a graph library; that decision belongs in an approved implementation plan.

# Maintenance Rules

- Add a reference when it materially influences project governance, architecture, implementation practices, or a specification.
- Prefer primary sources whenever available.
- Avoid turning this file into a generic collection of programming links.
- Remove or replace obsolete references when they no longer represent the technology or practice being used.
- Do not change project decisions merely because a referenced source changes.
- When guidance changes materially, evaluate its impact before updating authoritative project documentation.
- Reference implementations and community sources must never silently override primary sources or explicit project decisions.
