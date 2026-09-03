# Implementation Plan: About Me

**ID:** SPEC-006  
**Internal name:** SPEC-006 — About Me  
**Public section:** Explore My Story  
**Phase:** Phase 1 — Static Portfolio  
**Spec:** `docs/specs/006-about-me/spec.md`  
**Status:** Approved

## Implementation Overview

Implement `Explore My Story` as an in-page, progressively enhanced chronological experience within the existing React single-page application. It will add the real `#about` destination, Home's `Explore My Story` link, and SiteHeader's required `Story` link while preserving the completed SPEC-004 shell and SPEC-005 copy, visual system, static GitHub Pages deployment, and backend independence.

The feature will use normal document flow as its foundation. Desktop enhancement will combine CSS Grid, `position: sticky`, and a local `IntersectionObserver`-driven active milestone state. The document itself continues to scroll normally throughout the story; there is no wheel interception, custom main-story scroll container, scroll locking, synthetic scroll progress, scroll hijacking, React Router, or animation/scrolling library.

The semantic milestone list is the complete narrative source. JavaScript only enhances active styling and the companion visual treatment. If JavaScript, sticky positioning, imagery, or transitions are unavailable, visitors still encounter the entire approved narrative in chronological document order.

## Technical Context and Platform Basis

### Existing foundation

- SPEC-004 supplies `SiteShell`, `SiteHeader`, `SiteFooter`, native CSS custom properties, CSS Modules, local fonts, dark-first visual roles, responsive foundations, and axe-core test infrastructure.
- SPEC-005 supplies the approved `HomeHero` and the existing Home public copy. SPEC-006 adds only its approved anchor link; it does not rewrite Home copy or introduce another action.
- SPEC-003 remains a separate canonical Technology/Context/Relationship boundary. It is not suitable as the Story source because this feature owns ordered, owner-approved narrative copy and visual concerns.
- The frontend remains a React/TypeScript/Vite static application deployed under `/hmeclazcke-portfolio/`, with no backend or runtime external-content dependency.

### Platform choices

Use browser-native primitives rather than a scrollytelling, animation, state-management, or routing dependency:

