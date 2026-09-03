# Implementation Plan: About Me

**ID:** SPEC-006  
**Internal name:** SPEC-006 — About Me  
**Public section:** Explore My Story  
**Phase:** Phase 1 — Static Portfolio  
**Spec:** `docs/specs/006-about-me/spec.md`  
**Status:** Approved

## Revision Context

Portfolio-owner review rejected the prior long-document desktop timeline at T045. This revision supersedes the previous CSS-sticky plus `IntersectionObserver` desktop architecture. It does not change approved narrative copy, naming, `#about` anchors, mobile natural scrolling, image restrictions, static deployment, or scope exclusions.

## Implementation Overview

Keep `Explore My Story` in the existing React/Vite document, with the existing semantic Home and Header anchors. On eligible fine-pointer desktop layouts, `#about` becomes one approximately viewport-sized visual stage. The stage holds a left progress timeline and right narrative/visual companion. Its active milestone is local React state.

Ordinary page scrolling brings the visitor to the stage. Only while the stage is the active eligible viewport experience, a qualifying vertical wheel or trackpad gesture changes one milestone in the gesture direction and prevents that qualifying event's normal page movement. The browser viewport remains stationary between milestones. At the first milestone for an upward gesture and final milestone for a downward gesture, the handler does not prevent default, releasing ordinary document scrolling naturally.

On mobile, coarse-pointer, narrow, 200%-zoom-constrained, no-JavaScript, or unsupported environments, render the complete semantic timeline sequentially in normal document flow. No scrolling library, router, custom main scroll container, or global state is required.

## Data and Component Strategy

Retain one feature-local readonly `storyMilestones.ts` collection containing stable id, exact approved period/title/lines, and minimal visual metadata. It remains separate from SPEC-003 and is the sole source of visible approved copy.

Use focused components only:

```text
App
└─ SiteShell (wide)
   ├─ SiteHeader — Story → #about
   ├─ HomeHero — Explore My Story → #about
   └─ StorySection
      ├─ semantic chronological list (all milestones in DOM)
      ├─ desktop progress timeline / active panel
      └─ native Previous / Next controls
```

`StorySection` owns local active index, eligibility detection, bounded gesture listener lifecycle, keyboard/control actions, and fallback composition. A separate `StoryVisual` remains justified only for the companion visual responsibility. Do not add a generic timeline, CMS, state provider, Redux/Zustand, or routing abstraction.

## Desktop Viewport-Stage Interaction

### Eligibility and entry

Enable the controlled desktop mode only when all conditions hold:

1. the layout has sufficient width and a fine pointer according to the established responsive system;
2. the Story stage is in its intentional active viewport region; and
3. the component has initialized normally.

Use one local stage-region observation mechanism, such as `IntersectionObserver`, only to determine whether the stage is eligible for input handling. It must not choose milestones or create long scroll-driven milestone segments. If unavailable, leave the semantic sequential fallback intact.

The exact viewport-region threshold is an implementation detail validated visually. It must avoid consuming wheel input merely because any edge of the Story is visible.

### Deterministic gesture algorithm

Use one non-passive `wheel` listener attached only while the desktop stage is eligible and active; clean it up on deactivation and unmount.

For each wheel event:

1. Ignore horizontal-dominant, zero, modifier-driven zoom, and below-threshold deltas.
2. Normalize `deltaY` across pixel, line, and page modes into a direction only: forward (`+1`) or backward (`-1`). Do not derive a milestone count from delta magnitude.
3. If a short local gesture lock/cooldown is active, do not advance again. The lock is reset after a small bounded interval and does not globally block scrolling.
4. At index `0` with backward input, or the final index with forward input, do not call `preventDefault`; let ordinary document scrolling leave the Story.
5. Otherwise call `preventDefault`, set `activeIndex` to exactly `index + direction`, and start the short lock.

This produces deterministic forward/backward progression and protects high-resolution trackpads or a single physical wheel gesture from skipping multiple milestones. The implementation must not use continuous scroll-position calculations, page scroll mutation, custom story scrolling, or global locking.

### Explicit accessible progression

Provide native `button` controls labelled `Previous milestone` and `Next milestone`, visually restrained but visible on focus and available without pointer precision. They update the same local active index by one. Disable Previous at the first milestone and Next at the final milestone; disabled controls do not consume page scrolling or prevent a user from leaving the stage. Support focused keyboard activation through native button semantics; no custom keybinding is necessary to make core progression accessible.

The complete chronological list remains in meaningful DOM order for screen readers and no-JavaScript access. The desktop visual panel may show only active presentation, but it cannot be the sole narrative source. Active state uses geometry, text/heading emphasis, and controls in addition to color.

