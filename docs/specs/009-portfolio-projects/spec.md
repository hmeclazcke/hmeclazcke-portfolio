# Feature Specification: Portfolio Projects

**ID:** SPEC-009
**Phase:** Phase 1 - Static Portfolio
**Status:** Archived - not part of final product scope
**Depends on:** SPEC-003 - Portfolio Data Model; SPEC-004 - Site Shell and Visual Foundation
**Relevant constraints:** SPEC-006 - About Me; SPEC-007 - Technology Graph
**Historical boundaries:** SPEC-008 - Technology Graph Exploration; SPEC-010 - Public GitHub Integration

> **Final-scope note:** This preserved specification records a historical proposal. It is not an active or scheduled product commitment in the completed static portfolio.

## Overview

Define the public Portfolio Projects capability for selected personal and portfolio projects. It gives recruiters, hiring managers, and technical reviewers concrete, owner-confirmed evidence of the work represented by the portfolio without turning the site into a detailed employment history, traditional CV, or live repository dashboard.

This specification defines product behavior and canonical-data responsibilities only. It does not choose visual layout, routes, components, libraries, or implementation structure.

## User Value

Visitors can understand, for each selected project:

- the problem or idea it explores;
- what it does at a concise public level;
- its important technical characteristics;
- which technologies have canonical evidence in that project context;
- which owner-confirmed engineering concerns it demonstrates; and
- where a relevant public source repository can be found when one is available.

The section provides useful technical evidence without inferring proficiency, business impact, production use, employment responsibilities, or achievements from a technology mention or repository alone.

## Core User Scenarios

### US-001 - Discover selected project evidence

As a recruiter or hiring manager, I want to discover selected projects and understand their purpose and technical relevance so that I can assess concrete evidence beyond a technology list.

**Acceptance criteria:**

1. A visitor can identify each selected project's public name, concise purpose, and what it does.
2. A visitor can understand the owner-confirmed technical characteristics and engineering concerns represented by the project without reading a detailed CV or employment chronology.
3. The section presents only selected, owner-confirmed project facts; it does not imply that every repository or historical context is a public project entry.

### US-002 - Understand technology evidence in context

As a technical reviewer, I want to see which technologies have evidence in a project and whether they were used or learned there so that I can distinguish contextual use from a mere name mention.

**Acceptance criteria:**

1. Project technology evidence derives from valid canonical Technology-Context Relationships associated with that project context.
2. The presentation preserves the canonical `used` and `learned` meanings where they are relevant; it does not infer professional use, expertise, or dependency from project membership.
3. The same technology fact is not maintained as an independent project-local inventory in presentation code.

### US-003 - Find a public source reference when available

As a visitor, I want to follow a relevant public source-repository reference when one is provided so that I can inspect the source independently.

**Acceptance criteria:**

1. A valid approved repository reference is clearly identified as an external destination.
2. A project without a public repository remains understandable and complete enough for its approved public information.
3. No live GitHub data is required to render or understand a project.

### US-004 - Maintain project facts safely

As the portfolio owner, I want selected-project facts and references to remain canonical and validated so that updates do not require duplicating facts in UI components or produce misleading public evidence.

**Acceptance criteria:**

1. Adding or updating an approved selected project or its approved public facts is a canonical-data maintenance activity, not a UI inventory change.
2. Invalid references between a selected project, its context, technologies, or repository references are detected before production use.
3. Optional absence is represented honestly without fabricated placeholders or claims.

## Project Selection Principles

The public portfolio includes selected projects, not an arbitrary quantity target or a complete catalog of repositories, experiments, or employment work.

A project is suitable for selection when owner-confirmed information can provide meaningful evidence of one or more of the following:

- engineering capability or technical depth;
- architectural thinking or relevant engineering concerns;
- meaningful use or exploration of canonical technologies;
- learning or experimentation with a clear technical purpose; or
- relevance to the portfolio's public technical positioning without describing employers or employment work.

Selection must also respect public-presentability: the project must have enough approved information to be understandable without disclosing private, client, employer, or unsupported details. Repository availability is not a prerequisite for selection.

The final selected project list is intentionally not chosen by this specification. Selection is editorial owner judgment against these principles, not an automated score or a project-status field.

## Domain Concepts and Fact Ownership

### Existing canonical concepts

SPEC-003 remains authoritative for Technology, Context, and Technology-Context Relationship facts. A project eligible for public presentation must correspond to one existing canonical Context with a project context type (`portfolio` or `personal-project`). Its stable Context identity is the canonical identity used to associate project presentation facts and technology evidence.

Technology evidence belongs to existing Technology-Context Relationships:

- a Technology identifies the technology;
- the project Context identifies the setting;
- the relationship's `used` and/or `learned` meanings identify what occurred there.

SPEC-009 must reuse those relationships. It must not create a parallel per-project technology list, duplicate relationship meanings, or add technology-to-technology relationships.

### Project detail

