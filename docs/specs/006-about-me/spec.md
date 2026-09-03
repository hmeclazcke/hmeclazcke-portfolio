# Feature Specification: About Me

**ID:** SPEC-006  
**Phase:** Phase 1 — Static Portfolio  
**Status:** Approved  
**Depends on:** SPEC-004 — Site Shell and Visual Foundation

## Overview

The internal project artifact **SPEC-006 — About Me** defines the public-facing interactive experience **Explore My Story**, which answers one focused question: **How did computers and programming become part of Hernán Meclazcke's life?**

It is a personal, technically authentic narrative rather than a conventional biography, résumé, employment chronology, or exhaustive skills list. The public narrative is English-only, concise, nostalgic about computing history, lightly humorous where owner-approved, professional, and visually consistent with the established dark-first portfolio identity.

The primary experience is an interactive chronological timeline. On wide screens, normal document scrolling advances a visually emphasized milestone and its associated content/visual panel. On touch-oriented and narrow layouts, the same story remains a natural vertical timeline in ordinary document flow.

## Goal

Let visitors understand that Hernán's relationship with computing began in childhood and progressed from formative machines, languages, courses, and personal memories to present-day software development—without substituting for LinkedIn or a CV.

## Discoverability and Navigation

**SPEC-006 — About Me** introduces the portfolio's first real internal section destination: `#about`. The public-facing **Explore My Story** timeline shall live in the same document as the existing Home experience. Normal document-anchor navigation is sufficient; SPEC-006 shall not introduce React Router or client-side page routing.

The visible public section title shall be `Explore My Story`; the section shall not be publicly titled `About Me`. `Story` is intentionally reserved as the shorter SiteHeader label.

When the Explore My Story section genuinely exists, Home shall expose the owner-approved secondary entry-point link text `Explore My Story`, targeting `#about`. It shall be a functional anchor link, remain visually secondary to Home's professional positioning, fit the established Home design, work with keyboard navigation, and preserve normal browser behavior. It may resemble a button visually, but it shall remain semantically a link because it navigates to another location in the document. No additional Home CTA is authorized.

Once SPEC-006 implements the genuine `#about` destination, the existing SiteHeader shall expose exactly one real internal navigation link: `Story`, targeting `#about`. It shall use normal same-document anchor navigation. No other header navigation link is authorized by this specification. In particular, `Technologies`, `Projects`, `GitHub`, `Contact`, and other future destinations shall remain absent until their corresponding sections genuinely exist.

Selecting either link shall navigate naturally to the Explore My Story section without JavaScript scroll interception. If smooth scrolling is selected later, it shall remain optional, respect `prefers-reduced-motion`, and preserve normal anchor behavior; its exact implementation belongs in `plan.md`.

## User Stories

### US-001 — Follow a personal computing story (Priority: P1)

As a visitor, I want to follow a concise chronological story of Hernán's early relationship with computers and programming so that I understand the personal path behind the portfolio.

**Acceptance criteria:**

1. The experience conveys a clear progression from childhood computing through the present day.
2. It distinguishes confirmed facts, approximate periods, and personal memories during authoring without presenting uncertain detail as fact.
3. It does not become an employment chronology, education transcript, or exhaustive technical inventory.

### US-002 — Progress naturally through the timeline (Priority: P1)

As a desktop visitor, I want the active moment in the story to progress as I normally scroll so that the experience feels temporal without fighting normal browser behavior.

**Acceptance criteria:**

1. Wide-screen layouts show a left-side vertical timeline with years and short labels and a corresponding right-side content/visual panel.
2. The active milestone changes as the visitor reaches its chronological content through normal document scrolling.
3. The experience does not intercept wheel events, trap scrolling, or require artificial scroll hijacking.

### US-003 — Read the story on any device or with motion reduced (Priority: P1)

As a visitor using a touch device, keyboard, screen reader, enlarged text, or reduced-motion preference, I want the full narrative to remain understandable so that the visual enhancement does not become a prerequisite.

**Acceptance criteria:**

