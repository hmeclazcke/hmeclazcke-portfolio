# Feature Specification: Contact

**ID:** SPEC-012
**Phase:** Phase 1 - Static Portfolio
**Status:** Draft - ready for acceptance
**Depends on:** SPEC-004 - Site Shell and Visual Foundation
**Relevant constraints:** SPEC-006 - About Me; SPEC-007 - Technology Graph

## Overview

Define the final real page section for the current static release: Contact. It provides direct, minimal access to Hernán Meclazcke's approved public LinkedIn and GitHub profiles while preserving the portfolio's established visual language and static-hosting model.

Contact is intentionally an external-profile destination, not a contact form, an email channel, a professional-history summary, or a backend capability.

For the current static release, this specification narrows the vision document's general contact-channel examples: email is not a Contact capability. Any future email-channel decision requires a separate approved specification.

## User Value

A visitor who wants to continue beyond the portfolio can identify and open the owner's approved LinkedIn or GitHub profile without navigating through unnecessary contact copy, forms, or unrelated interactions.

## Core User Scenarios

### US-001 - Reach an approved professional profile

As a recruiter, hiring manager, or technical reviewer, I want to open the owner's LinkedIn profile so that I can continue to the canonical external destination for detailed professional experience.

**Acceptance criteria:**

1. The Contact section provides one recognizable LinkedIn icon link to `https://www.linkedin.com/in/h-meclazcke/`.
2. The icon link has an accessible name that identifies LinkedIn and its destination purpose.
3. The link follows safe behavior appropriate for external navigation.

### US-002 - Reach an approved public development profile

As a technical visitor, I want to open the owner's GitHub profile so that I can continue to the owner's approved public development destination.

**Acceptance criteria:**

1. The Contact section provides one recognizable GitHub icon link to `https://github.com/hmeclazcke`.
2. The icon link has an accessible name that identifies GitHub and its destination purpose.
3. The link follows safe behavior appropriate for external navigation.

### US-003 - Complete the current major-section journey

As a visitor navigating the main portfolio sections, I want Contact to be the final available destination so that previous/next controls correspond to real sections.

**Acceptance criteria:**

1. The major-section order is Home, Story, Technology Graph, then Contact.
2. Technology Graph has Contact as its next major-section destination.
3. Contact has Technology Graph as its previous major-section destination and no next major-section destination.

## Functional Requirements

### Contact content and external actions

- **FR-001:** The portfolio MUST expose Contact as the final real page section for the current static release.
- **FR-002:** The only visible informational Contact content MUST be one LinkedIn icon link and one GitHub icon link. The Piedra Movediza decoration is the sole permitted visible non-link content.
- **FR-003:** Contact MUST NOT include a visible Contact heading, email address, phone number, contact form, introductory copy, explanatory paragraph, or backend-powered contact functionality. A non-visible structural heading remains permitted where needed for semantic page hierarchy.
- **FR-004:** Each visible profile action MUST use a recognizable local SVG icon that is itself the hyperlink. Runtime external or CDN-hosted icon assets MUST NOT be required.
- **FR-005:** The LinkedIn profile URL MUST be `https://www.linkedin.com/in/h-meclazcke/` and the GitHub profile URL MUST be `https://github.com/hmeclazcke`.
- **FR-006:** External profile links MUST be clearly external. If an implementation opens either profile in a new browsing context, it MUST prevent that destination from receiving opener access.

### Piedra Movediza decoration

- **FR-007:** Contact MUST include the owner-supplied transparent Piedra Movediza line-art asset as a small, non-interactive decorative illustration behind the LinkedIn and GitHub links.
- **FR-008:** The decorative illustration MUST remain visually subordinate to and must not obscure, reduce the legibility of, or intercept interaction with either profile link.
- **FR-009:** Piedra Movediza is decorative only and MUST NOT contribute meaningful screen-reader content.

### Visual, responsive, and navigation behavior

