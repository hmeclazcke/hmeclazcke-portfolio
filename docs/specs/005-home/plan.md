# Implementation Plan: Home

**ID:** SPEC-005  
**Phase:** Phase 1 — Static Portfolio  
**Spec:** `docs/specs/005-home/spec.md`  
**Status:** Approved

## Implementation Overview

Replace the SPEC-002/SPEC-004 temporary main content with one focused, static Home hero while retaining the completed `SiteShell`, `SiteHeader`, and `SiteFooter`. The implementation will use the existing native CSS, semantic token, CSS Module, local-font, accessibility-test, and static-deployment foundations.

The Home hero will present only owner-approved public content. It will not add navigation, calls to action, canonical-data presentation, a graph, external destinations, or another portfolio section.

## Technical Context

### Existing foundation

- SPEC-001 provides the React, TypeScript, Vite, Vitest, React Testing Library, ESLint, Prettier, and npm foundation.
- SPEC-002 provides the temporary `Hello, world!` and Lorem Ipsum content and static GitHub Pages deployment.
- SPEC-003 provides repository-root canonical data, a static frontend data boundary, and `npm run validate:data`. Home will not use that data to generate its content.
- SPEC-004 provides `SiteShell`, `SiteHeader`, `SiteFooter`, global CSS, semantic CSS custom properties, CSS Modules, local Space Grotesk and JetBrains Mono assets, axe-core test infrastructure, dark-first browser behavior, and the static Pages base path.

### Existing shell contract

`SiteShell` already supports `readable`, `wide`, and `full` content-width modes. Home will use the default `readable` mode: it is the appropriate existing contract for a concise text-led introduction and preserves a comfortable reading measure. No `SiteShell` change is planned.

## Technical Decisions

### TD-001 — One focused HomeHero component

Create one focused `HomeHero` component and a neighboring CSS Module. `App` will compose it as the sole child of the existing `SiteShell`.

This is sufficient because the hero is the only new feature-specific presentation and has one consumer. Do not introduce a generic section framework, a page framework, a component library, routes, or reusable abstractions without a second concrete need.

### TD-002 — Header owns persistent site identity

Keep `Hernán Meclazcke` and `hmeclazcke` in the existing header, where they already establish persistent site identity and secondary technical handle. The hero will not repeat the full name solely for decoration. Its document `h1` will be the approved professional title, giving the page a clear semantic and visual entry point without excessive repeated identity.

The page-wide hierarchy is therefore:

1. header: primary identity and secondary technical handle;
2. hero technical accent: approved greeting, visually subordinate and not a heading;
3. hero `h1`: approved professional title;
4. hero technology line: approved factual technical context; and
5. hero paragraph: approved supporting introduction.

### TD-003 — Approved copy is literal content

Render the following strings exactly, without rewriting, embellishment, generated copy, or data-derived substitutions:

- `HELLO, I'M HERNÁN.`
- `Senior Backend Java Developer`
- `Java · Spring Boot · Microservices · Oracle & PL/SQL · REST APIs`
- `Computers and programming have been part of my life since I was a kid. Today I focus on backend development, while still enjoying exploring different technologies and understanding how the pieces of a system fit together.`

The technology line is curated public copy. `HomeHero` must not import or use the SPEC-003 canonical portfolio data to construct it.

### TD-004 — Reuse the existing visual system

Use only the completed SPEC-004 visual foundation:

- global document/base rules and semantic CSS custom properties;
- component-scoped CSS Modules;
- Space Grotesk for readable heading and body content;
- JetBrains Mono selectively for the technology line;
- existing dark-first palette, semantic border/accent roles, spacing scale, typography scale, and shell atmosphere.

Home-specific CSS may create hierarchy, vertical rhythm, subtle title emphasis, a restrained technology-line treatment, and responsive composition. It must consume existing semantic tokens and avoid new raw palette values, a styling framework, or a visual-system redesign.

## Component and File Strategy

Planned composition:

```text
App
└── SiteShell (existing, readable width)
    ├── SiteHeader (existing)
    ├── main
    │   └── HomeHero
    └── SiteFooter (existing)
```

Expected implementation files:

```text
frontend/src/
├── App.tsx                                  # Replace temporary main child with HomeHero
├── App.test.tsx                             # Replace placeholder assertions with Home behavior tests
└── components/
    └── home/
        ├── HomeHero.tsx                     # Focused approved-content presentation
        └── HomeHero.module.css              # Focused hero layout and presentation
```