1. Narrow and coarse-pointer layouts present a natural sequential vertical timeline with intact touch scrolling.
2. Every milestone's content is available in a semantic chronological structure even if enhanced activation or animation fails.
3. Motion, active-color treatment, and imagery are not required to understand the history.

### US-004 — Encounter a personal, professional portfolio section (Priority: P2)

As a recruiter, technical peer, or collaborator, I want an Explore My Story section that feels human and credible without duplicating professional-history sources so that the portfolio adds context beyond LinkedIn.

**Acceptance criteria:**

1. The section is personal, technically authentic, concise, and professionally appropriate.
2. It excludes employer chronology, job titles by year, client lists, salary information, employment gaps, and résumé-style responsibilities.
3. It directs detailed professional history conceptually to LinkedIn/CV without requiring an external-profile control in this specification.

### US-005 — Reach the story from the existing page (Priority: P1)

As a visitor, I want truthful, ordinary in-page navigation to Explore My Story so that I can move from Home to the completed story without being offered destinations that do not yet exist.

**Acceptance criteria:**

1. The completed Explore My Story section is a semantically identifiable `#about` destination in the same document as Home.
2. Home exposes exactly the approved entry-point wording `Explore My Story` as a functional link to `#about`, without another Home CTA.
3. Once the section exists, SiteHeader exposes exactly one real internal section link, `Story`, targeting `#about`; it does not expose future-section links.
4. Both links work through normal anchor navigation, keyboard navigation, and without JavaScript-enhanced scrolling, scroll trapping, or pointer-only interaction.

## Narrative Content and Approval Model

### Public language policy

Public narrative copy shall be in English only. Do not introduce localization, a language switcher, or a Spanish duplicate.

Official Argentine institutional names and qualifications may remain in Spanish where translation would reduce precision, including `Instituto Argentino de Computación (IAC)`, `UNICEN`, and the confirmed 2001 qualification `Técnico en Informática Personal y Profesional`. Supporting explanation around those names shall be English. The qualification shall not be translated into a purportedly equivalent English degree or title.

### Content states

Each proposed timeline item must be handled according to its evidence state before public implementation:

| State | Meaning | Public-use rule |
|---|---|---|
| Confirmed fact | Owner-provided factual event or hardware/software detail | Must be preserved accurately in approved public copy. |
| Approximate / uncertain fact | Owner-provided period or unresolved precise detail | Preserve qualification; do not sharpen it into an exact claim. |
| Personal memory | Meaningful remembered context | May be used only with owner-approved wording and without invented details. |
| Approved public copy | Portfolio-owner-approved narrative wording | Must be used verbatim unless a later owner-approved small copy/layout adjustment changes it. |
| Unresolved imagery | A possible visual direction or source | Not required for comprehension and not usable until sourcing/rights decisions are made. |

The core milestone narrative and its intentional humor are approved for public use. Any new or materially changed personal-history wording still requires explicit portfolio-owner approval before implementation.

### Historical provenance and uncertainty (not public copy)

The following records historical evidence and constraints. The approved visible labels and public copy follow; neither table commits a milestone to a separate visual.

