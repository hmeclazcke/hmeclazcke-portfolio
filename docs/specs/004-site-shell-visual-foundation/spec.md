# Feature Specification: Site Shell and Visual Foundation

**ID:** SPEC-004  
**Phase:** Phase 1 — Static Portfolio  
**Status:** Approved  
**Depends on:** SPEC-003 — Portfolio Data Model

## Overview

Establish the reusable visual identity and structural shell for the public portfolio before individual portfolio sections are implemented. The foundation will give later Phase 1 capabilities a coherent, accessible, responsive home without introducing their actual content or interactions.

The portfolio will be dark-first and original, taking only broad atmospheric inspiration from late-20th-century cyberpunk and retro-futuristic science fiction. References to *The Matrix* and *Blade Runner* describe mood, not assets, interfaces, or visual material to reproduce.

## Goal

After this specification is complete, visitors will encounter a distinctive, contemporary, and usable portfolio shell with a consistent visual language. Later Phase 1 features will be able to inhabit that shell and reuse its visual roles without independently inventing layout, typography, surfaces, focus states, or interaction treatments.

The result must remain a static, backend-independent GitHub Pages application and must preserve the current walking-skeleton content until later content specifications replace it.

## User Stories and Acceptance Criteria

### User Story 1 — Recognize a distinctive professional portfolio

**Priority:** P1

As a visitor, I want the portfolio to feel technical, distinctive, sophisticated, and contemporary so that it communicates a senior software engineer's identity before I explore individual sections.

**Independent Test**

A visual review of the rendered shell confirms a dark-first, atmospheric, readable identity with deliberate hierarchy and without copied movie material or cliché-heavy decoration.

**Acceptance Criteria**

1. **Given** I open the portfolio, **when** the shell renders, **then** I encounter a cohesive dark-first visual identity with layered surfaces, restrained accents, and clear content hierarchy.
2. **Given** the atmospheric references inform the design, **when** I view the page, **then** no movie imagery, logos, copied interfaces, screen compositions, or other proprietary visual assets are present.
3. **Given** I read the temporary or future content, **when** decorative visual treatments are present, **then** they do not diminish content readability or usability.

### User Story 2 — Use a stable portfolio structure

**Priority:** P1

As a visitor, I want a clear site structure so that I can understand the portfolio's identity and where current and future content belongs.

**Independent Test**

The rendered page exposes semantic header, main-content, and footer regions, while any implemented navigation control is usable and no unavailable feature is represented by a broken or misleading link.

**Acceptance Criteria**

1. **Given** I use the portfolio, **when** I inspect its page structure, **then** I can identify site identity/header, main content, and footer regions.
2. **Given** later sections require primary navigation, **when** they are introduced, **then** the shell can accommodate them without redesigning its structural regions.
3. **Given** a future destination is not implemented, **when** I use the current shell, **then** I am not offered a broken link or a false promise of that destination.

### User Story 3 — Read and operate the shell across devices

**Priority:** P1

As a visitor using a keyboard, touch device, or different viewport size, I want the shell to remain readable and operable so that its visual identity does not exclude me.

**Independent Test**

Representative narrow, medium, and wide viewport review, keyboard testing of implemented interactive elements, and accessibility-focused automated checks demonstrate that the shell remains usable.

**Acceptance Criteria**

1. **Given** I view ordinary page content on a narrow viewport, **when** the shell adapts, **then** text remains readable and ordinary content does not cause horizontal scrolling.
2. **Given** I use a keyboard, **when** I reach an implemented interactive shell element, **then** it is operable and has a clearly visible focus state.
3. **Given** I resize text or use a touch-oriented layout, **when** I consume or operate the shell, **then** content and controls remain usable.

### User Story 4 — Build future sections consistently

**Priority:** P2

As a developer, I want reusable visual roles and layout foundations so that later Phase 1 features can be added consistently without duplicating arbitrary styling decisions.

**Independent Test**

The implementation can apply a shared visual role or layout primitive to shell elements, and a documented visual review confirms no per-component visual vocabulary is needed for the shell.

