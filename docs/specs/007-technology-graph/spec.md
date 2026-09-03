# Feature Specification: Technology Graph

**ID:** SPEC-007  
**Phase:** Phase 1 — Static Portfolio  
**Status:** Approved for planning  
**Depends on:** SPEC-003 — Portfolio Data Model; SPEC-004 — Site Shell and Visual Foundation

## Purpose

Create the first usable Technology Graph: a calm, force-directed browser visualization of meaningful technologies in Hernán Meclazcke's history. It communicates real technical relationships without becoming a skills cloud, résumé, decorative animation, or backend-dependent service.

Visible information nodes are technologies only. Technology-family metadata provides invisible, loose force-layout guidance; canonical contexts remain evidence that explains where each technology was learned or used and are never visible graph nodes.

## User Value

A visitor can recognize important technologies, see truthful technology-to-technology affinity derived from shared canonical contexts, and inspect a concise account of where a technology was learned or used. This makes history understandable without exposing unsupported employer chronology or treating learning and professional use as equivalent.

## Scope

SPEC-007 delivers a same-document static graph that:

- renders meaningful technologies as labeled visible nodes, with invisible family-layout guidance only;
- derives technology-to-technology edges solely from shared canonical contexts;
- provides a concise hover/focus tooltip and optional persistent basic selection state;
- emphasizes a focused technology, its direct graph neighbors, and incident edges while reducing unrelated visual prominence;
- exposes technology metadata, including current/historical relevance when canonically supplied;
- provides a responsive desktop and mobile presentation plus semantic structured representation;
- runs entirely in the browser from project-owned canonical data.

Contexts, employers, education institutions, projects, and personal-project labels are not visible graph nodes. They appear only as concise, canonical tooltip and semantic relationship information.

## Out of Scope

SPEC-007 excludes advanced filtering, search, category/status controls, detail panels, complex graph navigation, focused-subgraph modes, rich contextual exploration, and other SPEC-008 capabilities. It does not create project pages, reproduce detailed employment history, use a backend, install authentication, use external runtime data, or import every item from the CV.

## Canonical Data and Derived Edges

Canonical technologies, contexts, and Technology–Context Relationships remain authoritative. The graph consumes them through the existing frontend data boundary; no React component may keep an independent inventory or hand-written graph edge dataset.

### Visible Nodes

Each visible node represents one meaningful Technology record. A technology is a candidate only when its professional, learning, historical, or portfolio significance justifies a readable graph node. Version numbers are metadata, not nodes (`Java`, not Java 8/21/25). Architecture concepts such as Microservices and Clean Architecture, employers, projects, and contexts are not initial visible technology nodes.

Frameworks such as Spring Boot may be visible where owner-approved history and canonical relationships establish material significance. Minor tooling must not overwhelm core concepts. Readability takes precedence over maximum node count.

### Edge Truthfulness

An edge between technology A and B exists only when both have at least one shared valid canonical context. Edge evidence is the shared context or contexts; it is not a claim that one technology depends on, replaces, or directly integrates with the other.

The implementation plan must define deterministic coalescing and pruning for shared-context edges so a highly populated context does not create an unreadable complete mesh. Pruning may remove visual edges only when semantic structured access retains every canonical Technology–Context relationship. It must never add an edge without shared canonical evidence.

`learned` and `used` remain relationship-level context information. They are presented in tooltip/focus and semantic representations, not misrepresented as standalone technology-edge meanings.

## Functional Requirements

