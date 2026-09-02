# Implementation Plan: Site Shell and Visual Foundation

**ID:** SPEC-004  
**Phase:** Phase 1 — Static Portfolio  
**Spec:** `docs/specs/004-site-shell-visual-foundation/spec.md`  
**Status:** Approved

## Summary

Establish the Phase 1 public shell as a small, dark-first React composition with an original technical and atmospheric identity. The implementation will use native modern CSS, semantic design tokens, CSS Modules, self-hosted open-source variable fonts, and a focused accessibility test layer.

The shell will render the approved public identity, `Hernán Meclazcke`, with `hmeclazcke` available as a secondary technical accent. It will preserve the SPEC-002 `Hello, world!` walking skeleton as temporary main content, while adding semantic header, main, and footer landmarks. No navigation destination, portfolio data, graph, or later feature will be rendered.

## Technical Context

### Existing Foundation

- SPEC-001 provides React, TypeScript, Vite, Vitest, React Testing Library, jsdom, ESLint, Prettier, and npm-managed dependencies.
- SPEC-002 establishes the static Vite build and GitHub Pages project-site base path at `/hmeclazcke-portfolio/`.
- SPEC-003 establishes static root canonical data and `npm run validate:data`; its data remains independent of this visual shell and must not be presented here.
- The public site remains static and backend-independent.

### Governing References

This plan follows the project references for Vite, React, TypeScript, Vitest, Testing Library, WCAG 2.2, GitHub Pages, and GitHub Actions. It additionally aligns with:

- Vite's native CSS and CSS Modules support;
- WCAG 2.2 guidance for contrast, text resizing, focus, target sizing, and non-flashing interaction;
- MDN guidance for `prefers-reduced-motion`;
- Primer's distinction between raw/base values and reusable functional tokens;
- Carbon's role-based dark-theme token model as a reference, not a dependency; and
- Fontsource's npm-based self-hosting of variable fonts.

## Technical Decisions

### TD-001 — Native CSS, Semantic Tokens, and CSS Modules

Use modern native CSS only:

- global CSS for document-level reset, base behavior, typography defaults, and shared token definitions;
- CSS custom properties for shared semantic visual tokens; and
- CSS Modules for component-specific shell styles.

Do not introduce Tailwind, Sass, styled-components, CSS-in-JS, Carbon React, Primer React, another component library, or a design-system framework.

Vite directly supports imported CSS and `.module.css` files, and the current small UI surface does not justify an additional styling runtime, compiler, or component dependency.

### TD-002 — Dark-First Browser Color Scheme

Declare a dark browser/document color-scheme expectation through standard CSS so native browser surfaces and controls align with the intentional Phase 1 dark-first experience.

Do not implement a light-theme toggle, theme state, persistence, or a second palette. A future approved specification may introduce additional themes.

### TD-003 — Self-Hosted Variable Fonts

Install Fontsource variable-font npm packages for:

- `@fontsource-variable/space-grotesk` for readable primary/display sans-serif typography; and
- `@fontsource-variable/jetbrains-mono` for selective technical labels and accent text.

Import only the normal weight-axis resources and required language subset used by the shell. Fontsource packages bundle fonts with the static application, avoid a third-party runtime font request, and retain robust system-font fallback stacks.

JetBrains Mono must not be used as the general body typeface.

### TD-004 — Focused Automated Accessibility Check

Add `axe-core` as the single accessibility-testing dependency. Run it against a fully rendered shell in the existing Vitest/jsdom and React Testing Library environment.

The test will assert no applicable axe violations for the semantic shell. The `color-contrast` rule will be explicitly disabled for the jsdom test because axe documents that this rule is not reliable in jsdom; manual rendered-browser review will validate contrast instead. This limitation must be documented in the test or adjacent implementation documentation.

No end-to-end framework is introduced by this specification.

## Styling Architecture

### Global CSS Responsibilities

Create a focused global style entry that:

- imports the two selected Fontsource resources;
- imports semantic tokens before global rules;
- applies a small reset and box-sizing model;
- establishes the dark `color-scheme`, canvas background, primary text defaults, text rendering, and body sizing;
- defines baseline links, selection, and `:focus-visible` behavior; and
- provides reduced-motion overrides.

Global CSS must not become a dumping ground for component layout or arbitrary component styles.

### CSS Module Responsibilities

Each shell component receives a neighboring CSS Module only when it needs component-specific layout or decorative styling. Modules consume semantic tokens rather than raw color, spacing, or typography values.