| Time | Historical subject | Provenance and boundaries |
|---|---|---|
| 1994 | LOGO | `My first contact with programming. I was 10, and it all started with a turtle.` |
| 1996 | MY FIRST PC | `486 DX4 100 MHz` and `4 MB RAM · 640 MB HDD`. Do not add hardware details. |
| IAC period (date treatment unresolved) | Instituto Argentino de Computación (IAC) | Confirmed: BASIC was learned at IAC, together with use/learning of `Fantavision`, a DOS-era animation program. Do not force Fantavision into 1997 or 1998, or invent course, duration, certificate, campus, or a precise Fantavision date. |
| 1998 | Visual Basic / multimedia era | Confirmed memories: Visual Basic, Sound Blaster 16, CD-ROM drive, and `Time Commando` as personal context. CD-ROM speed is unconfirmed. |
| 1998–2000 | Computer courses | Approximate period: PC repair and Microsoft Office courses; PC repair was learned at Instituto Sarmiento in Tandil, Argentina. No exact titles, certificates, or dates. |
| Late 1990s / early 2000s | LAN parties | Meaningful personal computing culture: transporting full desktop PCs, towers, CRT monitors, cables, and networking equipment; setting up machines together. Do not focus on specific games or invent locations, people, or exact dates. It may instead be supporting material. |
| 1999 | Slackware Linux | Confirmed: a secondary-school teacher described Slackware as one of the most difficult Linux distributions to install/use at the time; that challenge motivated Hernán to choose it. He installed it on a Celeron 300, found sound configuration particularly difficult, and eventually ran `Sid Meier's Alpha Centauri` with working sound. Do not invent Slackware or kernel version, sound-card model, exact configuration steps, or a distribution ranking. |
| 2001 | Secondary technical qualification | Confirmed completion of Argentine secondary school with the official qualification `Técnico en Informática Personal y Profesional`. Preserve this Spanish title; do not invent an English equivalence. |
| 2002 | UNICEN | Confirmed start of study at UNICEN. It must not imply graduation or a completed university degree. |
| 2004 | C | Owner-associated timeline stage only; do not infer qualification, employment, or project context. |
| 2005 | C++ | Owner-associated timeline stage only; do not infer qualification, employment, or project context. |
| 2006 | Java | Owner-associated timeline stage only; do not infer certification, employment, expertise level, or exact project context. |
| 2007 | Oracle Database | Owner-associated timeline stage only; do not infer certification, employment, expertise level, or exact project context. |
| 2008–2025 | Deliberate time jump | A compressed transition that communicates passage of time and evolution without invented milestones or résumé-style chronology. |
| 2026 | Present | Concise, owner-approved present-day connection to modern software development. Candidate areas include modern Java, Spring / Spring Boot, React, MongoDB, reactive programming, RAG, Docker, Kubernetes, Spec-Driven Development, TDD, and AI-assisted software development; this is not an approved list for display. |

The 2004–2007 items are candidate distinct milestones. Planning may combine them only if doing so preserves the chronology and does not transform the section into a skills inventory.

The approved visible labels and public copy in the dedicated section below supersede any earlier reference-table language that describes wording as pending, candidate, or unresolved. Remaining uncertainty in those reference entries applies only to dates, visual treatment, or non-public detail.

### Superseded drafting provenance (not public copy)

The following earlier drafting direction is retained only as provenance. No wording in this section may be rendered publicly; the sole source of visible wording is **Approved visible labels and public copy** below.

> I took every computer course I could convince my parents to pay for.

It may support the approximately 1998–2000 computer-courses material. It must not be used to imply unrecorded courses, credentials, dates, or institutional details.

The following earlier IAC and Slackware directions are likewise provenance only and shall not be used as public copy:

> At Instituto Argentino de Computación (IAC), I learned BASIC and experimented with Fantavision, a DOS animation program.

> A teacher at school told us Slackware was one of the hardest Linux distributions to install at the time. Naturally, I chose that one.

> I installed it on a Celeron 300, fought with the sound configuration, and eventually got Sid Meier's Alpha Centauri running on it.

> With sound.

### Approved visible labels and public copy

The following core narrative is approved for public use. Exact wording and intentional line separation shall be preserved unless a later owner-approved small copy/layout adjustment changes it.

#### 1994 — LOGO

> My first contact with programming. I was 10, and it all started with a turtle.

#### 1996 — MY FIRST PC

> 486 DX4 100 MHz  
> 4 MB RAM · 640 MB HDD

Do not add invented hardware details.

#### IAC — BASIC & FANTAVISION

The exact year is intentionally unspecified.

> At Instituto Argentino de Computación, I learned BASIC and experimented with Fantavision, a DOS animation program.

Do not invent the exact Fantavision year.

#### 1998 — VISUAL BASIC

> Visual Basic, a Sound Blaster 16 and a CD-ROM drive. Computers were becoming much more than just programming.

Do not state an unconfirmed CD-ROM speed.

#### 1998–2000 — LEARNING EVERYTHING I COULD

> PC repair, Microsoft Office and basically every computer course I could convince my parents to pay for.