## Responsive, Visual, and Motion Strategy

Use existing SiteShell `wide` mode without changing SiteShell. Reuse SPEC-004 CSS Modules, semantic tokens, Space Grotesk, JetBrains Mono, dark-first palette, green/amber accents, focus treatment, and technical atmosphere.

For eligible desktop, use a bounded Grid/Flex composition sized near the viewport, not one tall content region per milestone. The left timeline visibly moves its active node/progress; the right panel changes with the active milestone. Preserve the deliberate non-invented time-jump treatment and a meaningful final 2026 treatment.

For mobile, coarse-pointer, narrow layouts, and constrained zoom, use a normal single-column chronology: each milestone's period, title, narrative, and optional abstract treatment appear sequentially. Touch scrolling is never intercepted. Do not build a separate mobile tree.

Use only restrained opacity, color, and small emphasis transitions. Under `prefers-reduced-motion: reduce`, minimize or remove non-essential transitions while keeping controls and active-state clarity fully functional. Do not add parallax, cinematic scroll effects, typewriter/glitch effects, GSAP, or another animation/scrolling library.

## Image Strategy

Use abstract CSS treatment until a local image has explicit owner-approved placement, source/ownership/license, permitted-use, attribution, and local-asset decision. Do not hotlink, download arbitrary historical imagery, or place the pixelated personal photo. The stage must remain intentional and understandable with no milestone images.

## Accessibility and Testing

Use existing Vitest, React Testing Library, jsdom, and axe-core; add no dependency. TDD must cover:

- exact approved Story data/copy, qualification, UNICEN wording, time jump, and closing line;
- `Explore My Story`, `#about`, Home anchor, exactly one Header `Story` anchor, and absence of future links;
- full semantic chronological DOM independently of active state;
- eligibility-gated wheel listener registration and cleanup;
- normalized forward/backward one-step state changes;
- boundary release: no `preventDefault` and no state change when leaving outward from first/final milestone;
- gesture lock preventing accidental repeated advancement;
- Previous/Next native button labels, state changes, disabled boundaries, and visual correspondence;
- reduced-motion and semantic axe regression coverage.

Use the smallest deterministic event/test helper required. Test feature outcomes, not browser wheel implementation internals. Automated checks do not prove real stage positioning, browser scroll release, contrast, or motion; owner visual review must validate these at 375px, 768px, 1280px, 1536px, and 200% zoom.

## Validation and Owner Checkpoint

Before the renewed T045 review, run from `frontend/`:

```text
npm run format:check
npm run lint
npm run typecheck
npm run test:run
npm run validate:data
npm run build
```

Then run `git diff --check`, exact-copy and historical-fact audits, dependency/scope/static-output review, and a rendered review of desktop stage entry, forward/backward progression, first/final release, controls, keyboard focus, mobile touch flow, reduced motion, time jump, and no-image fallback.

## Superseded Plan Decisions

The following previous plan decisions are invalidated and must not guide re-implementation:

- a normal document-height milestone list as the desktop progression mechanism;
- CSS `position: sticky` companion behavior as the desktop stage architecture;
- `IntersectionObserver` closest-to-viewport-center active-milestone selection; and
- the previous no-wheel-interception rule for eligible desktop Story interaction.

`IntersectionObserver` may remain only as an optional local stage-eligibility detector. It must not determine active milestones.

## Scope Exclusions

Do not introduce React Router, a generic timeline/CMS/design system, global state, GSAP or another scrolling/animation library, custom main scroll container, global scroll lock, backend/API, runtime external content, unapproved images, Technology Graph (SPEC-007/008), Projects (SPEC-009), GitHub integration (SPEC-010), methodology (SPEC-011), Contact (SPEC-012), or cursor/microinteraction work (SPEC-013).

## Expected Files and Sequence

Re-implementation will revise only focused Story components/styles/tests and, if needed, the existing App/Home/Header integration tests. It must remove the rejected sticky/active-observer milestone implementation before adding the new stage state and controls. No SiteShell change or dependency is expected.

1. Re-approve this revised specification, plan, and replacement tasks.
2. Write failing tests for bounded desktop state, wheel boundary behavior, listener cleanup, and accessible controls.
3. Replace rejected desktop mechanics with local stage eligibility, one-step local state, bounded wheel handling, and buttons.
4. Restore green tests, then add stage styling and mobile fallback.
5. Run gates and obtain a new mandatory owner review before any completion work.

## Unresolved Blockers

No dependency or content blocker prevents re-implementation planning. The exact stage eligibility threshold, delta threshold/cooldown values, and desktop visual choreography require implementation-time validation and renewed owner review. Candidate imagery remains intentionally deferred.