The shell does not require a generic Button, Card, Navigation, or other speculative component library. Shared primitives are limited to styles and components directly required by the shell.

## Visual Tokens and Palette

### Token Model

Use a small two-level token system where practical:

1. raw values provide the compact dark palette and scale inputs; and
2. semantic tokens describe intended roles consumed by CSS.

Raw values remain confined to `tokens.css`. Components consume semantic tokens such as `--color-bg-canvas` and `--color-text-primary`, not raw values or per-component literal colors.

### Raw Palette Values

Use these initial raw values:

| Role family | Value | Purpose |
|---|---:|---|
| Near-black green graphite | `#07110e` | Canvas foundation |
| Dark green graphite | `#0d1916` | Primary surface base |
| Elevated green graphite | `#13231e` | Elevated surface base |
| Cool deep green | `#27433a` | Subtle border and line base |
| Muted green-gray | `#4e7767` | Strong border base |
| High-contrast neutral | `#f2f7f4` | Primary text base |
| Muted cool neutral | `#b5c7c0` | Secondary text base |
| Luminous green | `#63f2a6` | Primary technical accent |
| Amber/copper | `#f5b971` | Secondary atmospheric accent |
| High-visibility lime | `#d6ff70` | Focus base |
| Deep selection green | `#1d4d3a` | Selection/highlight base |

These values are intentionally restrained: luminous colors are accents, not dominant surfaces. Glow may support accent emphasis but must never be the sole contrast mechanism.

### Semantic Color Tokens

Define at least these semantic custom properties:

```text
--color-bg-canvas
--color-bg-surface
--color-bg-surface-elevated
--color-text-primary
--color-text-muted
--color-border-subtle
--color-border-strong
--color-accent-primary
--color-accent-secondary
--color-focus
--color-selection
```

Map semantic roles to the raw palette in `tokens.css`. Intended primary text, muted text, accent text, focus indicator, and interface-border combinations must be checked against their actual adjacent backgrounds during implementation to meet WCAG 2.2 AA where applicable. The target is at least 4.5:1 for ordinary text and 3:1 for required non-text interface indicators. No decorative glow is used in place of these contrasts.

### Non-Color Tokens

Create only the scales needed by this shell:

```text
--space-1 through --space-6
--radius-sm, --radius-md, --radius-lg
--shadow-surface, --shadow-accent
--content-width-readable, --content-width-wide
--font-sans, --font-mono
--font-size-meta, --font-size-body, --font-size-heading-2, --font-size-heading-1, --font-size-identity
```

Use `clamp()` for the identity and heading sizes, and optionally for fluid horizontal padding where it improves interpolation between narrow and wide layouts. Keep body copy readable and conventional; do not use excessive uppercase, tracking, glow, or condensed styles for long-form text.

## Typography

### Typography Roles

| Role | Family | Intended use |
|---|---|---|
| Site identity | Space Grotesk Variable | Primary public identity |
| Primary heading | Space Grotesk Variable | Main temporary heading and future section headings |
| Secondary heading | Space Grotesk Variable | Supporting headings |
| Body copy | Space Grotesk Variable | Readable paragraphs and long-form content |
| Small/meta text | Space Grotesk Variable | Supporting information |
| Technical accent | JetBrains Mono Variable | Secondary handle, labels, and restrained technical detail |

Provide system fallbacks for each role. Use a normal `font-display` behavior supplied by Fontsource so text remains visible while web fonts load.

## Site Shell Design

### Component Boundary

Implement only these focused React components:

```text
App
└── SiteShell
    ├── SiteHeader
    ├── main (temporary existing content supplied by App)
    └── SiteFooter
```

- `SiteShell` owns the semantic page landmarks and shared shell layout.
- `SiteHeader` presents `Hernán Meclazcke` as primary identity and may present `hmeclazcke` as secondary technical accent.
- `SiteFooter` provides the semantic footer boundary and minimal non-feature shell treatment. It must not introduce contact links or other future content.
- `App` preserves the temporary `Hello, world!` heading and existing Lorem Ipsum paragraph inside shell main content.

Use native semantic `header`, `main`, and `footer` elements. Use heading levels logically: the temporary `Hello, world!` remains the page `h1`; the identity must not create a competing document `h1` unless the final heading structure warrants it. Prefer native elements over ARIA; add ARIA only where native semantics do not express the required meaning.

### Identity and Navigation

The primary public identity is `Hernán Meclazcke`. `hmeclazcke` may appear as a secondary technical accent only. Do not create a logo, company identity, or invented brand.