**Acceptance Criteria**

1. **Given** a later feature needs a common visual role, **when** it uses the foundation, **then** it can align with established spacing, typography, surface, border, focus, and interaction conventions.
2. **Given** a foundational visual role changes, **when** the system evolves, **then** unrelated components do not require manual replacement of scattered arbitrary values.
3. **Given** a later feature needs a distinctive experience such as the Technology Graph, **when** it is implemented, **then** the foundation supports it without predetermining or constraining its feature-specific presentation.

## Visual Identity Requirements

The visual identity MUST be original and dark-first. It MUST combine:

- deep dark or near-black visual foundations;
- layered dark surfaces;
- restrained luminous accents;
- technical or computational visual cues;
- subtle industrial or futuristic geometry;
- selective terminal-like or monospaced visual language;
- strong contrast;
- contemporary web-application polish; and
- deliberate whitespace and hierarchy.

The result MUST feel technical, distinctive, sophisticated, contemporary, slightly atmospheric, and appropriate for a senior software engineer portfolio.

The result MUST NOT feel like a 1990s web-page recreation, hacker-movie parody, gaming HUD covering every surface, neon-heavy cyberpunk cliché, whole-site terminal emulator, or direct *The Matrix* or *Blade Runner* replica.

Movie references are mood-only. The portfolio MUST NOT reproduce or imitate proprietary movie interfaces, logos, imagery, screen compositions, character designs, stills, clips, or other copyrighted visual assets.

Readability and usability MUST take priority over decorative atmosphere.

### Dark-First Visual Roles

The foundation MUST define reusable, centralized semantic roles that clearly distinguish:

- global background;
- elevated or layered surfaces;
- primary text;
- secondary text;
- interactive elements;
- borders and separators;
- accent emphasis;
- focus state; and
- feedback or status states where later required.

Components MUST NOT rely on scattered arbitrary visual values to express these roles. The implementation mechanism and concrete visual values are deferred to planning.

### Typography

The visual language MUST support both highly readable content typography and a technical or terminal-like accent typography where appropriate. Technical styling MUST remain selective.

Long-form content MUST NOT become difficult to read through excessive monospaced typography, condensed typography, glow, uppercase text, or decorative effects.

## Site Shell Requirements

The reusable shell MUST provide conceptual regions for:

- site identity and header;
- future primary navigation;
- main content; and
- footer.

### Public Site Identity

The primary public site identity MUST be `Hernán Meclazcke`.

The technical handle `hmeclazcke` MAY be used as a secondary visual or accent identity. It MUST NOT replace the personal name as the primary public identity.

This requirement does not prescribe header composition, typography, logo or wordmark design, fonts, colors, or layout. The portfolio MUST NOT introduce an invented brand name or company identity.

The shell MUST use semantic page structure and appropriate heading hierarchy. It MUST be extensible for later roadmap sections without exposing broken links, fake navigation, or unavailable functionality.

SPEC-004 MUST NOT implement the actual content of Home, About Me, Technology Graph, Technology Graph Exploration, Portfolio Projects, Public GitHub Integration, How This Portfolio Was Built, or Contact and External Profiles.

The existing `Hello, world!` heading and placeholder paragraph MAY remain as temporary shell content. They MUST NOT be presented as final Home content.

## Layout and Responsive Requirements

The foundation MUST support:

- clear content hierarchy;
- sensible readable content widths;
- full-width visual areas for future capabilities such as the Technology Graph;
- reusable spacing relationships;
- consistent alignment;
- layered surfaces; and
- responsive layouts.

The shell MUST remain usable on mobile, tablet-sized layouts, desktop, and larger desktop displays. It MUST not assume a single desktop viewport.

For ordinary page content, the shell MUST avoid horizontal scrolling, preserve readable text at narrow widths, and maintain usable touch-sized interactive controls. When later navigation items are introduced, navigation MUST remain usable rather than crowding content. Decorative atmosphere MUST degrade gracefully on smaller screens.

The specification intentionally does not prescribe exact breakpoints or a mobile-navigation mechanism.

## Accessibility Requirements