The humor is intentional and owner-approved. `Instituto Sarmiento`, Tandil, may provide concise factual PC-repair context where it does not overload the visible narrative.

#### 1999 — SLACKWARE LINUX

> A teacher told us Slackware was one of the hardest Linux distributions to install at the time. Naturally, I chose that one.

> I installed it on a Celeron 300, fought with the sound configuration, and eventually got Sid Meier's Alpha Centauri running on it.

> With sound.

Do not invent a Slackware version, kernel version, sound-card model, or exact configuration steps.

#### LATE 1990s / EARLY 2000s — LAN PARTIES

> We carried entire PCs, CRT monitors and cables to each other's houses and built our little networks for the night.

Keep the focus on computing culture and hands-on networking, not gaming history.

#### 2001 — TECHNICAL SECONDARY SCHOOL

> Técnico en Informática Personal y Profesional

Preserve this official Argentine title in Spanish; do not invent an English academic equivalence.

#### 2002 — UNICEN

> I started studying at UNICEN.

Do not imply graduation or a completed university degree.

#### 2004 — C; 2005 — C++; 2006 — JAVA; 2007 — ORACLE DATABASE

These milestones are intentionally concise. Do not infer qualification, employment, certification, expertise level, or project context.

#### Deliberate time jump

Preserve the intentional jump from earlier technical formation to the present. Do not fill it with résumé history or invented milestones. Exact visual treatment remains for `plan.md`.

#### 2026 — STILL LEARNING

> Still learning, still building — exploring modern Java, reactive systems, RAG, containers, AI-assisted development, and new ways of building software.

> And after all these years, I still have fun programming.

The closing line is important to the narrative arc and shall remain visually meaningful. Do not turn this milestone into an exhaustive skills list.

### Narrative editorial direction

The editorial direction is **nostalgic computing history + real technical experiences + restrained humor + technical evolution**. Personal memories shall explain how Hernán's relationship with computing evolved; the timeline shall remain curated and concise.

It is not a full autobiography, gaming history, complete skills inventory, or résumé chronology.

### Gaming scope rule

Gaming may appear only when it materially supports the computing or technical story.

**In scope:**

- `Sid Meier's Alpha Centauri` as part of the Slackware and sound-configuration story; and
- LAN parties as hands-on PC/networking culture involving desktop PCs, CRT monitors, cables, and setting up machines together.

**Out of scope:**

- general gaming history;
- childhood console chronology;
- Family Game;
- individual game memories that do not contribute to the computing/programming narrative;
- the Panzer Dragoon anecdote; and
- lists of games played.

SPEC-006 shall remain about Hernán's relationship with computers and programming, not his gaming history.

### Canonical-data relationship

SPEC-003 remains the canonical source for its defined Technology, Context, and Relationship facts. This timeline is a narrative presentation, not an automatic rendering of that data model. It must not alter historical facts to fit canonical records or expand SPEC-003 implicitly.

If an owner confirms a new factual history item that ought to become canonical later, implementation documentation may record a proposed convergence for a separately approved canonical-data change. It must not silently change SPEC-003 data or scope as part of SPEC-006.

## Experience Requirements

### Desktop / wide-screen timeline

On desktop and wide-desktop layouts, the experience shall provide:

- a vertical chronological timeline on the left, with each milestone showing a year or period and concise label;
- a visually emphasized active milestone whose state is also communicated through non-color cues such as position, indicator, text treatment, or associated heading;
- a content/visual panel on the right associated with the active milestone; and
- a temporal sense of progression as the visitor scrolls through the section.

Normal browser scrolling is mandatory. Sticky positioning and viewport-based activation are acceptable implementation approaches; wheel-event interception, scroll locking, synthetic scroll substitution, and scroll trapping are not.

The content/visual panel may transition with the active milestone, but its information must remain available in the document and must not become a sole source of narrative content.

### Mobile and coarse-pointer timeline

On narrow, touch, or coarse-pointer layouts, prioritize natural document flow over reproducing desktop scrollytelling. The timeline and milestone content may appear sequentially in one vertical chronology. Normal touch scrolling must remain intact, and no special gesture is required for comprehension.

