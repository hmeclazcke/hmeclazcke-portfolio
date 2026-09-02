# Feature Specification: Portfolio Data Model

**ID:** SPEC-003  
**Phase:** Phase 1 — Static Portfolio  
**Status:** Approved  
**Depends on:** SPEC-002 — Hello World Deployment

## Overview

Establish the canonical, project-owned portfolio data model that represents the technical history behind the Phase 1 portfolio. The model will provide a durable source of truth for technologies, the contexts in which they were learned or used, and the meaningful relationships between them.

This specification defines the information the model must represent and the integrity it must preserve. It does not select a storage format, implementation language structure, validation mechanism, graph library, or presentation architecture.

## Goal

After this specification is complete, the repository will own a deterministic canonical portfolio dataset that can be maintained independently of React presentation components and reused by later Phase 1 features, especially the interactive technology graph.

Adding or updating technologies, contexts, and their relationships must be a data-maintenance activity. It must not require React component changes solely to represent those portfolio facts.

## User Stories and Acceptance Criteria

### User Story 1 — Maintain technical history

**Priority:** P1

As the portfolio owner, I want to add or update technologies, contexts, and their relationships in canonical data so that the portfolio can grow with my technical history without changing presentation components for each data change.

**Independent Test**

A representative data change can add a technology, a context, or a technology–context relationship while the React presentation source remains unchanged.

**Acceptance Criteria**

1. Given a new technology, when it is added to the canonical dataset with the required identity and semantics, then later consumers can identify it without a corresponding React inventory change.
2. Given an existing technology or context, when its canonical information is updated, then consumers receive the updated information from the canonical dataset rather than a duplicated presentation value.
3. Given a new valid relationship, when it is added between existing canonical entities, then the association can be consumed without duplicating either entity.

### User Story 2 — Explore meaningful technical contexts

**Priority:** P1

As a portfolio visitor, I want later features to explain where a technology was learned or used so that the portfolio communicates technical history rather than an unconnected list of names.

**Independent Test**

The canonical dataset can determine all valid contexts associated with a technology and all valid technologies associated with a context.

**Acceptance Criteria**

1. Given a technology connected to multiple contexts, when a consumer queries its relationships, then each associated context and the meaning of the association can be determined.
2. Given a context connected to multiple technologies, when a consumer queries its relationships, then each associated technology and the meaning of the association can be determined.
3. Given a historical technology, when it is represented in the model, then it remains a valid part of technical history without being misrepresented as current.

### User Story 3 — Trust canonical portfolio data

**Priority:** P1

As a portfolio maintainer, I want malformed or ambiguous canonical data to be detected before production so that future features do not present incorrect relationships or depend on unavailable external services.

**Independent Test**

Deterministic validation distinguishes a valid representative dataset from data with duplicate entities, invalid categories, or relationships that reference unknown entities.

**Acceptance Criteria**

1. Given a relationship that references an unknown technology or context, when the canonical dataset is validated, then validation fails before production use.
2. Given an entity with a duplicate canonical identity or an invalid controlled category, when the dataset is validated, then validation fails deterministically.
3. Given an external service is unavailable, when a later consumer reads the canonical dataset, then the project-owned technology and context information remains available without that service.

## Key Entities

### Technology

A Technology represents a technical capability relevant to the portfolio. It may be a programming language, framework, database, tool, platform, protocol, methodology, or another meaningful technical capability.

Each Technology must represent:

- a stable unique identity;
- a human-readable name;
- a controlled meaningful category; and
- support for a separately represented relevance state, when that classification is confirmed, that distinguishes current technologies from primarily historical technologies.

A historical Technology is valid canonical history. It must remain representable and must not be deleted, invalidated, or treated as a defect merely because it is no longer current. The entity model must accommodate additions throughout the portfolio owner’s career without redesign.

### Context

A Context represents a meaningful setting in which a Technology was learned, practiced, or used. Context types must distinguish at least:

- professional or company experience;
- portfolio projects;
- personal technical projects; and
- learning or study contexts.

Each Context must have a stable unique identity, a human-readable name, and a controlled context type. A Context may represent an organization or project, but this model is not a detailed résumé, employment-history database, or CV. Detailed professional history remains on LinkedIn.

### Technology–Context Relationship

A Technology–Context Relationship is the canonical association between one Technology and one Context. It represents one or more things that happened with the Technology in that Context. The controlled relationship-meaning vocabulary is `learned` and `used`; the meanings are not mutually exclusive, so the same association may validly represent both.

Each relationship must have a stable unique identity, reference one valid canonical Technology and one valid canonical Context, and use one or more controlled relationship meanings. The relationship is distinct from both endpoint entities; it must not duplicate a Technology merely to describe its use in another Context. Context type answers where or in what kind of setting the association occurred; relationship meanings answer what happened with the Technology there. A Technology may be learned in a learning, personal-project, portfolio, or other valid Context, and may be both learned and used in the same Context.