- CSS `position: sticky` keeps an in-flow companion region visible until its containing story region ends. It requires a non-`auto` inset and is affected by ancestor overflow, so the story layout must avoid creating an unintended scrolling ancestor. [MDN: `position`](https://developer.mozilla.org/en-US/docs/Web/CSS/position)
- `IntersectionObserver` observes milestone elements asynchronously relative to the viewport and is sufficient for discrete active-milestone changes without continuous scroll-position calculations. [MDN: Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- CSS `prefers-reduced-motion` will suppress non-essential transitions. [MDN: `prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- Semantic order, keyboard operation, resize/reflow, contrast, and motion requirements follow the applicable WCAG 2.2 foundation. [WCAG 2.2](https://www.w3.org/TR/WCAG22/)

No new dependency is justified.

## Content and Data Strategy

Create one focused feature-local TypeScript module, for example:

```text
frontend/src/components/story/storyMilestones.ts
```

It will export a readonly ordered collection and narrow types used only by the Story feature:

```ts
type StoryVisualKind = 'abstract' | 'asset' | 'time-jump';

type StoryMilestone = {
  id: string;
  period: string;
  title: string;
  lines: readonly string[];
  visual: {
    kind: StoryVisualKind;
    assetPath?: string;
    alt?: string;
  };
};
```

The module will contain exactly the approved visible labels and narrative lines from **Approved visible labels and public copy** in `spec.md`, including the intentionally separate `With sound.` and final 2026 line. It will include the ordered curated milestones and one explicit time-jump record, not inferred missing years.

This is the smallest maintainable choice: it keeps ordered narrative copy close to its presentation without coupling SPEC-003's canonical data to feature-specific chronology, wording, visual selection, or active-state behavior. It is not a generic CMS, data engine, or reusable timeline framework.

The IAC item will use an intentionally unspecified period. The Fantavision record will not receive an invented year. The data will preserve all other approved qualifiers, including no CD-ROM speed, no additional Slackware details, no UNICEN degree implication, and no unapproved employment or gaming material.

## Component Responsibilities

Use a focused feature hierarchy:

```text
App
├── SiteShell
│   ├── SiteHeader
│   │   └── Story anchor → #about
│   ├── HomeHero
│   │   └── Explore My Story anchor → #about
│   └── StorySection
│       ├── StoryTimeline
│       │   └── StoryMilestone (repeated)
│       └── StoryVisual
└── SiteFooter
```

- `StorySection` owns the semantic `section id="about"`, visible `Explore My Story` heading, feature-local active state, enhancement lifecycle, and responsive composition.
- `StoryTimeline` renders the ordered semantic chronology, likely as an `ol`.
- `StoryMilestone` renders one list item's period, title, and all approved narrative lines in document order. It accepts active presentation state but does not own observation or global state.
- `StoryVisual` renders the optional companion visual/abstract treatment for the active record. It must not be the sole location of narrative text and must not conceal the semantic list.

Do not add a generic Timeline, Card, Button, navigation framework, context provider, Redux, Zustand, or other global state. If the implementation demonstrates that `StoryTimeline` adds no real responsibility beyond one map operation, it may be folded into `StorySection`.

## Home and Header Integration

- Update `HomeHero` only to add exactly one semantic `<a href="#about">Explore My Story</a>` link. It may have button-like styling but remains a link, is visually secondary to Home's professional positioning, and preserves every existing approved Home string.
- Update `SiteHeader` to expose exactly one semantic `<a href="#about">Story</a>` link when the Story section is implemented.
- Do not add Technologies, Projects, GitHub, Contact, or any other future navigation link.
- Do not add React Router, route state, scroll handlers, or JavaScript scroll calls. Browser anchor navigation remains the behavior.

## Scroll and Active-Milestone Architecture

### Desktop and wide desktop

Use the existing `SiteShell` **wide** content-width mode. It gives the two-region Story composition room without making the feature a full-bleed global layout or requiring a SiteShell change.

At the breakpoint justified by the existing responsive system and actual layout, create a two-column Grid/Flex layout:

- the chronological semantic timeline in normal document flow on the left; and
- a companion `StoryVisual` region on the right with `position: sticky` and an intentional block-start inset.

The Story section is the sticky containing region; no ancestor in the story path should receive `overflow: hidden`, `auto`, or `scroll` in a way that turns it into an unintended scrolling ancestor. The sticky visual naturally releases when the section ends, so ordinary page scrolling continues.

The left milestone list provides enough intrinsic vertical content for the story to progress. The right region can respond to the active record through abstract graphic treatment, approved local imagery, period/title emphasis, or a restrained visual composition. It must remain supportive rather than duplicate required narrative content.

### Active-milestone enhancement

When `IntersectionObserver` is available and the desktop enhancement applies:

1. Render every milestone in the normal semantic list; initialize active state to the first record.
2. Observe each milestone element with the browser viewport as root, a narrow central root margin (final values selected during implementation), and threshold `0`.
3. Maintain a local map of currently intersecting records.
4. On observer callbacks, choose the intersecting milestone closest to the center of the observer root bounds; break an equal-distance tie by source order. This produces a deterministic active record in both scroll directions without listening to every scroll event.
5. Update only the feature-local active id when it changes. The timeline and `StoryVisual` consume that id for presentation.
6. Disconnect the observer on cleanup and recreate it only when the observed list or applicable layout changes.

The observer is an enhancement, not semantic infrastructure. If unavailable, the first visual may remain the default or visual emphasis may be omitted; every milestone remains visible and readable. No scroll position is written, no custom scroll progress is calculated, and no user scroll is prevented.

### Time jump

Represent the jump as one explicit non-invented narrative record between early formation and 2026. Its visual treatment may use deliberate spacing, abbreviated marks, an ellipsis, or compressed/accelerated timeline treatment. It communicates only that the story intentionally skips ahead; it must not imply inactivity, fabricate a professional chronology, or encode employment history.

## Responsive, Visual, and Motion Strategy

### Mobile and tablet

Use a single-column sequential layout for narrow and coarse-pointer contexts. Each milestone appears as period/title, narrative, optional associated visual, then the next milestone. Disable sticky two-column treatment where it would compete with text reflow. The exact breakpoint follows observed layout constraints and existing responsive patterns, not device-name assumptions.

Touch scrolling remains the browser's normal document scrolling. No visitor needs to understand active-marker behavior to read the story.

### Visual language

Reuse SPEC-004 semantic tokens, Space Grotesk/JetBrains Mono roles, green/amber accents, layered surfaces, restrained atmosphere, and existing focus treatment. Story-local CSS Modules may define:

- vertical line and milestone node;
- period and title hierarchy;
- active node/label/title treatment;
- deliberate time-jump treatment; and
- a meaningful final 2026 treatment for the closing line.

Active state must use more than color: combine marker geometry or border, typography weight/scale, and companion-region correspondence. Do not make the layout resemble a résumé timeline or redesign global tokens, typography, or shell structure.

### Motion and reduced motion

Use only short, non-essential opacity, node-emphasis, or restrained transform transitions. Under `prefers-reduced-motion: reduce`, remove or substantially minimize transitions and avoid transform-based movement. Narrative meaning and active/non-active legibility remain intact with transitions disabled. Do not add parallax, panning, continuous animation, scroll-controlled cinematic motion, typewriter, glitch effects, GSAP, or another animation library.

## Image and Asset Strategy

Implementation can begin with feature-local abstract/CSS visual treatment and optionally approved local assets. Do not require a third-party historical image for every milestone.

When an asset is approved, place it under a focused local location such as:

```text
frontend/src/assets/story/
```

The local data record may then reference it with meaningful alt text when it conveys information. Decorative visuals use empty alt treatment or CSS decoration as appropriate. No runtime hotlinking, copied copyrighted imagery, unapproved screenshots, fabricated images, or implicit license assumptions are permitted. The optional pixelated personal photo remains absent until its placement and use are explicitly approved.

## Accessibility Strategy

- Use a semantic `section` with `id="about"` and an `h2` titled exactly `Explore My Story`; retain logical page heading order relative to the existing Home `h1`.
- Use an ordered chronological structure (`ol`/`li`) with meaningful text in source order. All approved lines remain in the DOM and screen-reader accessible regardless of active state.
- Keep `StoryVisual` supplementary; do not hide non-active narrative from assistive technology or require visual activation to obtain text.
- Preserve native anchors, keyboard operation, visible focus, normal browser/keyboard/touch scrolling, intended contrast, and no color-only meaning.
- Confirm 200% zoom/text resizing produces no clipped sticky panel, overlap, or ordinary-content horizontal scrolling; collapse to sequential flow when needed.
- Respect reduced motion and never create a scroll trap or pointer-only interaction.

## TDD and Testing Strategy

Use the existing Vitest, React Testing Library, jsdom, and axe-core setup. Write observable tests before production behavior:

1. Extend the App-level behavior test first to expect the `Explore My Story` section heading, `id="about"`, Home `Explore My Story` link, exactly one Header `Story` link, and `href="#about"` for both links.
2. Assert no links labeled Technologies, Projects, GitHub, or Contact, and that navigation remains anchors rather than buttons.
3. Add exact-copy assertions against every approved visible label and narrative line from the feature-local collection, including `With sound.`, `Técnico en Informática Personal y Profesional`, the UNICEN line, and `And after all these years, I still have fun programming.`
4. Assert the semantic chronology includes all records in DOM order, including the deliberate time jump, even before any active state is applied.
5. Add focused feature tests proving an unavailable observer leaves complete content present and that an observer-driven active-state change updates observable active treatment without testing browser implementation internals.
6. Supply the smallest deterministic `IntersectionObserver` test double in the existing test setup or focused story test; invoke captured callback entries explicitly and verify cleanup/disconnect behavior.
7. Reuse the existing axe invocation for semantic regressions. Keep jsdom contrast limitations documented; manually review actual contrast, sticky behavior, focus, zoom, and motion.

## Validation and Owner Review

Run from `frontend/` after implementation:

```text
npm run format:check
npm run lint
npm run typecheck
npm run test:run
npm run validate:data
npm run build
```

Then run `git diff --check` from the repository root. Also complete an exact-copy audit against the authoritative approved-copy section, historical-fact audit, image-source audit for every selected asset, accessibility review, responsive review, scope-drift review, and complete diff review.

Before completion, obtain explicit portfolio-owner review at 375px, 768px, 1280px, 1536px, and 200% zoom/text resizing. Review Home and Header anchor navigation, desktop entry/progression/sticky exit, mobile natural flow, active-state clarity, readability, time-jump treatment, reduced-motion behavior, and whether the composition remains personal rather than résumé-like. Automated checks cannot replace this approval.

## Documentation Convergence

After completed implementation and owner approval, update only documentation justified by durable facts:

- `docs/architecture.md` if native progressive-enhancement scrollytelling and the desktop/mobile distinction become durable architecture; do not catalog CSS details.
- `docs/quality-gates.md` only if the feature adds a repeatable validation responsibility beyond existing gates.
- `docs/references.md` only if the MDN/WCAG sources become durable project references through implementation.
- `docs/roadmap.md` and `docs/current.md` only for actual lifecycle progress.
- `README.md` only if the completed public Story feature materially affects external-reader information under repository policy.

Do not document SDD methodology as Story content; it remains SPEC-011.

## Scope Exclusions

Do not implement a generic timeline/CMS/design system, React Router, scrolling or animation library, global state store, backend/API/runtime content source, external image hotlinks, unlicensed historical assets, Technology Graph (SPEC-007/008), Projects (SPEC-009), GitHub integration (SPEC-010), portfolio methodology (SPEC-011), Contact (SPEC-012), or trailing cursor/microinteraction work (SPEC-013).

## Expected Files and Implementation Sequence

Expected implementation changes are limited to:

```text
frontend/src/App.tsx
frontend/src/App.test.tsx
frontend/src/components/home/HomeHero.tsx
frontend/src/components/home/HomeHero.module.css
frontend/src/components/shell/SiteHeader.tsx
frontend/src/components/shell/SiteHeader.module.css
frontend/src/components/story/StorySection.tsx
frontend/src/components/story/StoryTimeline.tsx                # only if responsibility remains distinct
frontend/src/components/story/StoryMilestone.tsx               # only if responsibility remains distinct
frontend/src/components/story/StoryVisual.tsx
frontend/src/components/story/StorySection.module.css
frontend/src/components/story/storyMilestones.ts
frontend/src/components/story/*.test.tsx                       # focused Story behavior where justified
frontend/src/test/setup.ts                                     # only for a minimal observer test double
frontend/src/assets/story/                                    # only for later approved local assets
```

Sequence:

1. Confirm existing App/Home/Header tests and shell contracts.
2. Write failing observable anchor, heading, semantic chronology, and exact-copy tests.
3. Add the focused local milestone data module and semantic Story components; compose the section in `App` and add only the approved Home/Header anchors.
4. Make the focused tests green before styling and before IntersectionObserver enhancement.
5. Add token-based sequential baseline and responsive desktop sticky composition.
6. Add the local observer enhancement and its focused deterministic tests; preserve no-JavaScript content.
7. Add restrained visual, time-jump, and reduced-motion treatment without assets unless approved local assets exist.
8. Run automated gates, manual accessibility/responsive/static-build audits, and scope review.
9. Obtain portfolio-owner visual approval; make only approved SPEC-006-local refinements, rerun affected checks, then converge documentation.

## Unresolved Decisions and Blockers

No unresolved product decision blocks implementation planning. The exact visual treatment of the time jump, the selection and rights of images, optional pixelated-photo placement, and any small owner-approved visual copy/layout refinement remain implementation/visual-review decisions. The feature can begin with complete text and abstract local visual treatment, so unresolved imagery does not block implementation.

## Plan Readiness Summary

- **Proposed component structure:** `StorySection`, `StoryTimeline`/`StoryMilestone` only if individually justified, and `StoryVisual`, with local data and active state in `StorySection`.
- **Proposed timeline data structure:** one readonly feature-local ordered `StoryMilestone[]` collection containing id, period, title, exact lines, and optional visual metadata.
- **Chosen SiteShell width:** `wide`.
- **Desktop scrolling mechanism:** normal document flow plus CSS Grid/Flex and `position: sticky`; no custom scroll container or interception.
- **Active-milestone mechanism:** local `IntersectionObserver` state with a narrow viewport activation band, closest-to-center selection, deterministic source-order tie break, and cleanup.
- **Mobile fallback:** native single-column sequential chronology with optional inline visuals and no sticky dependency.
- **New dependencies:** none.
- **Image strategy:** optional approved local assets under `frontend/src/assets/story/`; abstract visual fallback; no hotlinks or unapproved third-party material.
- **TDD strategy:** behavior-first App/Story tests, exact-copy assertions, semantic DOM tests, minimal observer double, and existing axe coverage.
- **Manual review strategy:** owner review across four widths, 200% zoom, anchors, sticky progression/exit, mobile flow, reduced motion, readability, and time jump.
- **Expected files:** only the focused Home, Header, Story, test, and conditionally approved asset files listed above.
- **Unresolved blockers:** none.
- **Ready for consistency review:** yes.