Desktop and mobile do not need identical interaction patterns.

### Time jump and present

The transition between the early history and 2026 may visually compress or accelerate time. It must communicate deliberate narrative compression rather than an unexplained missing employment record. It must not fill the intervening years with invented milestones.

The 2026 milestone must be concise and narratively connective. It must not render the candidate technology areas as an exhaustive skill list, proficiency display, or technology graph.

## Images and Visual Material

Each selected milestone may have one associated visual or visual composition, for example historical software or hardware imagery, screenshots/recreations, personal imagery, or abstract visual treatment. Visuals should support atmosphere and recognition, not carry information required to understand the history.

The existing pixelated GitHub/profile photo is a possible SPEC-006 asset, subject to an owner decision on placement and visual role. It is not yet required or selected.

Historical facts and illustrative imagery are separate. Before implementation, every image must have a resolved source, ownership/licensing, attribution requirement where applicable, permitted transformation/use, and local-asset strategy. Do not copy unlicensed third-party imagery and do not hotlink external images at runtime. Missing imagery must not block this specification draft, but unresolved required imagery decisions block visual implementation that depends on them.

## Accessibility, Semantics, and Interaction

- The `#about` destination shall be semantically identifiable and reachable through normal document navigation without JavaScript-enhanced scrolling.
- The timeline shall use a semantic chronological structure that exposes all milestones, dates/periods, labels, and narrative content to screen readers.
- Content shall remain readable and complete when JavaScript-enhanced milestone activation is unavailable or fails.
- Keyboard users shall be able to reach and read all timeline content; any interactive milestone control introduced by implementation shall use native semantics or equivalent accessible semantics, be keyboard operable, and have visible focus.
- Normal browser scrolling, keyboard scrolling, touch scrolling, and anchor navigation shall remain intact. The experience shall not intercept wheel events, trap scroll, or require motion to reveal content, and shall not trap keyboard or pointer users.
- No information shall be communicated solely by active-color state, animation, image, hover, or pointer precision.
- Non-essential motion shall be restrained, non-flashing, and substantially reduced for `prefers-reduced-motion`; no timeline transition is mandatory for comprehension.
- The section shall preserve WCAG 2.2 AA-oriented contrast and remain usable at 200% zoom/text resizing without clipping, overlap, or ordinary-content horizontal scrolling.
- The complete historical narrative shall be understandable without images, animation, sticky positioning, or a desktop-sized viewport.

## Responsive Requirements

Implementation review shall deliberately cover narrow mobile, tablet, desktop, and wide desktop layouts. The desktop treatment may use sticky/scrollytelling-oriented presentation; mobile shall prioritize sequential content and natural scrolling. At every layout class, dates, labels, content, focus states, and any visual panel must remain readable and non-overlapping.

## Functional Requirements