## Semantic Separation

The canonical model must preserve these independent concepts:

- a Technology’s identity, name, and category describe what it is;
- a Technology’s relevance state describes whether it is current or primarily historical;
- a Context’s type describes what kind of setting it represents; and
- a Technology–Context Relationship describes one or more meaningful things that happened between those two entities in that Context.

These concepts must not be collapsed into one generic status field or uncontrolled free text. Controlled categories must be defined so later consumers can distinguish comparable concepts consistently.

## Functional Requirements

### Canonical Data

- **FR-001:** The repository MUST own one canonical portfolio dataset for Technologies, Contexts, and Technology–Context Relationships.
- **FR-002:** The canonical dataset MUST be deterministic, version controlled, and usable without a project backend.
- **FR-003:** The canonical dataset MUST remain usable when external services, including GitHub, are unavailable.
- **FR-004:** The canonical dataset MUST be maintainable independently from React presentation components.
- **FR-005:** Presentation code MUST consume the canonical data model and MUST NOT embed the portfolio technology inventory directly in UI components.
- **FR-006:** Adding, updating, or relating canonical technologies and contexts MUST NOT require modifying React components solely to represent those data changes.
- **FR-007:** The canonical data model MUST be reusable by multiple future portfolio features without depending on a graph visualization library.

### Technologies and Contexts

- **FR-008:** Each Technology MUST have a stable unique identity, human-readable name, and controlled category; the model MUST support a distinct current-or-historical relevance state when that classification is confirmed.
- **FR-009:** The model MUST support Technologies that are programming languages, frameworks, databases, tools, platforms, protocols, methodologies, or other relevant technical capabilities.
- **FR-010:** Historical Technologies MUST remain valid canonical data and MUST be distinguishable from current Technologies.
- **FR-011:** Each Context MUST have a stable unique identity, human-readable name, and controlled context type.
- **FR-012:** The model MUST represent professional/company, portfolio-project, personal-project, and learning/study Contexts without becoming a detailed employment-history or CV model.

### Relationships and Representative Data

- **FR-013:** Each Technology–Context Relationship MUST identify valid canonical endpoints and one or more controlled relationship meanings; `learned` and `used` MUST remain independently combinable.
- **FR-014:** The model MUST support many Technologies associated with one Context and one Technology associated with many Contexts.
- **FR-015:** The initial representative dataset MUST include at least one current Technology, one historical Technology, one professional Context, one portfolio-project or personal-project Context, one learning Context, and multiple Technologies connected to multiple Contexts.
- **FR-016:** Initial representative data MUST use only portfolio facts established in authoritative project documentation or explicitly confirmed by the portfolio owner; it MUST NOT invent career history.

### Confirmed Initial Representative Data

The following portfolio-owner-confirmed facts are valid initial representative data for planning. They are illustrative rather than a complete technical history, and they do not imply dates beyond the explicitly confirmed approximate IAC timing, degrees, employment details, or unlisted relationships.

**Technologies**

- Java — current
- React — current
- BASIC — historical
- Visual Basic — historical
- C
- Oracle
- Smalltalk

**Contexts**

- Unitech — professional
- TeraCode — professional
- UNICEN — learning/study
- IAC — learning
- hmeclazcke-portfolio — portfolio project
- Reactive RAG Document Processor — portfolio
- Personal Projects — personal-project

UNICEN is a learning/study context only. It does not imply that the portfolio owner obtained a degree there.

IAC is a private computing institute. BASIC was learned there approximately during the 1990s; no fuller name or more precise date is asserted. These are provenance facts only and do not add canonical Context metadata; the canonical IAC representation remains its stable identity, name, and learning Context type. Chronology, descriptive Context metadata, and richer education information require an explicit future model extension.

**Technology–Context Relationships**

- Java ↔ Unitech — used
- Java ↔ TeraCode — used
- React ↔ TeraCode — used
- React ↔ hmeclazcke-portfolio — used
- Java ↔ Reactive RAG Document Processor — used
- C ↔ UNICEN — learned
- Java ↔ UNICEN — learned
- Oracle ↔ UNICEN — learned
- Smalltalk ↔ UNICEN — learned
- C ↔ Personal Projects — used
- BASIC ↔ Personal Projects — used
- BASIC ↔ IAC — learned

No current-or-historical relevance state is asserted here for C, Oracle, or Smalltalk. Additional confirmed technologies, contexts, and relationships may be added later without changing React presentation code.

### Presentation Independence

- **FR-017:** Canonical data MUST NOT contain graph coordinates, node positions, colors, animations, layout-engine configuration, CSS classes, visualization-library-specific properties, or other presentation-only concerns.
- **FR-018:** The model MUST allow future additions to the technical history without requiring a data-model redesign or a React presentation change solely for the addition.