The existing Context model correctly owns a project's stable identity, public display name, and context type, but it is intentionally a concise record of the setting in which technologies were used or learned. It does not own the project's public purpose, behavioral summary, engineering-concern statements, or repository references.

SPEC-009 therefore requires one optional canonical Project Detail associated one-to-one with an existing project Context. A Project Detail has no independent project identity: its identity is the stable Context ID. A project Context without a Project Detail remains valid canonical history but is not a selected public project entry. A Project Detail is the canonical selection record for this feature.

For every selected project, its Project Detail must provide:

- a concise purpose statement: the problem, question, or idea the project addresses;
- a concise summary: what the project does at a public functional level; and
- technology evidence through existing canonical Technology-Context Relationships for the same Context.

An owner-confirmed technical characteristic is a concrete relevant property of the project. An owner-confirmed demonstrated engineering concern is a concise statement of a technical concern the project addresses or explores. Neither is a Technology, a `used`/`learned` relationship meaning, a proficiency claim, an achievement, or an inferred outcome. Both are optional when their absence does not make the selected project misleading or incomprehensible.

Repository references belong to the Project Detail. No project lifecycle/status, ordering, prominence, metrics, achievements, roles, dates, generic public links, or repository analytics are required unless a later approved requirement justifies them.

### Repository references

A repository reference is an optional owner-confirmed canonical reference to a public source destination. It is not a copy of GitHub repository metadata and does not make GitHub authoritative for project facts. It may use a public source-hosting service other than GitHub.

The model must support no repository reference and, where genuinely necessary, more than one distinct public repository reference for one project. Canonical validation must check the reference's required shape, URL validity, uniqueness within its Project Detail, and association with that Project Detail. Owner confirmation, not remote inspection, establishes that a public repository is relevant to the project.

A private, unavailable, removed, or intentionally undisclosed repository is an acceptable absence, not a reason to invent a substitute link. Later remote unavailability is an external destination failure, not a reason to remove otherwise valid canonical project evidence or add runtime availability checks to this feature.

## Functional Requirements

### Canonical ownership and integrity

- **FR-001:** A selected public project MUST have one owner-confirmed, version-controlled Project Detail keyed by a valid canonical project Context ID; a Project Detail MUST NOT define an independent project identity.
- **FR-002:** A selected project's technology evidence MUST be derived only from valid canonical Technology-Context Relationships for its project Context. A Technology merely mentioned in purpose, summary, or other prose MUST NOT be presented as project technology evidence without such a relationship.
- **FR-003:** A Project Detail MUST contain the required purpose and summary; repository references, technical characteristics, and demonstrated engineering concerns remain optional owner-confirmed project-specific facts.
- **FR-004:** Presentation code MUST NOT hardcode selected-project facts, repository references, or project-technology relationships as an independent source of truth.
- **FR-005:** Canonical validation MUST reject an unknown or non-project Context ID, duplicate Project Details for one Context, a Project Detail missing required information, technology evidence outside that Context's valid relationships, malformed or duplicate repository references, or another internally inconsistent project association.
- **FR-006:** Canonical project facts MUST NOT claim clients, production use, business impact, employment responsibilities, metrics, achievements, or technical characteristics that lack owner-confirmed evidence.

### Public understanding

- **FR-007:** The frontend MUST make each selected project's approved public name, concise purpose, and concise description understandable without relying on a repository link or a technology list alone.
- **FR-008:** The frontend MUST communicate approved technical characteristics and demonstrated engineering concerns as project-scoped evidence without translating them into unsupported proficiency levels, employment claims, or achievement claims.
- **FR-009:** The frontend MUST accurately distinguish Technology-Context Relationship meanings associated with a selected project: `used`, `learned`, or both. It MUST NOT imply technical dependency, professional employment, or current relevance where canonical data does not establish it.
- **FR-010:** The frontend MUST make an approved public repository reference available as an external destination when one exists and MUST keep the project understandable when none exists.

### Empty and partial data behavior

- **FR-011:** When no projects are selected, the frontend MUST present an honest, understandable absence state and MUST NOT fabricate projects, repositories, or placeholders that resemble portfolio evidence.
- **FR-012:** A missing repository reference, technical characteristic, or demonstrated engineering concern MUST not invalidate an otherwise publishable project when its required Context, purpose, summary, and technology evidence remain available.
- **FR-013:** A Project Detail missing its required Context, purpose, summary, or technology evidence, or containing inconsistent canonical references, MUST fail validation rather than appear as misleading partial evidence.
- **FR-014:** A valid Project Detail with only optional omissions MUST present only its available approved facts and MUST not infer missing details. A repository destination that later fails externally does not invalidate the static project content.

### Accessibility, responsiveness, and static operation