- **FR-001:** The system shall provide the public-facing Explore My Story experience answering how computers and programming became part of Hernán Meclazcke's life.
- **FR-002:** The system shall present the experience as a personal, technically authentic, concise narrative rather than a conventional biography, résumé, employment chronology, or exhaustive skills list.
- **FR-003:** The public narrative shall be English only and shall not introduce localization or a Spanish duplicate.
- **FR-004:** The system shall preserve official Argentine names or qualification wording in Spanish where translation would reduce precision, with English supporting explanation.
- **FR-005:** The system shall use an interactive vertical timeline as the primary narrative structure.
- **FR-006:** On desktop and wide-desktop layouts, the system shall show a left-side timeline with years/periods and short labels plus an associated right-side content/visual panel.
- **FR-007:** The system shall visually emphasize the active desktop milestone and communicate its active relationship through at least one non-color cue.
- **FR-008:** The active desktop milestone and associated panel shall progress from normal document scrolling using a viewport-appropriate activation approach.
- **FR-009:** The system shall not intercept wheel events, lock or trap scrolling, replace normal browser scrolling, or require artificial scroll hijacking.
- **FR-010:** On narrow, touch, or coarse-pointer layouts, the system shall provide a naturally scrollable sequential timeline and shall not require desktop sticky-scrollytelling behavior.
- **FR-011:** The system shall preserve normal touch, keyboard, and browser scrolling.
- **FR-012:** The system shall model the proposed milestones and their confirmed, approximate, or remembered evidence states without publishing uncertain detail as confirmed fact.
- **FR-013:** The system shall preserve the approved 1994 LOGO copy: `My first contact with programming. I was 10, and it all started with a turtle.`
- **FR-014:** The system shall preserve the 1996 hardware facts—486 DX4 100 MHz, 4 MB RAM, and 640 MB HDD—without adding unconfirmed hardware detail.
- **FR-015:** The system shall preserve the IAC period's confirmed BASIC and Fantavision facts without inventing a precise Fantavision date; preserve the Visual Basic/multimedia, computer-course, LAN-party, and Slackware memories with their documented uncertainty and non-invention boundaries; and retain LAN parties as hands-on PC/networking culture rather than a game-focused milestone.
- **FR-016:** The system shall preserve that UNICEN study began in 2002 and shall not imply graduation or completion of a university degree.
- **FR-017:** The system shall preserve the confirmed official 2001 qualification title `Técnico en Informática Personal y Profesional` in Spanish and shall not invent a translated academic equivalent.
- **FR-018:** The system shall preserve the C, C++, Java, and Oracle Database stages without inferring certification, employment, expertise, or project context.
- **FR-019:** The system shall use a deliberate, non-invented time jump between the early history and the present rather than an exhaustive chronology.
- **FR-020:** The 2026 milestone shall use the approved STILL LEARNING direction and closing line `And after all these years, I still have fun programming.`, remain visually meaningful, and shall not become a skill inventory or proficiency display.
- **FR-021:** The system shall not add employer chronology, job titles by year, client lists, salary information, employment gaps, or résumé-style responsibilities.
- **FR-022:** The system shall reuse the completed SPEC-004 dark-first shell, typography, green/amber accent system, responsive foundations, and technical atmosphere without redesigning the site.
- **FR-023:** The system shall make all narrative content understandable without images, animation, active-state color, or enhanced JavaScript activation.
- **FR-024:** The system shall expose the complete timeline in a semantic, screen-reader-friendly chronological structure and preserve keyboard access to any implemented controls.
- **FR-025:** The system shall support reduced motion, sufficient intended contrast, visible focus, 200% zoom/text resizing, and no flashing effects.
- **FR-026:** The system shall remain compatible with static GitHub Pages deployment, require no backend, and require no runtime external image hotlink or service for the core narrative.
- **FR-027:** The system shall not automatically render SPEC-003 canonical data or silently modify that data; any newly confirmed narrative fact that may warrant canonical-data convergence shall be documented separately for later approval.
- **FR-028:** The system shall not introduce Technology Graph functionality (SPEC-007/008), Portfolio Projects (SPEC-009), dynamic GitHub integration (SPEC-010), detailed portfolio-building methodology (SPEC-011), Contact and External Profiles (SPEC-012), or global cursor-follower/microinteraction hardening (SPEC-013).
- **FR-029:** The previously discussed trailing green cursor effect is out of scope and shall not be implemented.
- **FR-030:** The approved core milestone copy and intentional humor shall be preserved. Any additional or materially changed personal-history copy, and any selected imagery, shall receive explicit portfolio-owner approval before implementation.
- **FR-031:** The public section shall use the visible title `Explore My Story`, shall not be publicly titled `About Me`, and shall be a semantically identifiable `#about` destination in the same document as the existing Home experience.
- **FR-032:** SPEC-006 shall use normal document-anchor navigation and shall not introduce React Router or client-side page routing.
- **FR-033:** Home may be changed only as necessary to expose the exact owner-approved functional link wording `Explore My Story` targeting `#about`; it shall remain a semantic link, keyboard accessible, visually secondary to Home's professional positioning, and shall not authorize another Home CTA.
- **FR-034:** Once SPEC-006 implements the genuine `#about` destination, SiteHeader shall expose exactly one real internal link, `Story`, targeting `#about`, using normal same-document anchor navigation. It shall not expose navigation links for Technologies, Projects, GitHub, Contact, or other future sections, and shall not use React Router or JavaScript scroll interception.
- **FR-035:** Anchor navigation to `#about` shall preserve normal browser behavior and shall not require JavaScript scroll interception, a smooth-scroll enhancement, scroll trapping, or pointer-only interaction.
- **FR-036:** Any later smooth-scroll enhancement shall be optional, preserve normal anchor behavior, and respect `prefers-reduced-motion`.
- **FR-037:** Gaming content shall appear only when it materially supports the computing/programming narrative; it may include Alpha Centauri in the Slackware/sound story and LAN parties as PC/networking culture, but shall exclude general gaming history, childhood console chronology, Family Game, the Panzer Dragoon anecdote, unrelated individual game memories, and lists of games played.