## Data Integrity Requirements

- **DIR-001:** Canonical Technology, Context, and Relationship identities MUST be stable and unique within their respective entity sets.
- **DIR-002:** Every Technology–Context Relationship MUST reference exactly one existing canonical Technology and exactly one existing canonical Context.
- **DIR-003:** The dataset MUST reject dangling relationships and relationships with missing, invalid, or ambiguous endpoints.
- **DIR-004:** The dataset MUST reject unintended duplicate canonical entities and duplicate Technology–Context associations with the same canonical endpoints; applicable relationship meanings must remain together on that one association rather than being split across duplicates.
- **DIR-005:** Technology categories, relevance states, Context types, and relationship semantics MUST use controlled values rather than inconsistent arbitrary spelling or unconstrained text.
- **DIR-006:** Validation of the canonical dataset MUST be deterministic and MUST detect malformed data before it reaches production.
- **DIR-007:** The initial representative dataset MUST satisfy every canonical identity, reference, uniqueness, and controlled-category rule.

## Edge Cases

- A Technology can be historical and still have meaningful relationships; historical relevance does not invalidate it.
- A Technology can relate to multiple contexts of different types without creating duplicate Technology entities.
- A Context can contain multiple Technologies without becoming the owner of duplicate Technology definitions.
- A Technology may be learned in one Context and used in another, or both learned and used in the same Context; these are valid, non-conflicting semantics.
- A Technology name may be similar to another name, but identity and controlled categorization must prevent accidental conflation.
- A context with limited publicly presentable detail must remain concise rather than forcing detailed professional-history data into the model.
- An empty future extension is permitted only where it does not violate the initial representative-dataset requirement; incomplete relationships must never be represented by dangling references.

## Scope

### In Scope

- Canonical project-owned representation of Technologies, Contexts, and Technology–Context Relationships.
- Controlled semantics for technology categories, relevance states, context types, and relationship meanings.
- Deterministic integrity requirements and validation expectations.
- A representative initial dataset sufficient to prove the model’s expressiveness.
- Data independence from React presentation components, external services, backend availability, and graph-library concerns.

### Out of Scope

- Rendering the technology graph.
- Selecting a graph library, graph layout, coordinates, node positions, interactions, filters, or search UI.
- Site shell, navigation, final visual design, or Matrix / Blade Runner styling.
- Detailed About Me content or detailed employment-history/CV modeling.
- GitHub API calls or dynamic GitHub repository data.
- Backend code, APIs, OpenAPI, MCP, authentication, persistence/database storage, or admin interfaces.
- Selection of a storage format, data structure, schema/validation library, concrete filenames, directories, or frontend architecture mechanism.

## Assumptions

- SPEC-002 provides the deployed, backend-independent Phase 1 frontend foundation.
- The Phase 1 portfolio must remain useful without a project backend.
- The portfolio owner will progressively add verified technical-history facts over time.
- LinkedIn remains the destination for detailed professional experience.
- Later specifications will decide how the canonical data is stored, validated, consumed, and presented.

## Future Compatibility

The canonical model must be suitable for later Phase 1 consumers, including Home, About Me where relevant, Technology Graph, Technology Graph Exploration, Portfolio Projects, and Public GitHub Integration.

This compatibility requires reusable portfolio facts and relationships, not implementation of those features. The model must not require backend persistence and must not assume future backend availability.

## Success Criteria

- **SC-001:** The repository owns a deterministic, version-controlled canonical dataset that remains available without a backend or external service.
- **SC-002:** A Technology can be added or updated without modifying React presentation components solely to represent that change.
- **SC-003:** A Context can be added or updated without modifying React presentation components solely to represent that change.
- **SC-004:** A valid Technology–Context Relationship can be added or updated without duplicating either endpoint entity or modifying React presentation components solely to represent that change.
- **SC-005:** The initial representative dataset demonstrates current and historical Technologies, the required Context types, and many-to-many Technology–Context associations.
- **SC-006:** Deterministic validation detects duplicate identities, invalid controlled semantics, and dangling or ambiguous relationships before production use.
- **SC-007:** The canonical model contains no presentation-only graph data, graph-library dependence, backend requirement, or detailed résumé data.
- **SC-008:** The model can support the stated future Phase 1 features without those features being implemented by this specification.

## Completion Criteria

SPEC-003 may be marked complete only when:

1. all functional and data-integrity requirements are implemented and validated;
2. the initial representative dataset satisfies FR-015 and FR-016;
3. canonical data changes can be made without React presentation changes solely for those facts;
4. malformed canonical data is deterministically rejected before production use;
5. applicable quality gates pass;
6. the result remains independent of a backend, external-service availability, and graph-library concerns; and
7. no out-of-scope feature, presentation implementation, or unapproved architectural decision has been introduced.
