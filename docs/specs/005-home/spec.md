# Feature Specification: Home

**ID:** SPEC-005  
**Phase:** Phase 1 — Static Portfolio  
**Status:** Approved  
**Depends on:** SPEC-004 — Site Shell and Visual Foundation

## Overview

SPEC-005 defines the English-language public Home page: the first meaningful portfolio content a visitor encounters within the completed SPEC-004 site shell and visual foundation. It must quickly establish Hernán Meclazcke's identity and broad technical positioning while remaining concise, credible, and readable.

Home is an introduction to the portfolio, not an online CV, a replacement for LinkedIn, a technology catalog, or a substitute for later portfolio sections.

## Goal

Provide a focused, professional landing experience that identifies Hernán Meclazcke, communicates an owner-approved broad technical positioning, and gives visitors a clear first impression of the software work represented by the portfolio without pre-empting later Phase 1 capabilities.

## User Stories

### US-001 — Identify the portfolio owner (Priority: P1)

As a visitor, I want to immediately understand whose portfolio I am viewing so that I can orient myself without searching through the page.

**Acceptance Criteria:**

1. The Home page presents `Hernán Meclazcke` as the primary public identity.
2. Where shown, `hmeclazcke` is clearly secondary technical/accent identity rather than a company name or separate brand.
3. The page does not invent a company identity, logo, personal brand name, or fictional professional title.

### US-002 — Understand the technical positioning (Priority: P1)

As a recruiter, engineering manager, technical peer, or potential collaborator, I want a concise statement of the portfolio owner's technical direction so that I can decide whether to explore later portfolio material.

**Acceptance Criteria:**

1. The Home page presents the approved professional title `Senior Backend Java Developer`.
2. The Home page may present the approved factual technology wording `Java · Spring Boot · Microservices · Oracle & PL/SQL · REST APIs`; its exact punctuation and visual composition are implementation decisions.
3. Supporting text concisely explains the kind of software work represented by the portfolio without claiming unverified achievements, seniority, titles, years of experience, or expertise levels.
4. The positioning is not presented as a long technology inventory, proficiency matrix, or employment chronology.

### US-003 — Read a focused introduction (Priority: P1)

As a visitor, I want the initial content to be concise and readable so that I can understand the portfolio's purpose without encountering a generic developer landing page or a dense wall of information.

**Acceptance Criteria:**

1. The page provides a clear hierarchy between identity, technical positioning, and supporting text.
2. The temporary `Hello, world!` heading and Lorem Ipsum placeholder paragraph are replaced by real approved Home content.
3. The content uses deliberate whitespace and readable line lengths while preserving the SPEC-004 dark-first visual foundation.
4. The Home page does not use terminal simulation, typewriter text, hacker-page conventions, or decorative atmosphere as a replacement for meaningful content.

### US-004 — Preserve a truthful path to future exploration (Priority: P2)

As a visitor, I want Home to feel like the beginning of a coherent portfolio so that later content can extend it without misleading me about currently available capabilities.

**Acceptance Criteria:**

1. Home can visually and structurally continue into future portfolio sections without implementing them.
2. The page does not expose unfinished internal navigation, fake calls to action, disabled destination controls, or broken links.
3. If no currently authorized, valid destination exists, Home presents no call to action rather than a decorative non-functional control.

## Home Content Requirements

### Content responsibilities

The Home experience shall contain a focused hero/introduction area and one concise supporting personal/professional introduction of approximately one to three sentences. Together they must:

- establish the primary public identity;
- present concise approved technical positioning;
- explain at a high level the software work represented by the portfolio;
- allow the supporting introduction to communicate, without chronology, that Hernán's relationship with computers and programming began early and that he remains interested in understanding and exploring technologies beyond a single stack; and
- provide a natural visual continuation within the existing shell without presenting future features as already available.

The supporting introduction must remain brief and must not become a biography. Its approved public wording is defined below.

### Supported facts and public wording

The portfolio owner has approved the public professional title `Senior Backend Java Developer` and the factual technology wording `Java · Spring Boot · Microservices · Oracle & PL/SQL · REST APIs`. The final visual punctuation and layout of the technology wording remain implementation decisions.

The project documentation also supports broad portfolio direction involving Java, Spring, Oracle / SQL, React, backend and integration work, and modern software architecture and engineering practices. Those facts do not automatically authorize additional public sentences, specialty claims, project claims, technology lists, or biography-like wording.

The portfolio owner has explicitly approved the following supporting personal/professional paragraph for Home:

> Computers and programming have been part of my life since I was a kid. Today I focus on backend development, while still enjoying exploring different technologies and understanding how the pieces of a system fit together.

No additional slogan or tagline is approved. The fuller personal computing and programming story remains deferred to SPEC-006.

### Content deferred from Home

Home must not contain:

- detailed employment history, employer-by-employer chronology, or education chronology;
- a claim or implication that Hernán graduated from UNICEN;
- long skill inventories, proficiency percentages, skill bars, or years-of-experience counters;
- testimonials, fake metrics, fabricated client claims, invented achievements, or unsupported project history;
- personal/background material reserved for SPEC-006, including the fuller personal computing and programming story;
- a Technology Graph, complete canonical-data presentation, or generated skills catalog reserved for SPEC-007 and SPEC-008;
- detailed project content reserved for SPEC-009;
- public GitHub information reserved for SPEC-010;
- SDD, AI-assisted workflow, TDD, CI/CD, methodology, or detailed portfolio-building explanation reserved for SPEC-011; or
- contact actions or external-profile presentation reserved for SPEC-012.

## Visual Identity Requirements

Home must extend, rather than redesign, the completed SPEC-004 visual foundation. It must preserve the dark-first experience, layered surfaces, readable contrast, restrained technical/cyberpunk atmosphere, and contemporary professional tone.

The Home composition must provide:

- clear hero hierarchy for identity, positioning, and supporting text;
- deliberate whitespace and readable content widths;
- restrained use of existing technical accents;
- a coherent relationship to the established header, main content, footer, and atmospheric background; and
- an original visual result that does not reproduce Matrix, Blade Runner, or other copyrighted film interfaces, imagery, logos, layouts, or assets.

## Site and Navigation Requirements

SPEC-005 must use the existing reusable shell. It must not introduce routing or navigation architecture solely for Home.

SPEC-005 shall contain no call to action unless a genuinely completed destination exists within SPEC-005 scope. No such destination is currently authorized. External LinkedIn, GitHub, and contact actions remain deferred to their corresponding later specifications.

## Layout and Responsive Requirements

Home must use the responsive layout foundation established by SPEC-004 and remain intentionally usable on narrow mobile, tablet, desktop, and wide desktop layouts.

At each layout class, the identity and content hierarchy must remain readable without clipping, overlap, ordinary-content horizontal scrolling, impractically narrow or long text lines, or atmosphere that overwhelms the content. Home must preserve the shell's ability to support later wide or full-width feature regions without implementing one.

## Accessibility Requirements

Home must preserve the WCAG 2.2 AA-oriented visual foundation and, where applicable, provide:

- a logical semantic heading hierarchy;
- readable text and sufficient intended text and interface contrast;
- usable text resizing and enlarged/zoomed presentation;
- keyboard-operable behavior for any interactive element that is actually introduced;
- visible keyboard focus for any focusable interactive element;
- no information conveyed solely through color;
- reduced-motion compatibility for any non-essential Home motion; and
- no rapid flashing effects.

Native semantic HTML must be preferred. Automated accessibility checks supplement manual review; they do not prove rendered contrast, visual readability, zoom behavior, or the full accessibility experience.

## Interaction and Motion Requirements

Home-specific motion is optional. If introduced, it must be restrained, secondary to the content, understandable when motion is absent, and compatible with reduced-motion preferences.

Home must not require typewriter effects, Matrix-style code rain, glitch text, continuously animated terminal text, parallax, or excessive entrance animation.

## Functional Requirements

- **FR-001:** The system shall replace the temporary SPEC-002/SPEC-004 `Hello, world!` and Lorem Ipsum content with real Home content approved for public use.
- **FR-002:** The system shall present `Hernán Meclazcke` as the primary public identity on Home.
- **FR-003:** The system may present `hmeclazcke` only as a secondary technical/accent identity and shall not represent it as a separate company or brand.
- **FR-004:** The system shall provide a clear visual and semantic hierarchy between the identity, technical positioning, and supporting description.
- **FR-005:** The system shall present the approved public professional title `Senior Backend Java Developer` and may present the approved factual technology wording `Java · Spring Boot · Microservices · Oracle & PL/SQL · REST APIs`, with exact visual punctuation and layout deferred to implementation.
- **FR-006:** The system shall include one concise supporting personal/professional introduction of approximately one to three sentences, focused on the kind of software work represented by the portfolio, using wording explicitly approved by the portfolio owner.
- **FR-007:** The system shall not present unapproved titles, seniority claims, expertise levels, years-of-experience claims, achievements, client claims, project history, degrees, institute names, or fictional slogans as public facts.
- **FR-008:** The system shall not make Home an employment history, education chronology, LinkedIn replacement, online CV, long technology inventory, proficiency display, or generic developer landing page.
- **FR-009:** The system shall not imply that Hernán Meclazcke completed a degree or graduated from UNICEN.
- **FR-010:** The system shall use the existing SPEC-004 visual foundation and preserve its original dark-first, professional, readable, restrained technical atmosphere.
- **FR-011:** The system shall use readable content widths, deliberate whitespace, and restrained technical accents so atmosphere does not substitute for content or impair reading.
- **FR-012:** The system shall preserve the established shell relationship among header, main content, footer, and atmospheric background.
- **FR-013:** The system shall remain usable at narrow mobile, tablet, desktop, and wide desktop layouts without ordinary-content horizontal scrolling, clipping, overlap, or unreadable content hierarchy.
- **FR-014:** The system shall preserve WCAG 2.2 AA-oriented semantic structure, intended contrast, text resizing, keyboard accessibility where interactive elements exist, visible focus, reduced-motion compatibility, and no-flashing behavior.
- **FR-015:** The system shall make any Home-specific motion optional, restrained, and non-essential to understanding the content.
- **FR-016:** The system shall not expose a call to action unless a genuinely completed destination exists within SPEC-005 scope, and shall not expose fake, disabled, broken, or unfinished internal navigation links or calls to action.
- **FR-017:** The system shall not add routing or navigation architecture solely to support Home.
- **FR-018:** The system shall not render a Technology Graph, graph interactions, the complete SPEC-003 canonical dataset, or a generated technology catalog on Home.
- **FR-019:** The system shall preserve static GitHub Pages deployment compatibility and backend independence, with no required runtime external service for Home content.
- **FR-020:** The system shall defer personal/background content, technology exploration, projects, public GitHub information, portfolio-building methodology, and contact/external-profile functionality to their designated later specifications.