- **FR-015:** Project information and external repository destinations MUST remain usable through the existing semantic, keyboard, focus, responsive, and reduced-motion conventions established by SPEC-004 and later completed features.
- **FR-016:** The feature MUST remain understandable on supported narrow, touch, keyboard, and desktop presentations without requiring a particular visual layout or interaction pattern.
- **FR-017:** Core Portfolio Projects functionality MUST be statically consumable and compatible with the existing GitHub Pages deployment model, without a backend, runtime external dependency, or GitHub availability requirement.
- **FR-018:** The feature MUST preserve the existing Home, Story, Technology Graph, and implemented major-section navigation behavior.

## Technology Graph and GitHub Boundaries

### Technology Graph boundary

SPEC-007 remains authoritative. Portfolio Projects must not add project nodes to the Technology Graph, hardcode graph edges, reinterpret graph edges as technical dependencies, or change graph family, projection, selection, physics, or navigation behavior.

Search, filtering, richer contextual panels, detailed relationship exploration, focused subgraphs, and advanced graph navigation remain deferred to SPEC-008.

### GitHub boundary

SPEC-009 may present approved static repository references only. It must not fetch GitHub metadata, call GitHub APIs, synchronize repositories, cache external responses, handle rate limits, or display dynamic repository languages, commits, stars, releases, or analytics.

SPEC-010 owns future live GitHub enrichment. Core project information must remain available when GitHub is unavailable.

## Scope

### In Scope

- Selected public personal and portfolio project presentation.
- Canonical Project Details keyed by existing project Context IDs for the public facts that Contexts and Technology-Context Relationships do not own.
- Canonical project technology evidence, including applicable `used` and `learned` meanings.
- Optional static public source-repository references.
- Validation and honest empty/partial-data behavior for the project capability.
- Static, accessible, responsive presentation consistent with the established Phase 1 portfolio foundation.

### Out of Scope

- Live GitHub metadata, API calls, synchronization, caching, repository analytics, or dynamic repository details.
- Backend services, databases, authentication, persistence, REST APIs, GraphQL, AI, MCP, server-side infrastructure, or event systems.
- Project nodes, graph-edge changes, or Technology Graph exploration features reserved for SPEC-008.
- Detailed professional employment history, LinkedIn duplication, a traditional CV, or a full case-study system.
- Unapproved project facts, client claims, business-impact claims, achievements, metrics, responsibilities, or proficiency ratings.
- Exact project list, visual layout, component hierarchy, routes, navigation pattern, animations, or library choices.

## Acceptance Criteria

1. Every published selected project has exactly one valid Project Detail keyed by a canonical `portfolio` or `personal-project` Context, required owner-confirmed purpose and summary, and at least one valid Technology-Context Relationship for that Context.
2. A valid canonical Project Detail or relationship update is consumed through the established data boundary without adding a UI inventory or hardcoded project-technology relationship.
3. The public presentation makes a selected project's purpose, what it does, and canonical technology evidence understandable without repository access.
4. For each presented technology evidence item, the presentation accurately identifies whether its canonical relationship meaning is `used`, `learned`, or both; technology prose alone is not presented as evidence.
5. A project with no repository reference is presented without a fabricated destination. A valid approved repository reference is clearly external, may use any public source host, and does not require runtime verification of remote availability.
6. Canonical validation rejects an invalid Project Detail key, duplicate Project Detail, missing required fact, non-project Context, evidence not supported by the keyed Context, malformed or duplicate repository reference, and invalid canonical endpoint before production use.
7. No Project Details produces an honest absence state. Optional omissions do not create fabricated facts, and an externally unavailable repository destination does not remove static project understanding.
8. Project Details, repository references, and technology evidence are not independently hardcoded in UI rendering.
9. The feature remains usable with the established accessibility, keyboard, focus, responsive, and reduced-motion foundation.
10. The static production artifact provides all core project content without backend, runtime GitHub access, or any other runtime external dependency.
11. Existing Home, Story, Technology Graph, and major-section navigation behavior remain available and unchanged by this feature.
12. The implementation does not add graph project nodes, graph-exploration capabilities, live GitHub enrichment, or other out-of-scope dynamic infrastructure.

## Deferred Decisions

The following decisions require later owner input, specification refinement, or implementation planning and are not decided here:

- the final selected project list and the owner-confirmed facts for each entry;
- the exact storage shape, file location, and validation representation of Project Details and repository references;
- exact visual layout, section placement, navigation entry points, interactions, and responsive composition;
- exact external-link presentation behavior beyond clear identification as an external destination;
- live GitHub enrichment and its API, caching, rate-limit, and failure strategy (SPEC-010);
- graph exploration or richer relationship navigation (SPEC-008);
- backend, API, authentication, persistence, AI, MCP, or server-side capabilities.

## Completion Criteria

SPEC-009 may be marked complete only when:

1. selected-project requirements and canonical Project Details are implemented with owner-confirmed facts;
2. canonical ownership, integrity, empty/partial behavior, and repository-reference requirements are validated;
3. the public feature is reviewed for accessibility, responsiveness, static-host compatibility, and regression safety for completed portfolio areas;
4. applicable quality gates pass; and
5. no out-of-scope GitHub integration, graph exploration, backend capability, or employment-history duplication has been introduced.
