# Feature Specification: Contact

**ID:** SPEC-012
**Phase:** Phase 1 - Static Portfolio
**Status:** Done - implementation complete; owner visual acceptance passed
**Depends on:** SPEC-004 - Site Shell and Visual Foundation
**Relevant constraints:** SPEC-006 - About Me; SPEC-007 - Technology Graph

## Overview

Contact is the existing site footer and the final major destination of the current static release. It provides direct, minimal access to Hernán Meclazcke's approved public LinkedIn and GitHub profiles while preserving the portfolio's established visual language and static-hosting model.

Contact is intentionally an external-profile destination, not a contact form, email channel, professional-history summary, or backend capability. For this release, it narrows the vision document's general contact-channel examples: email is not a Contact capability. A future email-channel decision requires a separate approved specification.

## User Value

A visitor who wants to continue beyond the portfolio can identify and open the owner's approved LinkedIn or GitHub profile without navigating through unnecessary copy, forms, or unrelated interactions.

## Core User Scenarios

### US-001 - Reach an approved professional profile

As a recruiter, hiring manager, or technical reviewer, I want to open the owner's LinkedIn profile so that I can continue to the canonical external destination for detailed professional experience.

### US-002 - Reach an approved public development profile

As a technical visitor, I want to open the owner's GitHub profile so that I can continue to the owner's approved public development destination.

### US-003 - Complete the current major-section journey

As a visitor navigating the main portfolio sections, I want Contact/footer to be the final available destination so that previous/next controls correspond to real destinations.

## Functional Requirements

### Footer-owned Contact and profile actions

- **FR-001:** The existing semantic site footer MUST own the stable Contact destination `#contact` and be the final real major destination. A separate empty or titled Contact section MUST NOT be created.
- **FR-002:** The only visible Contact/footer content MUST be one recognizable LinkedIn icon link, one recognizable GitHub icon link, and the decorative Piedra Movediza illustration.
- **FR-003:** Contact/footer MUST NOT include visible Contact or marketing copy, email, phone number, contact form, location text, copyright, legal text, status text, or backend-powered contact functionality.
- **FR-004:** Each profile action MUST use a recognizable owner-supplied local SVG icon that is itself the hyperlink. Runtime external or CDN-hosted icon assets MUST NOT be required.
- **FR-005:** The LinkedIn profile URL MUST be `https://www.linkedin.com/in/h-meclazcke/`; the GitHub profile URL MUST be `https://github.com/hmeclazcke`.
- **FR-006:** Profile links MUST have accessible names, be keyboard and touch operable with visible focus, and use safe external-navigation behavior. If opened in a new browsing context, that destination MUST NOT receive opener access.

### Piedra Movediza decoration

- **FR-007:** Contact/footer MUST include the owner-supplied transparent Piedra Movediza line-art asset as a small, non-interactive decorative illustration behind the two profile links.
- **FR-008:** The decoration MUST remain visually subordinate to the links and MUST NOT obscure, reduce the legibility of, or intercept interaction with either link.
- **FR-009:** Piedra Movediza is decorative only and MUST NOT create meaningful screen-reader content.

### Visual, responsive, and navigation behavior

- **FR-010:** The icon cluster MUST appear toward the lower-left area of the footer, with the Piedra Movediza decoration visually behind it, using the established dark graphite and restrained green visual language. It MUST NOT introduce a new design system, tourist-postcard treatment, or large Contact title/card.
- **FR-011:** Desktop and mobile MUST preserve the same basic icon-link and decoration composition. The decoration may adapt responsively, but links MUST remain usable touch targets, unobscured, and free of horizontal overflow.
- **FR-012:** Major-section navigation MUST follow Home, Story, Technology Graph, Contact/footer. Graph next reaches Contact/footer; Contact/footer previous reaches Technology Graph; Contact/footer next is unavailable.
- **FR-013:** When normal document geometry prevents a short footer from reaching the top of the viewport, Graph next MUST reveal the footer destination and reaching document bottom MUST identify Contact/footer as current. No artificial whitespace is permitted solely for alignment.
- **FR-014:** Contact MUST preserve completed Home, Story, Technology Graph, and approved major-section navigation behavior apart from adding Contact/footer as the final destination.

### Static architecture

- **FR-015:** Contact MUST work entirely in the existing GitHub Pages static deployment model.
- **FR-016:** Contact MUST NOT introduce an API, server, persistence, email service, third-party contact-form service, authentication, analytics, visitor counter, or other runtime external dependency for core content.

## Acceptance Criteria

1. The existing semantic footer exposes `#contact` as the final major destination, and no second Contact section exists.
2. Exactly one LinkedIn icon hyperlink and one GitHub icon hyperlink target the URLs in FR-005. Each uses a local icon asset, has a meaningful accessible name, is keyboard and touch operable with visible focus, and uses safe external-navigation behavior.
3. No prohibited visible Contact/footer content from FR-003 is present.
4. The supplied Piedra Movediza line-art is a visible, non-interactive decorative asset behind the icon links; it is absent from meaningful assistive-technology content and cannot obstruct link interaction or readability.
5. At supported desktop and narrow viewport widths, the footer retains usable social links, no horizontal overflow, and a subordinate adaptable decoration.
6. Major-section navigation follows Home, Story, Technology Graph, Contact/footer: Graph next reaches Contact/footer; Contact/footer previous reaches Graph; Contact/footer next is unavailable; document bottom identifies Contact/footer even when its footer is shorter than the viewport.
7. The static production artifact supplies the footer Contact capability without server-side, external runtime, or dynamic-contact infrastructure and does not regress completed portfolio areas.

## Scope

### In Scope

- Footer-owned Contact destination.
- Owner-supplied local LinkedIn and GitHub SVG icon links to the approved profiles.
- Owner-supplied local Piedra Movediza decorative line art.
- Accessible, responsive external-profile navigation.
- Contact/footer addition to major-section ordering.
- Static GitHub Pages-compatible delivery.

### Out of Scope

- A separate Contact section; visible Contact heading; email; phone; contact form; explanatory copy; copyright; or additional social networks.
- Backend contact handling, email delivery, APIs, persistence, authentication, analytics, visitor counters, or third-party form services.
- Live GitHub information, repository data, or SPEC-010 integration.
- Projects, Technology Graph exploration, filtering, search, graph nodes, or SPEC-008 functionality.
- Changes to Story content, Technology Graph semantics, or completed portfolio areas beyond the required major-section navigation extension.

## Deferred Decisions

- Exact asset-loading details, icon size, illustration scale, opacity, positioning, responsive breakpoints, and visual implementation.
- Exact external-link opening choice, provided it remains safely external.
- Live GitHub enrichment (SPEC-010); Portfolio Projects (SPEC-009); How This Portfolio Was Built (SPEC-011); and Technology Graph Exploration (SPEC-008).
- Broader accessibility, responsive, and UX hardening (SPEC-013), followed by the static release process (SPEC-014).

## Completion Criteria

SPEC-012 may be marked complete after owner visual acceptance confirms the footer composition and the profile destinations/local assets, navigation, accessibility, responsive, and static-host checks pass without introducing out-of-scope capabilities.
