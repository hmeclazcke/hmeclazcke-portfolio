# Implementation Plan: Portfolio Data Model

**ID:** SPEC-003  
**Phase:** Phase 1 — Static Portfolio  
**Spec:** `docs/specs/003-portfolio-data-model/spec.md`  
**Status:** Approved

## Summary

Establish repository-owned JSON as the canonical source of portfolio Technologies, Contexts, and Technology–Context Relationships. The implementation will validate that data deterministically with JSON Schema Draft 2020-12 and cross-file semantic checks, then expose it through the existing TypeScript/Vite frontend foundation without copying the technology inventory into React components.

The model remains static, version controlled, and available without a backend or runtime dependency on GitHub. It establishes data and validation only; it does not render or explore a graph.

## Technical Context

### Existing Foundation

SPEC-001 provides a React, TypeScript, Vite, npm, and Node.js 24 LTS frontend foundation with Vitest, ESLint, Prettier, static type checking, and static production builds. SPEC-002 provides the GitHub Pages deployment workflow, where the `build` job runs the frontend quality gates before the production build and artifact upload.

The current frontend is statically buildable and must remain independent of a backend. The Vite build already targets the GitHub Pages project path, so data consumption must be resolved at build time rather than introduced as a runtime network dependency.

### Governing References

This plan follows the project’s recorded primary references for TypeScript, Vite, Vitest, Node.js, and GitHub Actions/Pages in `docs/references.md`. It also aligns the data contracts with JSON Schema Draft 2020-12 and TypeScript’s official JSON-module support.

## Technical Decisions

### TD-001 — Three Root-Level Canonical JSON Files

Store the canonical portfolio dataset in three repository-owned files at the monorepo root:

```text
data/
├── technologies.json
├── contexts.json
└── relationships.json
```

Each file contains the canonical collection for exactly one entity kind. Do not create one file per Technology and do not place canonical portfolio records inside React components.

This structure preserves the domain separation defined by SPEC-003, keeps manual maintenance straightforward, and allows the inventory and relationships to grow without changing UI source.

### TD-002 — Explicit Controlled Contracts

Define one JSON Schema Draft 2020-12 contract for each canonical collection and use schemas to constrain the structural shape and controlled values of records.

Technology records will contain:

- `id`: a stable, non-empty identity;
- `name`: a human-readable, non-empty name;
- `category`: one of `language`, `framework`, `database`, `tool`, `platform`, `protocol`, `methodology`, or `other`; and
- optional `relevance`: `current` or `historical`, only when the portfolio owner has confirmed that classification.

Context records will contain:

- `id`: a stable, non-empty identity;
- `name`: a human-readable, non-empty name; and
- `type`: one of `professional`, `portfolio`, `personal-project`, or `learning`.

Relationship records will contain:

- `id`: a stable, non-empty identity, retained for unambiguous diagnostics and future reference;
- `technologyId`: the identity of a Technology;
- `contextId`: the identity of a Context; and
- `meanings`: a non-empty controlled collection containing one or both of `learned` and `used`.

`meanings` expresses what happened in the association itself. It is deliberately separate from a Technology’s optional global `relevance`: a current or historical Technology may have either or both relationship meanings. Context type supplies where or in what kind of setting the association occurred; it does not restrict whether a Technology was learned, used, or both there.

Represent an association with both applicable meanings in one record, for example `meanings: ["learned", "used"]`. The collection must contain at least one value, allow only the two controlled values, reject duplicate values, and use this canonical order when both are present. There will normally be exactly one canonical Relationship record for a `technologyId`/`contextId` pair; do not create separate records merely to divide `learned` and `used`.

Schemas will reject undeclared record properties so presentation-only metadata and ungoverned fields do not enter canonical data inadvertently.

### TD-003 — JSON Schema Draft 2020-12 with Ajv

Use JSON Schema Draft 2020-12 for deterministic structural validation. Place the repository-owned schemas under:

```text
data/schema/
```

Use Ajv v8 as the only new validation dependency. Ajv is a mature, Node-compatible JSON Schema validator with Draft 2020-12 support, integrates directly with the existing npm toolchain, and avoids introducing a separate application framework or server dependency. No additional format package is needed because this slice does not require format-specific validation.

Structural schema validation alone cannot validate references across three files. A focused validation module will therefore run semantic integrity checks after schema validation.

### TD-004 — Separate Structural and Semantic Integrity Validation

The validation module will:

1. read the three canonical JSON files and their schemas;
2. run Draft 2020-12 structural validation for each collection;
3. verify Technology IDs and Context IDs are unique;
4. verify every Relationship references an existing Technology and Context;
5. reject duplicate Relationships with the same `technologyId` and `contextId`, regardless of their `meanings` values;
6. enforce the canonical `learned`, then `used` ordering when both meanings are present; and
7. report actionable developer-facing errors that identify the failing entity or relationship.

Schema validation enforces controlled values, a non-empty unique meanings collection, required fields, and prohibited extra fields. Semantic validation enforces cross-file references, one association per endpoint pair, and deterministic meaning order. Either kind of failure exits non-zero before production build or deployment.

### TD-005 — Static Frontend Consumption Through Vite

Enable TypeScript JSON-module support in the frontend TypeScript configuration. Add a TypeScript path mapping and matching Vite resolve alias for the root `data/` directory, then add only the minimum Vite development-server filesystem allowance required to read that directory outside `frontend/`.

Create a focused frontend data-access module that statically imports the three canonical JSON files through this alias and exposes them for React consumers. The module is the single frontend boundary for canonical portfolio data; React components will consume it when they need portfolio facts and will not maintain a second technology inventory.

Because Vite bundles JSON imports into the static application, this approach preserves GitHub Pages compatibility and does not use runtime fetches, a backend, or GitHub API access to obtain project-owned portfolio data.

## Data Structure

### Canonical Collections

The three JSON files are canonical collections, not copies derived from frontend source and not presentation configuration. Their records use stable identities as the only cross-file references.

The initial dataset will contain only the portfolio-owner-confirmed facts in SPEC-003:

- Technologies: Java, React, BASIC, Visual Basic, C, Oracle, and Smalltalk.
- Contexts: Unitech and TeraCode (`professional`), UNICEN and IAC (`learning`), hmeclazcke-portfolio and Reactive RAG Document Processor (`portfolio`), and Personal Projects (`personal-project`). IAC is a private computing institute; its confirmed BASIC learning association occurred approximately during the 1990s, with no fuller name or more precise date asserted. These provenance facts remain in the specification only: the canonical IAC record has only `id`, `name`, and `type`, and the approved data contract adds no chronology, description, subtype, education-history, or other metadata field.
- The twelve confirmed Technology–Context Relationships listed in the specification: `used` for Java → Unitech, Java → TeraCode, React → TeraCode, React → hmeclazcke-portfolio, Java → Reactive RAG Document Processor, C → Personal Projects, and BASIC → Personal Projects; and `learned` for C → UNICEN, Java → UNICEN, Oracle → UNICEN, Smalltalk → UNICEN, and BASIC → IAC.

Java and React will carry `current`; BASIC and Visual Basic will carry `historical`. C, Oracle, and Smalltalk will omit `relevance`, because no classification has been confirmed. UNICEN will use `learning` and will not carry degree, date, role, or other education details.

No unconfirmed technologies, relationships, dates, roles, employment history, degrees, graph coordinates, colors, or visualization settings will be introduced.

### Schema Files

The plan anticipates one collection schema per canonical file:

```text
data/schema/
├── technologies.schema.json
├── contexts.schema.json
└── relationships.schema.json
```

Schemas will validate arrays of their corresponding records. Cross-collection rules remain in the semantic validation module, keeping each schema focused on one domain entity while retaining deterministic whole-dataset validation.

## Validation Design

### Validation Command

Add a focused frontend npm command named `validate:data`. It will run a Node-based validation entry point from the frontend tooling area and return a non-zero exit code for any structural or semantic failure.

The validation implementation will be split into a reusable module and a small command entry point so tests can exercise the same validation behavior without invoking a shell process.

### Negative Cases

Validation tests will cover:

- the structurally and semantically valid representative dataset;
- structurally malformed representative data;
- duplicate Technology IDs;
- duplicate Context IDs;
- a Relationship whose `technologyId` is absent;
- a Relationship whose `contextId` is absent;
- duplicate Technology–Context associations regardless of their meanings;
- an empty meanings collection;
- duplicate meanings in one Relationship;
- a non-canonical ordering when both meanings are present; and
- unsupported controlled category, relevance, context type, or relationship meaning values.

Error output will identify the violated rule and the relevant record identity or relationship so maintainers can correct data without inspecting React code.

## Frontend Consumption

The frontend data-access module will be a build-time consumer of the canonical root data. It will not transform the files into a second canonical source or load them through HTTP at runtime.

