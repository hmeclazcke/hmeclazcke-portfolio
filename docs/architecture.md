# Architecture

## Purpose

This document describes the implemented architecture of the completed static portfolio. Detailed feature requirements and their historical decisions remain in `docs/specs/`.

## Architectural Principles

- Keep the implementation static, simple, and independently deployable.
- Keep portfolio-owned data independent from React components and visualization code.
- Derive technology relationships from canonical data rather than hardcoding them in the UI.
- Use local static assets and explicit build-time boundaries.
- Avoid infrastructure or dependencies without a concrete product need.

## Repository Model

```text
hmeclazcke-portfolio/
├── AGENTS.md
├── README.md
├── data/
├── docs/
├── frontend/
└── .github/
```

- `data/` holds canonical portfolio JSON and JSON Schemas.
- `docs/` holds authoritative product documentation and the historical SDD record.
- `frontend/` contains the React application and its validation tooling.
- `.github/` contains the GitHub Pages workflow.

## Static Application

The public application is a React single-page application written in TypeScript and built with Vite. It uses native CSS, CSS Modules, semantic design tokens, and locally bundled Space Grotesk and JetBrains Mono variable fonts. It has no runtime backend, API, GitHub data request, database, or third-party font dependency.

The site shell provides semantic header, main, and footer regions. The footer owns the final Contact destination. Floating major-section navigation operates above page content and follows the completed sequence Home → Story → Technology Graph → Contact.

## Canonical Portfolio Data

The canonical source is version-controlled JSON:

- `data/technologies.json`
- `data/contexts.json`
- `data/relationships.json`
- `data/schema/`

The model represents technologies, professional/learning/portfolio contexts, and `learned` or `used` relationships. Context metadata can distinguish historical evidence from contexts eligible to generate visible graph edges.

JSON Schema validation uses Ajv, followed by cross-file checks for stable identities, valid references, duplicate associations, and relationship semantics. `frontend/src/data/portfolio-data.ts` statically adapts this data for the UI at build time. The deployed application therefore has no runtime dependency for canonical portfolio facts.

## Story and Technology Graph

Story is a responsive chronology: its desktop presentation uses the approved sticky progression, while narrow viewports retain natural document flow.

The Technology Graph uses a bounded D3 force simulation in the browser. Visible nodes are technologies only. Context-derived edge projection, invisible family metadata, shared-context explanations, keyboard-accessible node interaction, and the narrow-screen family explorer are all derived from the canonical data boundary. The graph does not treat an edge as a technical dependency.

## Static Assets and Deployment

Local story, contact, favicon, and Fontsource assets are built or copied into the Vite static artifact. Vite is configured with the GitHub Pages project base `/hmeclazcke-portfolio/`; asset references are base-safe in development and production.

`.github/workflows/deploy-pages.yml` runs from `frontend/` and performs dependency installation, formatting, linting, TypeScript checking, canonical-data validation, tests, and the Vite production build. It uploads `frontend/dist/` and deploys that artifact to GitHub Pages.

## Quality Boundaries

The frontend test suite covers observable behavior and focused accessibility checks. Production builds and canonical-data validation are required quality gates. Owner browser review remains the authority for visual composition, rendered contrast, and interaction details that jsdom cannot prove.

## Final Architectural State

The implemented architecture is a complete static portfolio. No backend, API, OpenAPI, MCP, runtime GitHub integration, database, or additional product phase is committed.