Render no primary-navigation links or navigation control in SPEC-004. This is preferable to empty, disabled, broken, or fake navigation. Structure the header so an actual navigation region can be added by a later approved specification without reworking the shell layout.

### Temporary Content and Data Boundary

Move the existing walking-skeleton content into the shell main region without changing its text or reclassifying it as Home content. Do not render Technologies, Contexts, Relationships, portfolio projects, GitHub data, or feature placeholders.

The existing static canonical-data access boundary remains untouched and backend-independent. The shell does not depend on it.

### Decorative Atmosphere

Use CSS-only, non-semantic decoration sparingly:

- restrained gradients on canvas or surfaces;
- fine borders and low-opacity grid or technical-line motifs;
- limited accent glow;
- subtle geometric framing; and
- non-interactive pseudo-elements.

Decorations must remain behind content, must not capture pointer events, must not interfere with keyboard focus, and must not be required to understand content. Do not use downloaded/generated movie imagery, Matrix code rain, full-page CRT scanlines, readability-harming glitches, particle systems, large continuous animation, or animation libraries.

## Responsive Layout

Use Grid and Flexbox only where they solve concrete shell layout needs. Center ordinary content in a readable container with fluid inline padding and reserve a full-width layout utility for future feature regions such as the graph; do not render a graph region now.

Use these review widths:

- 375px narrow mobile;
- 768px tablet/intermediate;
- 1280px desktop; and
- 1536px wide desktop.

Implement only two explicit layout breakpoints:

- around 48rem, for shell spacing and identity alignment when tablet space becomes available; and
- around 80rem, for wide-content and shell density adjustments.

Fluid values handle intermediate sizes. Ordinary content must not overflow horizontally at any review width, and wide screens must retain a comfortable reading measure.

## Accessibility Strategy

### Semantic and Keyboard Baseline

- Use `header`/banner, `main`, and `footer`/contentinfo landmarks through native HTML.
- Preserve one clear page `h1` in temporary content and use later headings in logical order.
- Use `:focus-visible` with `--color-focus`, a strong non-color focus treatment, and sufficient adjacent contrast.
- If an interactive shell element is added, use a native interactive element, keyboard operation, a visible focus state, and a usable minimum pointer target. No interactive element is required solely to make the shell appear interactive.
- Do not rely on color alone for meaning.

### Contrast, Scaling, and Motion

- Validate text and required interface-indicator contrast manually against actual rendered surfaces.
- Preserve usable layout and content at browser text enlargement and at 200% zoom; test the narrow viewport at enlarged text.
- Declare dark `color-scheme` for browser-native UI alignment.
- Include a `@media (prefers-reduced-motion: reduce)` rule that removes or substantially reduces non-essential transition and animation durations.
- Introduce no rapid flashing or content-critical motion.

Automated axe checks do not replace manual keyboard, focus, contrast, zoom, reduced-motion, or visual-atmosphere review.

## Motion Strategy

Prefer no motion beyond short, subtle CSS transitions for implemented interactive feedback. Any transition must be non-essential to comprehension and removed or substantially reduced under `prefers-reduced-motion: reduce`.

No animation library, autoplaying effect, large continuous decorative animation, or visual information encoded only through movement is introduced.

## Testing Strategy

Follow repository TDD.

### Shell Behavior TDD

1. Update or add focused React Testing Library tests that initially fail because the current application lacks the semantic shell.
2. Assert observable behavior using roles and accessible names:
   - banner/header landmark;
   - main landmark;
   - contentinfo/footer landmark;
   - primary identity `Hernán Meclazcke`;
   - secondary handle `hmeclazcke` when rendered;
   - unchanged `Hello, world!` heading and placeholder paragraph; and
   - absence of rendered navigation links to unavailable sections.
3. Implement the smallest `SiteShell`, `SiteHeader`, and `SiteFooter` composition needed to make those tests pass.
4. Refactor only with tests green.

Tests must not query CSS Module class names or styling implementation details.

### Accessibility TDD

After semantic shell behavior is green:

1. Add a focused, initially failing axe test for the rendered shell.
2. Configure the smallest correct axe invocation for jsdom and document disabled non-reliable rules, including `color-contrast`.
3. Correct semantic violations using native HTML first.
4. Re-run the accessibility test successfully.

## Visual Validation

Automated tests are necessary but insufficient. Before completion, perform and record manual review at 375px, 768px, 1280px, and 1536px.

At every review width, verify:

- no ordinary-content horizontal scrolling;
- readable line lengths, text sizing, and spacing;
- clear header/main/footer hierarchy;
- accurate primary identity and restrained secondary handle treatment;
- distinguishable canvas, surface, elevated-surface, border, and accent hierarchy;
- restrained technical/cyberpunk atmosphere rather than a retro recreation or movie imitation;
- readable placeholder content; and
- visible focus for any implemented interactive element.

Also manually verify actual contrast combinations, keyboard operation, 200% zoom/text resizing, and reduced-motion behavior. Obtain a portfolio-owner visual approval checkpoint before marking SPEC-004 complete.

## GitHub Pages Compatibility

Preserve the existing Vite project-site base path, static build, canonical-data validation, and existing Pages CI/CD workflow. Font files and styles must be bundled into the static artifact; the shell must not rely on a backend, CDN-hosted font service, or external styling service at runtime.

## Expected Repository Changes

Only create or modify files required by the shell implementation, expected to include:

```text
frontend/
├── package.json                              # Fontsource and axe-core dependencies
├── package-lock.json
└── src/
    ├── styles/
    │   ├── tokens.css                        # raw and semantic tokens
    │   └── global.css                        # document base behavior and shared rules
    ├── components/
    │   └── shell/
    │       ├── SiteShell.tsx
    │       ├── SiteShell.module.css
    │       ├── SiteHeader.tsx
    │       ├── SiteHeader.module.css
    │       ├── SiteFooter.tsx
    │       └── SiteFooter.module.css
    ├── App.tsx
    ├── App.test.tsx
    └── test/                                 # axe helper only if duplication justifies it
```

The exact minimal file set may be smaller if component styles can remain focused without reducing clarity. Do not create components, assets, routes, data copies, or style abstractions unrelated to this shell.

## Documentation Updates

Only after successful implementation, local validation, visual review, and portfolio-owner approval:

- update `docs/architecture.md` with the actual CSS/token and shell boundary;
- update `docs/quality-gates.md` if accessibility tooling adds a repeatable quality-gate responsibility;
- update `docs/references.md` with materially influential Fontsource, axe-core, MDN, Primer, or Carbon references;
- update `docs/roadmap.md` and `docs/current.md` with the actual SPEC-004 lifecycle state; and
- update `README.md` only if the completed visual foundation materially changes useful external developer information.

## Risks and Mitigations

### Risk — Atmosphere harms readability or becomes derivative

**Mitigation:** Use restrained accents and decoration behind readable content; explicitly exclude proprietary movie material, code rain, full-page scanlines, and visual effects that obscure content. Require manual visual review and portfolio-owner approval.

### Risk — Visual values drift across components

**Mitigation:** Keep raw palette values and semantic tokens centralized in `tokens.css`; consume semantic roles in CSS Modules.

### Risk — Accessibility is inferred from automated tests

**Mitigation:** Use axe only for applicable semantic checks and explicitly supplement it with manual contrast, keyboard, focus, zoom, reduced-motion, and viewport review.

### Risk — Font loading creates an external dependency or invisible text

**Mitigation:** Bundle minimal Fontsource variable-font resources through npm and retain system fallbacks.

### Risk — Future navigation is implied prematurely

**Mitigation:** Render no navigation until destinations exist, while retaining a header layout that can host it later.

### Risk — Scope expands into feature content or a design system

**Mitigation:** Limit components to the shell, preserve placeholder main content, and introduce only tokens/primitives directly required by that shell.

## Scope Validation

This plan satisfies SPEC-004 without implementing:

- final Home, About Me, personal-photo, graph, graph-library, graph-exploration, portfolio-project, GitHub, contact, or canonical-data presentation features;
- routing or React Router;
- backend, API, OpenAPI, MCP, authentication, persistence, analytics, custom-domain, or runtime external-service dependencies;
- light-theme state or persistence;
- movie imagery, copied movie UI, code rain, particle systems, or large continuous animations; or
- a large component or design-system library.

## Plan Completion Condition

This plan is ready for task decomposition when:

1. native CSS, custom properties, CSS Modules, the dark-first palette, and typography loading strategy are explicit;
2. the shell components, landmarks, identity, temporary content, and no-navigation decision are explicit;
3. semantic token, responsive-layout, motion, and accessibility responsibilities are explicit;
4. behavior and accessibility TDD sequences are explicit;
5. manual visual, responsive, contrast, zoom, keyboard, and reduced-motion validation is explicit;
6. dependencies are limited to the two Fontsource packages and axe-core; and
7. no unresolved decision blocks task decomposition.