The visual foundation MUST target WCAG 2.2 AA where applicable. At minimum, it MUST provide:

- sufficient text contrast;
- sufficient non-text and interface contrast;
- clearly visible keyboard focus;
- keyboard-operable implemented interactive shell elements;
- semantic page structure;
- appropriate heading hierarchy;
- no information conveyed solely through color;
- usable text resizing;
- reduced-motion handling for non-essential motion when motion is introduced; and
- no rapid flashing visual effects.

Accessibility is a foundational requirement and MUST NOT be deferred to final polish.

## Interaction and Motion Requirements

The identity MAY use subtle motion or luminous effects where they reinforce the technical atmosphere. Such effects MUST be restrained, optional to comprehension, and non-disruptive to reading.

Motion MUST respect reduced-motion preferences when introduced. Large continuous decorative animations are not required. The specification does not require Matrix-style code rain or any literal movie effect.

## Functional Requirements

### Visual Foundation

- **FR-001:** The public portfolio MUST establish an original dark-first visual identity suitable for a senior software engineer portfolio.
- **FR-002:** The identity MUST use centralized semantic visual roles that later features can reuse for backgrounds, surfaces, text, interactions, borders, accents, focus, and future feedback states.
- **FR-003:** The identity MUST prioritize legibility, contrast, hierarchy, whitespace, and usability over decorative effects.
- **FR-004:** The identity MUST use technical, industrial, futuristic, terminal-like, or monospaced cues selectively rather than as an all-page treatment.
- **FR-005:** The identity MUST NOT use copied or imitative movie assets, interfaces, logos, imagery, or compositions.
- **FR-006:** The foundation MUST avoid arbitrary per-component visual values for shared visual concepts.

### Shell and Layout

- **FR-007:** The application MUST provide reusable semantic header, main-content, and footer regions, with a conceptual location for future primary navigation.
- **FR-008:** The shell MUST accommodate later Phase 1 sections without implementing their feature content or requiring structural redesign.
- **FR-009:** The shell MUST NOT expose broken links, fake navigation, or unavailable feature destinations.
- **FR-010:** The shell MUST support readable constrained content areas and full-width feature areas without requiring a single fixed viewport size.
- **FR-011:** The shell MUST provide reusable spacing, alignment, surface, border, typography, focus, and interaction foundations without creating a speculative component library.
- **FR-012:** The existing walking-skeleton content MAY be visually transformed but MUST remain temporary and MUST NOT become real Home content.

### Responsiveness, Accessibility, and Motion

- **FR-013:** The shell MUST remain usable on mobile, tablet-sized, desktop, and larger desktop layouts, without horizontal scrolling for ordinary content.
- **FR-014:** The shell MUST provide sufficient text and interface contrast and clearly visible keyboard focus.
- **FR-015:** Implemented interactive shell elements MUST be semantic and keyboard operable, and no meaning-critical information may rely on color alone.
- **FR-016:** Text resizing and touch-oriented use MUST remain practical across supported layouts.
- **FR-017:** Any non-essential motion or luminous effect MUST be restrained, non-flashing, optional to comprehension, and respect reduced-motion preferences.

### Architecture and Validation

- **FR-018:** The visual foundation MUST preserve the static, backend-independent React/Vite application and GitHub Pages compatibility.
- **FR-019:** The foundation MUST NOT render or duplicate canonical portfolio data from SPEC-003 as a portfolio feature.
- **FR-020:** Completion validation MUST include automated shell and accessibility-relevant checks where practical, representative responsive review, visual review, existing quality gates, production build, and GitHub Pages compatibility review.

## Edge Cases

- A visitor with reduced-motion preferences must receive a usable experience even when visual effects are introduced.
- A narrow viewport must preserve ordinary-content readability and prevent decorative layers from forcing horizontal scrolling or obscuring controls.
- A larger viewport must not make primary content uncomfortably wide merely because more space is available.
- A keyboard-only visitor must be able to identify focus and operate every implemented shell control.
- If no usable current destination exists for future navigation, the shell must omit or otherwise avoid presenting that destination as available.
- Decorative visual cues must remain non-essential when images, effects, or enhanced rendering are unavailable.
- The shell must not require a backend, external API, GitHub availability, or canonical-data rendering to remain usable.