The existing static canonical-data boundary, shell components, global styles, tokens, Vite configuration, deployment workflow, and dependencies remain unchanged unless implementation exposes a concrete defect within SPEC-005 scope. `HomeHero` will not receive canonical-data props or own a data-access abstraction.

## Content Composition

`HomeHero` will contain a non-heading greeting element, one semantic `h1`, a technology-line text element, and a paragraph element. The greeting is a small technical accent above the title, and the approved supporting paragraph remains the only supporting personal/professional copy.

The header continues to provide the primary identity `Hernán Meclazcke` and secondary handle `hmeclazcke`; the hero provides the approved professional context. This avoids redundant name presentation while ensuring visitors encounter the identity and positioning in the initial page view.

Do not add a CTA, button, link, label, tagline, section heading, biography, technology list, experience metric, image, or extra marketing copy beyond the approved greeting. Do not add early-computing chronology; that fuller story remains SPEC-006 scope.

## Styling Strategy

The hero CSS Module will:

- create a concise vertical stack with the existing spacing scale;
- render the greeting as selective JetBrains Mono technical accent text, visually subordinate to the title;
- make the `h1` the strongest Home element using the existing heading typography roles;
- render the technology line as selective JetBrains Mono technical accent text with an existing appropriate accent/text token and readable contrast;
- render the supporting paragraph using the existing readable body typography and muted-text role;
- use existing surface, border, accent, and glow roles only where they reinforce hierarchy rather than create decoration for its own sake; and
- remain compatible with the existing atmospheric background and dark-surface hierarchy.

No personal photo, avatar, GitHub image, early-computing/Logo/486/Sound Blaster chronology, Matrix rain, terminal simulation, typewriter effect, glitch, particles, fake code, or continuous animation is planned.

## Responsive Strategy

Use the existing `readable` shell width and fluid token-based sizing. Add a Home-specific breakpoint only if an observable hero layout issue cannot be resolved through the existing fluid spacing and typography; the default expectation is that no new breakpoint is necessary for a single-column text hero.

Manually review at:

- 375px;
- 768px;
- 1280px; and
- 1536px.

At each width, verify readable hierarchy and line lengths, deliberate whitespace, no clipping or overlap, and no problematic horizontal scrolling. Also inspect the hero at 200% browser zoom or equivalent text enlargement. Wide screens must retain the readable measure rather than stretch the short Home content unnecessarily.

## Accessibility Strategy

- Preserve the existing semantic `header`, `main`, and `footer` landmarks through `SiteShell`.
- Use the hero professional title as the sole page `h1`; preserve logical heading structure for future additions.
- Use a native paragraph for the approved supporting copy and ordinary text semantics for the technology line.
- Maintain intended WCAG 2.2 AA-oriented contrast by using existing semantic text and accent tokens on their intended backgrounds; decorative effects must not be the only contrast mechanism.
- Preserve existing `:focus-visible` and reduced-motion foundations. Home introduces no interactive controls, so no fabricated keyboard-interaction test or focus target is needed.
- Do not convey meaning solely through color, and ensure the title, line, and paragraph remain understandable when effects or color distinctions are unavailable.

Reuse the existing axe-core/Vitest setup for semantic and applicable automated accessibility coverage. Axe/jsdom remains supplemental: it cannot prove rendered contrast, visual readability, zoom reflow, or the complete browser accessibility experience.

## TDD and Testing Strategy

### Observable Home behavior red → green cycle

1. Update `frontend/src/App.test.tsx` first with assertions that fail against the temporary walking-skeleton page:
   - the approved title appears exactly;
   - the approved greeting appears exactly and is not an additional heading;
   - the approved technology line appears exactly;
   - the approved supporting paragraph appears exactly;
   - `Hello, world!` is absent;
   - the Lorem Ipsum placeholder is absent;
   - no link or button is rendered for a CTA or navigation; and
   - existing banner, main, and contentinfo landmarks remain present with an appropriate page `h1`.
2. Run the focused test and confirm the expected failure is due to the missing Home content and remaining placeholder content.
3. Implement the minimum `HomeHero` and `App` composition required to satisfy those observable assertions.
4. Re-run the focused test and confirm it passes.
5. Refactor only while tests remain green; do not assert CSS Module class names, styles, markup wrappers, or other implementation details unnecessarily.

### Accessibility red → green cycle

1. Extend the existing rendered-app axe test only if it does not already cover the changed Home structure; run it after the semantic Home test change to establish the applicable result.
2. If an applicable semantic axe violation appears, correct the smallest native HTML or content-structure issue and rerun until green.
3. Do not weaken axe rules or add ARIA merely to make the check pass. Continue to document that jsdom cannot validate rendered color contrast.