- **FR-010:** The profile links MUST appear toward the lower-left area of the Contact section, with the Piedra Movediza decoration visually behind them.
- **FR-011:** Contact MUST reuse the established dark graphite and restrained green visual language. It MUST NOT introduce a new design system, tourist-postcard treatment, or a large Contact title/card.
- **FR-012:** The same basic icon-link and decorative composition MUST remain usable on desktop and mobile. The decorative asset may scale, reposition, or fade as necessary, but the links MUST remain usable touch targets, unobscured, and free of horizontal page overflow.
- **FR-013:** The major-section navigation model MUST use the order Home, Story, Technology Graph, Contact. Technology Graph next navigates to Contact; Contact previous navigates to Technology Graph; Contact next is unavailable.
- **FR-014:** Contact MUST preserve the existing Home, Story, Technology Graph, and approved major-section navigation behavior apart from the required addition of Contact as the final destination.

### Static architecture

- **FR-015:** Contact MUST work entirely in the existing GitHub Pages static deployment model.
- **FR-016:** Contact MUST NOT introduce an API, server, persistence, email service, third-party contact-form service, authentication, or other runtime external dependency for core content.

## Accessibility and Responsive Requirements

The Contact section must reuse the semantic, keyboard, visible-focus, responsive, and reduced-motion foundations established by SPEC-004 and completed features. The icon links must remain discoverable and operable without relying on color, hover, or the Piedra Movediza decoration. The decorative image must remain absent from meaningful assistive-technology content.

## Scope

### In Scope

- One final Contact section.
- Local LinkedIn and GitHub SVG icon links to the specified canonical public profiles.
- The owner-supplied local Piedra Movediza decorative asset.
- Responsive, accessible external profile navigation.
- The Contact addition to major-section ordering and navigation requirements.
- Static GitHub Pages-compatible delivery.

### Out of Scope

- A visible Contact heading, email, phone, contact forms, introductory or explanatory Contact copy.
- Backend contact handling, email delivery, APIs, persistence, authentication, analytics, visitor counters, or third-party form services.
- Live GitHub information, repository data, or SPEC-010 integration.
- Projects, Technology Graph exploration, filtering, search, graph nodes, or SPEC-008 functionality.
- A large Contact title/card, tourist-postcard visual treatment, a new design system, or interactive Piedra Movediza behavior.
- Changes to Story content, Technology Graph semantics, or existing completed portfolio sections beyond required major-section navigation.

## Acceptance Criteria

1. A Contact section exists as the final real section of the current static release.
2. Exactly one visible LinkedIn icon hyperlink and one visible GitHub icon hyperlink are present; neither requires a runtime external icon asset.
3. The LinkedIn link targets `https://www.linkedin.com/in/h-meclazcke/` and the GitHub link targets `https://github.com/hmeclazcke`; both have meaningful accessible names, are keyboard and touch operable, expose visible focus, and use safe external-navigation behavior.
4. Contact contains no visible Contact heading, email address, phone number, contact form, introductory copy, explanatory paragraph, backend contact capability, analytics, or visitor counter.
5. The local Piedra Movediza line-art asset is visible as a subtle, non-interactive decoration behind the icon links and does not create meaningful screen-reader content.
6. The illustration does not obscure either icon link, reduce link legibility, intercept interaction, or create horizontal overflow.
7. Desktop and mobile preserve usable LinkedIn and GitHub touch/keyboard targets and the same basic lower-left icon-link composition, while allowing the decoration to adapt responsively.
8. Major-section navigation follows Home, Story, Technology Graph, Contact: Graph next reaches Contact; Contact previous reaches Graph; Contact next is unavailable.
9. The existing Home, Story, Technology Graph, and prior major-section behavior remain available aside from Contact becoming the final destination.
10. The static production artifact provides Contact without an API, server, persistence, email service, third-party form service, authentication, or runtime external dependency for core content.

## Deferred Decisions

The following decisions are intentionally deferred to implementation planning or later specifications:

- exact asset paths and asset-loading details;
- exact icon size, illustration scale, opacity, positioning, responsive breakpoints, and visual implementation;
- exact external-link opening behavior, provided it remains safely external;
- live GitHub enrichment (SPEC-010);
- Portfolio Projects (SPEC-009), How This Portfolio Was Built (SPEC-011), and Technology Graph Exploration (SPEC-008);
- broader accessibility, responsive, and UX hardening after Contact (SPEC-013); and
- the static release process after hardening (SPEC-014).

## Completion Criteria

SPEC-012 may be marked complete only when its specified profile destinations and supplied local assets are integrated, the Contact and major-section-navigation requirements are validated, applicable accessibility/responsive and static-host checks pass, and no out-of-scope contact or dynamic capability has been introduced.