The Vite alias and TypeScript path mapping will resolve the same root `data/` directory. The Vite development server will explicitly allow access to that one repository-owned directory, rather than broadening filesystem access or copying data into `frontend/`.

This establishes a stable frontend boundary for future features while leaving SPEC-003 free of graph rendering, navigation, visual design, and real portfolio UI.

## Testing Strategy

Follow TDD for the validation behavior:

1. add focused failing validation tests for a valid representative dataset and each required invalid-data case;
2. confirm failures occur for the intended rule before production validation code is added;
3. implement the minimum structural and semantic validation behavior;
4. rerun the tests until they pass; and
5. run the complete frontend quality-gate sequence.

Tests will exercise data behavior and developer-facing validation errors rather than Ajv internals. The representative dataset must pass structural and semantic validation, while each negative fixture must fail for its specific condition.

## Quality-Gate Integration

Add `npm run validate:data` to the frontend command interface and document it as required whenever canonical portfolio data or its validation boundary changes.

Run the complete local sequence from `frontend/`:

```text
npm run format:check
npm run lint
npm run typecheck
npm run validate:data
npm run test:run
npm run build
```

Update the existing `.github/workflows/deploy-pages.yml` build job to run `npm run validate:data` after type checking and before tests/build. Do not create another workflow. A data-validation failure must stop the build job and, through the existing job dependency, prevent Pages deployment.

## Expected Repository Changes

Implementation is expected to add or modify only the following areas as necessary:

```text
data/
├── technologies.json
├── contexts.json
├── relationships.json
└── schema/
    ├── technologies.schema.json
    ├── contexts.schema.json
    └── relationships.schema.json
frontend/
├── package.json
├── package-lock.json
├── tsconfig.app.json
├── vite.config.ts
├── scripts/
│   ├── portfolio-data-validation.mjs
│   └── validate-portfolio-data.mjs
└── src/
    └── data/
        └── portfolio-data.ts
.github/workflows/
└── deploy-pages.yml
```

Focused tests for the validation module will be added in the frontend tooling area. Existing frontend components will not receive embedded portfolio records or graph behavior.

## Documentation Updates

After successful implementation and validation:

- update `docs/architecture.md` with the canonical root-data boundary and static frontend consumption;
- update `docs/quality-gates.md` with `npm run validate:data` and its local/CI role;
- update `docs/references.md` if Ajv or an additional authoritative JSON Schema source materially influences implementation beyond the already recorded references;
- update `docs/roadmap.md` and `docs/current.md` with the actual SPEC-003 lifecycle state; and
- update the root `README.md` only if the completed canonical-data workflow materially affects external developer usage.

## Risks and Mitigations

### Risk — Data drifts into React components

**Mitigation:** Use root canonical JSON files and a single frontend data-access boundary; test and review that no Technology inventory is duplicated in components.

### Risk — Cross-file relationships become invalid

**Mitigation:** Combine per-file JSON Schema validation with semantic checks for IDs, references, and equivalent relationships.

### Risk — Root data cannot be consumed in frontend development

**Mitigation:** Configure only the matching TypeScript path, Vite alias, and narrow Vite filesystem allowance needed for the root `data/` directory, then validate development and production builds.

### Risk — Unconfirmed career facts enter canonical data

**Mitigation:** Seed only the confirmed facts in SPEC-003 and omit unconfirmed relevance, dates, roles, degrees, and relationships.

### Risk — Data validation is skipped before deployment

**Mitigation:** Add the same `validate:data` command to local completion gates and the existing Pages build job before production build.

## Scope Validation

This plan satisfies SPEC-003 without introducing:

- graph rendering or exploration;
- graph libraries, coordinates, or presentation metadata;
- site shell, navigation, final design, or Matrix / Blade Runner styling;
- About Me or detailed employment-history modeling;
- GitHub API access or dynamic repository data;
- backend code, APIs, persistence, authentication, OpenAPI, or MCP; or
- SPEC-004 or later functionality.

## Plan Completion Condition

This plan is ready for task decomposition when:

1. canonical JSON organization and controlled contracts are explicit;
2. structural and cross-file semantic validation responsibilities are explicit;
3. the validation tool, command, tests, and CI integration are explicit;
4. static Vite/TypeScript consumption of root canonical data is explicit;
5. representative data remains limited to confirmed facts; and
6. no unresolved decision requires graph, backend, presentation, or later-spec work.