## Edge Cases

- If JavaScript activation does not run, all milestones and their content remain visible in chronological order.
- If sticky positioning is unsupported or unsuitable at a viewport, the experience falls back to ordinary sequential content.
- If imagery is unavailable, delayed, or intentionally omitted, narrative content and milestone relationships remain complete.
- If an approximate period is shown, it remains approximate; implementation must not convert it to a year solely for visual alignment.
- If the LAN-party memory is not selected as its own milestone, it may appear only as approved supporting material and must not disappear behind interaction-dependent content.
- If a milestone has unresolved imagery, approved public copy remains complete and understandable without it.
- At 200% zoom or narrow widths, the experience must favor sequential flow over a clipped or competing sticky two-column composition.
- If JavaScript is unavailable, both `Explore My Story` and `Story` still navigate normally to the semantically identifiable `#about` section once those links are rendered.

## Scope

### In scope

- A personal, English-language Explore My Story narrative centered on an interactive chronological computing/programming timeline;
- owner-provided early-computing history, appropriately marked by evidence state;
- wide-screen normal-scroll timeline activation and a mobile natural-flow fallback;
- narrative visual-material requirements and image sourcing/ownership constraints;
- accessibility, semantic, reduced-motion, responsive, static-deployment, and non-hijacking requirements; and
- a concise, owner-approved reconnection to the present; and
- the `#about` document destination and the strictly necessary Home and SiteHeader anchor links to that genuinely implemented section.

### Out of scope

- A conventional biography, CV, employment chronology, or exhaustive skills list;
- detailed LinkedIn/CV content, job titles by year, employers by year, clients, salary, employment gaps, or résumé responsibilities;
- Technology Graph and its exploration (SPEC-007 and SPEC-008);
- detailed Portfolio Projects (SPEC-009);
- dynamic GitHub integration (SPEC-010);
- detailed SDD, workflow, or portfolio-building explanation (SPEC-011);
- Contact and External Profiles (SPEC-012);
- global cursor-follower or microinteraction hardening (SPEC-013), including the trailing green cursor effect;
- React Router, client-side page routing, navigation links to unimplemented sections, backend/API work, authentication, persistence, analytics, localization, or a light theme;
- copied, unlicensed, or runtime-hotlinked third-party imagery;
- general gaming history, childhood console chronology, Family Game, the Panzer Dragoon anecdote, unrelated individual game memories, and lists of games played; and
- an implementation plan, task breakdown, or frontend implementation.

## Assumptions

- SPEC-004 provides the reusable static site shell, dark-first visual foundation, typography, semantic tokens, accessibility baseline, and responsive foundations.
- SPEC-005 remains the concise approved Home introduction; **SPEC-006 — About Me** expands personal history only within the public-facing Explore My Story section.
- Touching Home and SiteHeader solely to expose the genuinely implemented `#about` destination is an incremental SPEC-006 capability and does not reopen SPEC-004 or SPEC-005.
- Detailed professional history remains on LinkedIn/CV.
- The Phase 1 static portfolio remains independently usable without backend or external-service availability.
- The core public narrative and intentional humor are approved. Owner approval remains required before materially changing that copy or rendering selected imagery.