## Edge Cases

- The approved supporting personal/professional paragraph must be displayed verbatim; implementation must not add a detailed childhood or computing chronology to Home.
- Because no valid, authorized call-to-action destination exists within SPEC-005 scope, no call to action shall be rendered.
- If Home contains no interactive control, no artificial control shall be introduced solely to demonstrate focus or navigation; the existing focus foundation remains available for future controls.
- At enlarged text sizes, zoomed presentation, and narrow layouts, content must reflow without clipping, overlap, or ordinary-content horizontal scrolling.
- Any optional decorative or motion treatment must remain secondary to content and reduce appropriately when a visitor requests reduced motion.

## Scope

### In scope

- Real, approved public Home content replacing the temporary walking-skeleton placeholder;
- concise identity, technical positioning, and supporting description;
- use of the completed SPEC-004 shell, visual foundation, responsiveness, and accessibility foundation; and
- truthful, limited first-impression content suitable for a public technical portfolio.

### Out of scope

- final navigation or routing;
- About Me or biographical content;
- personal photo integration;
- Technology Graph rendering or exploration;
- complete canonical portfolio-data presentation;
- detailed project presentation;
- GitHub integration;
- contact or external-profile actions;
- portfolio methodology or SDD explanation;
- backend, APIs, OpenAPI, MCP, authentication, persistence, analytics, custom domain work, or light-theme support; and
- copied film imagery, logos, proprietary interfaces, or movie-inspired gimmicks.

## Assumptions

- SPEC-004 provides the completed reusable site shell, dark-first visual foundation, responsive behavior, and static GitHub Pages compatibility.
- Home is publicly presented in English only; SPEC-005 does not introduce localization, language switching, or duplicated Spanish content.
- `Hernán Meclazcke` is the portfolio's confirmed primary public identity and `hmeclazcke` is an optional secondary technical handle.
- SPEC-003 remains the canonical structured-data source, but its full presentation and exploration are intentionally deferred.
- Home remains a static frontend capability and requires no backend or runtime external content service.

## Success Criteria

- **SC-001:** A visitor can identify `Hernán Meclazcke` as the portfolio owner immediately from the Home page.
- **SC-002:** A visitor can understand the portfolio owner's broad, owner-approved technical positioning quickly without encountering unsupported professional claims.
- **SC-003:** The temporary `Hello, world!` and Lorem Ipsum content are absent from the implemented Home page.
- **SC-004:** Home does not function as an online CV, employment chronology, exhaustive skills page, proficiency display, or generated technology catalog.
- **SC-005:** Home remains visually consistent with the completed SPEC-004 dark-first shell and restrained, original technical atmosphere.
- **SC-006:** Home exposes no unfinished navigation, fake call to action, invalid destination, or later-spec functionality.
- **SC-007:** Home remains readable and usable on narrow mobile, tablet, desktop, and wide desktop layouts, including enlarged text or zoomed presentation.
- **SC-008:** Home preserves the applicable WCAG 2.2 AA-oriented foundation, including semantic heading structure, intended contrast, focus for actual interactive elements, reduced-motion compatibility, and no color-only meaning.
- **SC-009:** The Home page builds and deploys as a static GitHub Pages-compatible frontend without a backend or required runtime external service.
- **SC-010:** Home does not render a Technology Graph, canonical portfolio-data presentation, projects, GitHub integration, contact functionality, or other SPEC-006 through SPEC-012 capability.

## Completion Criteria

SPEC-005 can be considered complete only when:

1. The approved professional title, factual technology wording, and supporting personal/professional paragraph are displayed accurately without introducing additional unapproved public claims.
2. All functional requirements and success criteria have been verified through proportionate automated checks and manual visual, responsive, and accessibility review.
3. The temporary walking-skeleton content has been replaced by approved Home content without adding out-of-scope later functionality.
4. Applicable frontend, canonical-data validation, build, and GitHub Pages compatibility quality gates pass.
5. The final implementation has been reviewed for scope drift and documentation consistency.