## Scope

### In Scope

- Original dark-first visual identity and reusable visual foundation.
- Semantic public site shell with header, future-navigation area, main content, and footer.
- Reusable layout, spacing, typography, surface, border, focus, interaction, and responsive foundations genuinely required by the shell.
- Accessibility and restrained-motion requirements for the foundation.
- Visual and responsive review requirements in addition to existing automated quality gates.
- Visual transformation of the existing walking-skeleton content without turning it into final portfolio content.

### Out of Scope

- Final Home content.
- About Me content or personal photo integration.
- Technology Graph rendering, graph library selection, graph interactions, coordinates, or layout.
- Canonical portfolio-data presentation.
- Project cards containing real project content.
- Live GitHub information.
- Contact implementation.
- Backend, APIs, OpenAPI, MCP, authentication, persistence, analytics, custom domain, or SEO work beyond what is inherently necessary for the shell.
- Movie imagery, logos, clips, copied movie UI, or other proprietary visual assets.
- A large speculative design system or component-library implementation.
- Concrete CSS architecture, CSS libraries, component libraries, fonts, exact colors, exact breakpoints, animation libraries, icon libraries, or graph libraries.

## Assumptions

- SPEC-001 provides the React, TypeScript, Vite, test, lint, formatting, and static-build foundation.
- SPEC-002 provides the deployed GitHub Pages-compatible static application and temporary walking-skeleton content.
- SPEC-003 provides canonical portfolio data independently of presentation and does not require rendering during this specification.
- Dark mode is the intentional primary Phase 1 experience.
- Detailed content and feature behavior remain the responsibility of their later approved specifications.
- The public site continues to work without a project backend or external-service availability.

## Future Compatibility

The shell and visual foundation MUST support, without implementing, these later Phase 1 specifications:

- SPEC-005 — Home;
- SPEC-006 — About Me;
- SPEC-007 — Technology Graph;
- SPEC-008 — Technology Graph Exploration;
- SPEC-009 — Portfolio Projects;
- SPEC-010 — Public GitHub Integration;
- SPEC-011 — How This Portfolio Was Built; and
- SPEC-012 — Contact and External Profiles.

## Success Criteria

- **SC-001:** The portfolio presents an original, dark-first, technically sophisticated visual foundation without copied movie assets or imitative movie UI.
- **SC-002:** The rendered shell has identifiable semantic header, main, and footer regions and can accommodate future navigation without broken or misleading destinations.
- **SC-003:** The temporary SPEC-002 walking-skeleton content remains functionally available while not being represented as final Home content.
- **SC-004:** The foundation supplies reusable semantic visual and layout roles so later features do not need to invent shared styling independently.
- **SC-005:** Representative mobile, tablet, desktop, and larger desktop review confirms readable, usable, responsive shell behavior without ordinary-content horizontal scrolling.
- **SC-006:** Accessibility review and applicable automated checks demonstrate adequate contrast, visible focus, semantic structure, keyboard operation for implemented controls, text-resize usability, and reduced-motion treatment where motion exists.
- **SC-007:** Existing frontend quality gates and production build pass, and the result remains compatible with GitHub Pages deployment.
- **SC-008:** No Home, About Me, graph, canonical-data presentation, project, GitHub, contact, backend, API, persistence, or other later-spec feature is implemented.

## Completion Criteria

SPEC-004 may be marked complete only when:

1. all functional requirements and success criteria are validated;
2. the visual foundation and semantic shell are visibly reviewed against the identity, readability, and originality requirements;
3. responsive and accessibility requirements are validated through appropriate automated checks and representative manual review;
4. all applicable existing frontend quality gates and the production build pass;
5. GitHub Pages compatibility is preserved;
6. authoritative documentation affected by finalized implementation decisions is updated; and
7. scope review confirms that no later Phase 1 feature, backend capability, proprietary movie material, or speculative component library has been introduced.
