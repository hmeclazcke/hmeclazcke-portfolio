# Implementation Plan: Technology Graph

**ID:** SPEC-007  
**Status:** Approved for task breakdown  
**Depends on:** Approved SPEC-007 specification

## Approach

Implement the base graph as a React-owned SVG visualization using `d3-force` for layout simulation. This is the smallest focused candidate for the approved force-directed-with-tooltip model: D3 supplies force layout while React retains markup, styling, tooltip semantics, and the structured accessibility companion. It avoids adopting a larger diagram/workflow framework or a complete network-visualization library for the base experience.

The D3 simulation settles after initial layout and after desktop node dragging. Technologies receive weak, invisible family target forces plus label-aware collision and context-derived link forces; family hubs and membership edges are never rendered. Under reduced motion, the same settled layout is shown without non-essential transitions. The focused D3 force dependency is installed for this implementation.

## Canonical Projection

Create one feature-local projection from the existing static `technologies`, `contexts`, and `relationships` adapter exports:

1. Retain canonical Technology records as candidate visible nodes.
2. Group each Technology's valid canonical relationships by context and relationship meaning for tooltip and semantic output.
3. For each context, form only technology pairs within that context; accumulate shared context IDs as edge evidence.
4. Coalesce each unordered technology pair and score it by shared-context count, then context specificity (fewer participating technologies), with stable technology IDs as a tie-breaker. Do not infer dependency, sequence, or direct integration.
5. Build a deterministic maximum spanning forest from scored candidate edges before applying the visual edge budget, then add edges in the same order only until fixed, tested visual edge-budget and per-node degree limits are met. This preserves a visible spanning structure for every candidate component: a technology with candidate degree greater than zero must retain visible degree of at least one.
6. Semantic output and tooltip content always preserve every canonical Technology–Context relationship, including evidence not represented by a visual edge.

Contexts are projection evidence and tooltip/semantic content only; they are never visible node records. Presentation-only family hubs and their family-membership edges organize the force layout, while shared-context technology edges remain the historical relationship evidence.

## Enrichment Prerequisite

Before graph UI work, prepare an owner-reviewed canonical-data proposal. It must name each proposed technology, context, relationship, category, relevance value, and evidence source from approved owner history. Only approved facts enter canonical JSON. The current 7-technology seed has too little shared-context connectivity to demonstrate the desired graph: Java/C share UNICEN, while many records would remain isolated or have no visual technology neighbor.

The owner has directed a broader approximately 40–45-node initial graph that includes historically significant application-server and infrastructure technologies. Do not bulk-import the CV: keep supporting tooling secondary and exclude generic competencies and architecture concepts unless later owner-approved as technologies.

## Interaction Model

Use one local focused technology ID shared by hover, keyboard focus, and optional click selection.

- Hover/focus: show concise technology name, `Used at`, `Learned at`, and current/historical status if available; emphasize direct neighbors and incident edges.
- Click: may persist the same focus state; Escape or selecting empty graph space clears it if this is useful and accessible.
- Unrelated elements reduce prominence but remain visible.
- No filters, search, side detail system, subgraph navigation, or advanced exploration controls.

Tooltip content derives from canonical relationships, remains available on focus/selection, and does not rely on pointer hover.

## Visual and Layout Plan

Render an SVG graph inside the established dark technical visual language. Technology labels are part of the node treatment. Use category/relevance as restrained visual metadata, not a rainbow taxonomy. Use node geometry, edge weight/style, labels, and focus treatment in addition to color.

Constrain simulation bounds, collision spacing, link distance, and initial seed. Stop it after convergence; do not run a permanent tick loop. Avoid visual edge overload through deterministic shared-context coalescing/pruning rather than random hiding.

## Responsive and Mobile Plan

Desktop receives the primary force layout with readable labels and concise tooltip. Mobile will be decided after an enriched-data prototype:

- retain a touch-usable bounded graph only if labels and tap focus remain readable; and
- always render the same structured technology/context relationship representation in ordinary document flow.

No page-level horizontal overflow, touch interception, or requirement to scale desktop labels down to unreadability. The structured representation is the functional mobile fallback when the visual graph cannot be made usefully compact.

## Accessibility Plan

Keep the SVG graph and semantic companion independently useful. Render a semantic chronological/logical structure of each technology with contexts grouped by `Used at` and `Learned at`; this remains available when the graph is reduced, hidden, or not understood.

Interactive visual nodes use focusable native/SVG-compatible semantics as appropriate, visible focus, concise names, and the same tooltip content on keyboard focus. Test with axe where applicable, but manually validate focus, tooltip access, reduced motion, and the structured fallback because automated DOM checks do not validate graph comprehension.

## Testing and Validation

Use TDD for pure projection functions first: canonical records produce visible technology nodes, coalesced edge evidence only for shared contexts, no context nodes, and no invented edge. Test tooltip/semantic grouping, focus state, reduced-motion behavior, and responsive/fallback outcomes at the component level. Do not test D3 internals or pixel coordinates.

Validate desktop and mobile rendered behavior, settled motion, labels, focus, tooltip information, no overflow, Story regression safety, data validation, and existing project quality gates. Confirm the static build has no runtime graph data request and remains base-path compatible.

## Risks and Decisions

- D3 force layout is appropriate for the approved interaction reference, but its simulation must be bounded and seeded to prevent chaotic presentation.
- Dense shared contexts can create a mesh; use the documented scored spanning-forest, edge-budget, and degree-cap projection while preserving complete context evidence in tooltip and semantic output.
- A final D3 dependency decision is an implementation task, not a data-model change; no dependency is installed by this plan.
- No genuine owner question blocks task creation; per-record enrichment approval remains mandatory before canonical data changes.