## Success Criteria

- **SC-001:** A visitor understands that Hernán's relationship with computing began in childhood.
- **SC-002:** A visitor can follow a coherent progression from early computing and programming to present-day software development.
- **SC-003:** The experience feels personal and technically authentic rather than résumé-like or like an exhaustive skills list.
- **SC-004:** On desktop and wide desktop, milestone emphasis and the associated panel progress visually through normal document scrolling.
- **SC-005:** No wheel-event interception, scroll hijacking, scroll lock, or scroll trap exists.
- **SC-006:** On touch/coarse-pointer and narrow layouts, the timeline remains naturally scrollable and understandable in sequential document flow.
- **SC-007:** Full narrative content remains understandable without motion, sticky positioning, enhanced JavaScript activation, or images.
- **SC-008:** Selected images enhance rather than determine comprehension, are locally served, and have resolved sourcing/usage decisions.
- **SC-009:** Exact owner-approved historical facts are preserved, while approximate dates and memories remain appropriately qualified.
- **SC-010:** UNICEN is not represented as a completed degree, and the confirmed 2001 qualification `Técnico en Informática Personal y Profesional` is preserved in Spanish without an invented English equivalence.
- **SC-011:** No unprovided historical milestone, detail, course credential, certification, employment claim, or technical context is invented.
- **SC-012:** Semantic chronology, keyboard access, contrast, visible focus, reduced-motion support, 200% zoom/text-resize usability, and no-color-only meaning meet the stated accessibility requirements.
- **SC-013:** The implementation remains compatible with static GitHub Pages and has no required backend, runtime image hotlink, or external content dependency.
- **SC-014:** The section remains visually consistent with the established dark-first shell and does not redesign the site.
- **SC-015:** No later-spec capability or trailing green cursor effect leaks into the implementation.
- **SC-016:** `Explore My Story` is the only Home CTA added by SPEC-006, is a functional semantic link to `#about`, and remains secondary to Home's professional positioning.
- **SC-017:** Once SPEC-006 implements `#about`, SiteHeader exposes exactly one real same-document `Story` link to `#about` and no navigation destination for an unimplemented future section.
- **SC-018:** The `#about` destination and its Home/Header links work with normal browser and keyboard navigation without JavaScript, scroll hijacking, or user trapping.
- **SC-019:** The implementation verifies every owner-approved visible label, milestone line, and intentional humorous line against the authoritative **Approved visible labels and public copy** section, without silent rewriting; this includes the exact closing line `And after all these years, I still have fun programming.`

## Completion Criteria

SPEC-006 may be considered complete only when:

1. the approved core milestone wording and intentional humor are preserved, and any selected images have explicit portfolio-owner approval;
2. all functional requirements and success criteria have been validated through proportionate automated checks and manual desktop, mobile, touch, keyboard, screen-reader-oriented, reduced-motion, zoom, and visual review;
3. normal browser scrolling is verified and no prohibited wheel/scroll hijacking or trapping behavior exists;
4. the desktop-enhanced and mobile sequential experiences both preserve complete, understandable historical content;
5. imagery licensing/ownership, local-asset, and attribution decisions are resolved for every visual actually used;
6. static GitHub Pages compatibility and backend independence are preserved;
7. any potential SPEC-003 factual-data convergence is recorded separately and is not silently implemented; and
8. the `#about` destination, required Home `Explore My Story` link, and required SiteHeader `Story` link are verified through normal browser and keyboard navigation without JavaScript-enhanced scrolling or trapping; and
9. final scope review confirms no later-spec functionality, résumé-style professional history, invented history, unauthorized public copy, React Router, or future-section navigation was introduced.

## Open Questions

- Which milestones deserve visual imagery or visual compositions, and which should remain text-led?
- What sourcing, ownership, licensing, attribution, and local-asset strategy is approved for each historical image?
- Should the pixelated personal photo appear in this timeline, and if so, at which point and in what role?
- What exact visual treatment should communicate the long time jump?
- Does visual design reveal a small copy or layout adjustment that requires later portfolio-owner approval?
