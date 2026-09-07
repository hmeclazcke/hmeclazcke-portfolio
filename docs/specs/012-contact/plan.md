# Implementation Plan: Contact

**Specification:** SPEC-012 - Contact
**Status:** Complete - owner visual acceptance passed

## Approach

1. Extend the existing `SiteFooter` rather than introduce a separate Contact section. Give that semantic footer the `#contact` destination and retain only the approved profile icons and decorative Piedra Movediza asset.
2. Load the owner-supplied assets from the existing public asset location using Vite's base-safe asset convention. Keep the image decorative and the SVG icons inside accessible external hyperlinks.
3. Add restrained responsive footer styling within the established graphite/green system. The icon cluster remains toward the left, with the non-interactive illustration behind it and no fixed-height layout.
4. Extend the existing major-section navigation model with `contact`. Preserve its absolute section-root targets and header offset. Add a final document-bottom rule so a short footer is correctly active and Graph-next reveals it without artificial whitespace.
5. Add behavior-focused tests for footer content/link semantics and the expanded navigation model, then run the existing quality gates once.

## Constraints

- Reuse the footer and existing navigation source of truth; do not create an alternate Contact component or navigation model.
- No dependency, backend, runtime external asset, or GitHub API.
- Keep the approved SVG chevrons and all prior Home, Story, Graph, and mobile behavior intact.
- Do not use viewport-specific magic numbers; use document geometry for the final-section rule.

## Validation

- Focused React Testing Library and navigation-model tests cover observable footer and final-section behavior.
- The existing full frontend/data gates and `git diff --check` run once after the implementation stabilizes.

## Outcome

The existing footer is the final `#contact` destination with approved LinkedIn and GitHub links and the decorative Piedra Movediza composition. Major-section navigation follows Home, Story, Technology Graph, Contact; Contact Previous returns to Graph and Contact Next is unavailable. Owner review also identified and validated the resolution of the footer hit-testing issue: the floating SectionNavigation now renders at the shell overlay level above the footer stacking context. All focused tests, full quality gates, and owner visual acceptance passed.