## Dependency Decision

Add **no dependencies**. Existing React, TypeScript, CSS Modules, Fontsource fonts, Vitest, React Testing Library, and axe-core satisfy Home’s requirements. A new package would add maintenance and delivery surface without solving a requirement that the current foundation cannot satisfy.

## Static Deployment and Data Boundary

Preserve the Vite static build, `/hmeclazcke-portfolio/` base path, GitHub Pages workflow, backend independence, existing CI/CD gates, and `npm run validate:data` command.

Home content is static React content. It must not make an HTTP request, rely on an external runtime service, use a runtime font CDN, or expose canonical Technology, Context, or Relationship records. The existing SPEC-003 data boundary remains available for later specifications but is not a Home content source.

## Validation Strategy

Before portfolio-owner review, execute:

```text
npm run format:check
npm run lint
npm run typecheck
npm run test:run
npm run validate:data
npm run build
git diff --check
```

Also perform:

- approved-copy exactness review;
- automated accessibility review using the existing axe setup, with its documented limitations;
- manual responsive review at 375px, 768px, 1280px, and 1536px;
- manual 200% zoom/text-resizing review;
- manual contrast, readability, and reduced-motion review in a rendered browser;
- scope-drift review confirming no SPEC-006+ capability, CTA, routing, navigation, or canonical-data presentation was introduced; and
- final git-diff review.

## Portfolio-Owner Visual Approval Checkpoint

Automated validation is insufficient to complete SPEC-005 because this work changes the public landing content and visual hierarchy. After automated gates and manual local checks succeed:

1. Start the local development application if needed and provide the local URL to the portfolio owner.
2. Request explicit visual approval of the Home composition at 375px, 768px, 1280px, and 1536px, plus 200% zoom/text resizing.
3. Request confirmation that the approved copy is accurate, hierarchy and whitespace are intentional, the identity/header relationship is not repetitive, and the visual direction remains professional, readable, restrained, and consistent with SPEC-004.
4. Stop for owner feedback before declaring the specification complete. Apply only requested SPEC-005-local refinements, then repeat applicable checks and review when material.

## Documentation Convergence

After implementation, validation, and explicit portfolio-owner approval, update only documentation warranted by the completed change:

- `docs/architecture.md` only if the focused Home component introduces a material architectural boundary beyond the existing frontend presentation structure;
- `docs/quality-gates.md` only if Home adds a durable, repeatable validation responsibility;
- `docs/references.md` only for materially influential sources not already recorded;
- `docs/roadmap.md` and `docs/current.md` for actual lifecycle completion; and
- `README.md` only if completed Home content materially changes information useful to an external repository reader.

Do not add detailed SDD methodology to README; it remains SPEC-011 scope. Do not record early-computing biography as Home documentation; the fuller story remains SPEC-006 scope.

## Scope Exclusions

This plan does not implement:

- navigation, routing, React Router, calls to action, buttons, links to unfinished sections, GitHub, LinkedIn, or contact actions;
- About Me, a personal photo, avatar, or detailed personal/professional chronology;
- Technology Graph rendering, graph libraries, graph exploration, or canonical portfolio-data display;
- portfolio projects, public GitHub integration, portfolio methodology, contact features, or any SPEC-006 through SPEC-012 capability;
- backend, API, OpenAPI, MCP, authentication, persistence, analytics, localization, language switching, custom-domain, or light-theme work;
- a new styling framework, component library, design-system framework, runtime font CDN, or new dependency; or
- Matrix/Blade Runner assets or copied interfaces, visual gimmicks, or large continuous animation.

## Implementation Sequence

1. Confirm the existing test baseline and static shell contract.
2. Write and run the focused failing Home behavior tests.
3. Add the minimal `HomeHero` component and CSS Module, then replace only the temporary `App` main child.
4. Re-run focused behavior tests; extend or run the existing axe test and resolve any legitimate semantic issue.
5. Apply only token-based Home styling needed for hierarchy and responsive readability.
6. Run all automated quality gates and static-build validation.
7. Perform content, scope, responsive, zoom, contrast/readability, reduced-motion, and git-diff review.
8. Obtain explicit portfolio-owner visual approval before documentation convergence and completion.
9. Apply only approved feedback, rerun affected validation, converge warranted documentation, and complete final requirement/success-criterion review.

## Unresolved Decisions and Blockers

None. The owner has approved all Home public copy, English-only presentation, the focused hero-plus-supporting-introduction composition, and the absence of a CTA. This plan is ready for task decomposition after consistency review.