- **FR-001:** The portfolio shall expose a genuine Technology Graph section in the same static document.
- **FR-002:** The only visible graph node type shall be Technology; canonical contexts shall not render as nodes.
- **FR-003:** Node labels shall identify meaningful technologies and remain readable at the intended initial presentation.
- **FR-004:** Every visual technology edge shall be traceable to one or more shared canonical contexts.
- **FR-005:** Hover and keyboard focus shall reveal concise canonical information for a technology: name, used contexts, learned contexts, and relevance status when supplied.
- **FR-006:** Focus/hover shall emphasize the focused technology and directly related technologies/edges, and de-emphasize unrelated elements without color-only state distinction.
- **FR-007:** Basic click/selection may persist the same focus state if it improves comprehension; it shall not become an advanced exploration system.
- **FR-008:** The graph shall have a deterministic or stable-enough initial arrangement, settle after restrained initial movement, and not continuously drift or bounce.
- **FR-009:** Current/historical relevance may receive subtle node treatment where canonically present; SPEC-007 shall not add filtering around it.
- **FR-010:** The graph shall adapt to mobile without horizontal page-breaking overflow, microscopic labels, or a requirement to shrink the desktop composition unchanged.
- **FR-011:** Mobile shall preserve natural document/touch scrolling. Any graph interaction must not create a scroll trap.
- **FR-012:** Technologies, their contexts, and relationship meanings shall be available in a meaningful semantic/textual representation independently of a visual SVG/canvas graph.
- **FR-013:** Meaningful graph interactions shall be keyboard reachable, visibly focused, and available without mouse hover; tooltip information shall be programmatically available on focus/selection.
- **FR-014:** Motion is non-essential; `prefers-reduced-motion` shall preserve the same information with non-essential simulation/transition motion minimized or removed.
- **FR-015:** The graph shall remain static-host compatible, require no backend, no authentication, no database, no server-side graph processing, and no runtime external request.

## Visual Direction

Use the established graphite/near-black technical surface, subtle grid, restrained luminous green and amber/copper accents, Space Grotesk and JetBrains Mono. The visual inspiration is a force-directed graph with tooltip and readable labels, not a copy of its Observable source or UI. Avoid rainbow node soup, generic diagram-tool appearance, neon overload, and endless physics motion.

Node focus, relevance, relationships, and interaction state require structural/textual cues in addition to color.

## Accessibility and Performance

The visual graph is not its own accessible representation. A structured companion must expose technology names, contexts, and `learned`/`used` meanings in meaningful order. Interactive nodes need keyboard reachability, visible focus, concise accessible names, and non-hover access to the same tooltip content.

The graph must be proportionate to a static personal portfolio: defer initialization where useful, avoid severe initial-page regression, and justify any new visualization dependency in the plan. It must not make Home or the approved Explore My Story experience unusable.

## SPEC-007 / SPEC-008 Boundary

SPEC-007 establishes a technology-only force graph, truthful derived edges, basic hover/focus/optional selection, and semantic access. SPEC-008 may add search, filters, richer contextual panels, detailed relationship exploration, focused subgraphs, graph navigation modes, and status/category controls.

## Acceptance Criteria

1. Visible nodes are technologies only; contexts never appear as graph nodes.
2. Every edge has shared canonical-context evidence and no independent hand-authored graph dataset exists.
3. Hover/focus for a technology reveals its canonical learned/used contexts and relevance status where available.
4. The graph settles into a readable presentation and does not continuously animate.
5. Desktop labels and direct-node relationships are understandable; focused state is not color-only.
6. Mobile remains understandable without page-breaking overflow or forced desktop shrinkage, and retains natural scrolling.
7. Keyboard and screen-reader users can obtain equivalent technology/context/meaning information without interpreting the visual graph.
8. The graph works without backend or external runtime data access and respects reduced motion.
9. Family metadata does not render hubs, labels, or membership edges; focus emphasizes direct visible context-derived neighbors only.

## Open Questions for Owner Review

No product decision blocks planning. The approved enrichment phase must still obtain owner confirmation for each proposed canonical technology, context, and relationship before data is changed.

## Completion Criteria

SPEC-007 is complete only after owner-approved enrichment, implementation, accessibility/mobile validation, required quality gates, and owner visual review. Planning and task breakdown are separate artifacts.
