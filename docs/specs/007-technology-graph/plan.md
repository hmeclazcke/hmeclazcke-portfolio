# Implementation Plan: Technology Graph

**ID:** SPEC-007  
**Status:** Complete - owner-approved
**Depends on:** Approved SPEC-007 specification

## Approach

Implement the base graph as a React-owned SVG visualization using `d3-force` for layout simulation. This is the smallest focused candidate for the approved force-directed-with-tooltip model: D3 supplies force layout while React retains markup, styling, tooltip semantics, and the structured accessibility companion. It avoids adopting a larger diagram/workflow framework or a complete network-visualization library for the base experience.

The D3 simulation settles after initial layout and after desktop node dragging. Technologies receive clear, invisible family centroid target forces plus label-aware collision, bounds, and context-derived link forces; family hubs and membership edges are never rendered. Dragging reheats the complete simulation while preserving the stationary graph background. Under reduced motion, the same settled layout is shown without non-essential transitions. The focused D3 force dependency is installed for this implementation.

## Canonical Projection

Create one feature-local projection from the existing static `technologies`, `contexts`, and `relationships` adapter exports:

1. Retain canonical Technology records as candidate visible nodes.
2. Group each Technology's valid canonical relationships by context and relationship meaning for tooltip and semantic output.
3. For each context, form only technology pairs within that context; accumulate shared context IDs as edge evidence.
4. Coalesce each unordered technology pair and score it by inverse context size: focused shared contexts carry more pair-specific evidence than broad contexts, and multiple shared contexts accumulate. Do not infer dependency, sequence, or direct integration.
5. Select visual edges deterministically with degree balancing: favor strong evidence and initially uncovered endpoints, then penalize endpoints already carrying visible degree. Apply a restrained edge budget and degree cap, while retaining at least one edge for each technology with candidates. Pair-level stable hashing resolves semantic ties without alphabetical/index hubs.
6. Semantic output and tooltip content always preserve every canonical Technology–Context relationship, including evidence not represented by a visual edge.

Contexts are projection evidence and tooltip/semantic content only; they are never visible node records. Invisible family centroid targets organize the force layout, while shared-context technology edges remain the historical relationship evidence.

An optional canonical context `graphEdgeEligible` policy separates broad historical umbrellas from concrete relationship evidence. Omitted or `true` contexts generate normal candidate pairs; `false` contexts remain complete technology history but contribute no candidates, score, edge label, or edge tooltip context. `Personal Projects` uses this policy. When a technology is persistently selected, each of its direct visible edges receives a compact midpoint context-name label; edge hover retains the full context name and type.

After the bounded degree-balanced selection pass, a deterministic coverage repair selects the strongest remaining truthful candidate for any candidate-connected technology with visible degree zero. It favors evidence score and lower existing endpoint degree, uses the same stable pair tie-breaker, and never manufactures an edge or consults family metadata.

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

Visible desktop edge hover is a supplementary explanation: each edge retains its derived shared-context records and presents `Shared context` or `Shared contexts` with the canonical context name and type. Edge hover does not alter persistent node selection; technology nodes remain the primary keyboard interaction.

## Visual and Layout Plan

Render an SVG graph inside the established dark technical visual language. Technology labels are part of the node treatment. Use category/relevance as restrained visual metadata, not a rainbow taxonomy. Use node geometry, edge weight/style, labels, and focus treatment in addition to color.

Constrain simulation bounds, collision spacing, link distance, and initial seed. Stop it after convergence; do not run a permanent tick loop. Avoid visual edge overload through deterministic shared-context coalescing/pruning rather than random hiding.

## Responsive and Mobile Plan

Desktop receives the primary force layout with readable labels and concise tooltip. At the established narrow breakpoint, the desktop graph is replaced by a compact family-based explorer derived from the same canonical technology and family metadata. Its inline technology detail groups canonical context evidence by `Used at`, `Learned at`, or `Learned & used at`, deduplicating a context that carries both meanings.

No page-level horizontal overflow, touch interception, or requirement to scale desktop labels down to unreadability. The complete structured technology/context companion remains available to assistive technology without becoming the visible mobile product UI.

## Accessibility Plan

Keep the SVG graph and semantic companion independently useful. Render a semantic chronological/logical structure of each technology with contexts grouped by `Used at` and `Learned at`; this remains available when the graph is reduced, hidden, or not understood.

Interactive visual nodes use focusable native/SVG-compatible semantics as appropriate, visible focus, concise names, and the same tooltip content on keyboard focus. Test with axe where applicable, but manually validate focus, tooltip access, reduced motion, and the structured fallback because automated DOM checks do not validate graph comprehension.

## Testing and Validation

Use TDD for pure projection functions first: canonical records produce visible technology nodes, coalesced edge evidence only for shared contexts, no context nodes, and no invented edge. Test tooltip/semantic grouping, focus state, reduced-motion behavior, and responsive/fallback outcomes at the component level. Do not test D3 internals or pixel coordinates.

Validate desktop and mobile rendered behavior, settled motion, labels, focus, tooltip information, no overflow, Story regression safety, data validation, and existing project quality gates. Confirm the static build has no runtime graph data request and remains base-path compatible.

## Risks and Decisions

- D3 force layout is appropriate for the approved interaction reference, but its simulation must be bounded and seeded to prevent chaotic presentation.
- Dense shared contexts can create a mesh; use the documented context-specific, degree-balanced edge projection with deterministic coverage repair while preserving complete context evidence in tooltip and semantic output.
- A final D3 dependency decision is an implementation task, not a data-model change; no dependency is installed by this plan.
- No genuine owner question blocks task creation; per-record enrichment approval remains mandatory before canonical data changes.
