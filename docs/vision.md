# Product Vision

## Purpose

Build an interactive personal technical portfolio that goes beyond a traditional résumé or LinkedIn profile.

The portfolio should present Hernán Meclazcke's technical history, projects, technologies, interests, and current development work in a visual and exploratory way.

The website itself should also serve as a software engineering portfolio project, demonstrating modern development practices and integrations.

## Product Identity

This project is not intended to be an online résumé or a replacement for LinkedIn.

Detailed professional experience should remain on LinkedIn.

The portfolio should instead focus on:

- who Hernán is as a developer;
- the technologies he has learned throughout his life and career;
- the technologies he has used professionally;
- the technologies used in personal and portfolio projects;
- the relationships between technologies, companies, and projects;
- current public software development activity;
- the engineering practices used to build the portfolio itself.

## Core Experience

The core public portfolio must remain fully usable without a project backend.

It includes:

- Home;
- About Me and personal visual identity;
- the interactive technology graph;
- project-owned structured technology and relationship data;
- company, learning-context, and portfolio-project relationships;
- base portfolio project information;
- contact information and external-profile links;
- public information explaining how the portfolio itself was built.

The main experience should include:

### Home

A concise introduction presenting Hernán as a software developer and providing access to the main areas of the portfolio.

### About Me

A personal but professionally focused introduction.

This section may include an older personal photograph as a visual background or design element to give the site a more personal identity.

### Interactive Technology Graph

The technology graph is one of the central features of the portfolio.

It should visually represent technologies learned or used throughout Hernán's technical history.

Technology nodes may include programming languages, frameworks, databases, infrastructure tools, development practices, and other relevant technologies.

The graph must run entirely in the browser using project-owned structured data. It must not require a backend to display or navigate the portfolio's technical history.

Examples include historical technologies such as BASIC, Visual Basic, C, and C++, as well as professional and current technologies.

Technologies should be connected to the contexts in which they were used.

Examples of context nodes include:

- companies such as Unitech and TeraCode;
- portfolio projects;
- personal projects;
- learning or education contexts.

A technology may therefore connect to multiple contexts.

For example:

- Java may connect to Unitech, TeraCode, and multiple portfolio projects.
- React may connect to TeraCode and portfolio projects.
- Oracle and PL/SQL may connect to Unitech.
- technologies learned historically may exist in the graph even when they were not used professionally.

The graph should clearly distinguish different kinds of relationships, such as:

- learned;
- used professionally;
- used in portfolio projects;
- historical;
- currently active.

Selecting a technology should make it possible to discover where that technology appears in Hernán's technical history.

Selecting a company or project should make it possible to discover the technologies associated with it.

The graph should communicate meaningful technical relationships rather than exist only as a visual effect.

### Portfolio Projects

The site should present selected personal and portfolio projects.

Projects should provide enough information to understand:

- what problem the project explores or solves;
- its important technical characteristics;
- the technologies involved;
- relevant source repositories.

Detailed professional work history should not be duplicated here.

### GitHub Integration

The portfolio should use public GitHub information where useful so that parts of the site can evolve together with Hernán's public development activity.

The objective is to reduce unnecessary manual duplication and allow visitors to explore real source repositories when appropriate.

### How This Portfolio Was Built

The portfolio should expose selected information about its own engineering process.

This may include topics such as:

- Spec-Driven Development;
- Test-Driven Development;
- architecture;
- API design;
- automated quality checks;
- CI/CD;
- external integrations;
- agent-assisted development.

This section should demonstrate engineering decisions through a real working project rather than simply list technologies.

### Contact and External Profiles

The portfolio should provide clear links to relevant external profiles and contact channels, including:

- LinkedIn;
- GitHub;
- email.

LinkedIn remains the primary location for detailed professional experience.

The portfolio should not provide a downloadable résumé unless this product decision changes explicitly in the future.

## Product Principles

- The portfolio should be exploratory and interactive rather than a static résumé.
- The technology graph should represent real relationships and history.
- Historical technologies should be distinguishable from current technologies.
- Professional use, portfolio use, and learning experience should not be presented as equivalent.
- Public information should come from clearly defined project data or appropriate external sources.
- External platforms should not be duplicated unnecessarily.
- Every significant technical capability added to the application should have a real product purpose.
- Technologies must not be introduced solely to make the project's technology list larger.
- The application should remain understandable to non-technical visitors while offering deeper information to technical visitors.
- The project should evolve incrementally.
- Dynamic or server-side capabilities are enhancements to the core portfolio, not prerequisites for using it. These may include backend APIs, AI/LLM functionality, MCP-based capabilities, authentication or administration, and server-side integrations.
- When an optional dynamic capability is loading or temporarily unavailable, visitors should still be able to use the static portfolio. Optional capabilities may communicate loading, retry, unavailable, or degraded states without causing the overall site to fail.

## Engineering Showcase

The repository itself should demonstrate professional software engineering practices.

The development process should progressively demonstrate concepts such as:

- Spec-Driven Development;
- Test-Driven Development;
- clear architectural boundaries;
- API contracts and documentation;
- automated testing and quality validation;
- continuous integration and deployment;
- external platform integration;
- agent-assisted software development.

Specific frameworks, libraries, protocols, and infrastructure choices are architectural decisions and are intentionally not fixed by this vision document.

## Target Audience

The primary audience includes:

- software engineers;
- technical interviewers;
- recruiters and hiring teams;
- potential employers or clients;
- developers interested in exploring the projects and source code.

The site should provide useful information without requiring visitors to understand its internal architecture.

## Long-Term Direction

The portfolio may progressively become an interactive map of Hernán's technical history.

Potential future capabilities include:

- dynamic GitHub information;
- richer technology and project relationships;
- graph filtering and exploration;
- repository inspection;
- intelligent querying of public portfolio or repository information;
- integrations through standard APIs and agent-oriented tooling.

These are directions for future exploration, not guaranteed implementation commitments.

## Non-Goals

The project is not intended to:

- replace LinkedIn;
- reproduce a traditional résumé;
- provide a downloadable CV by default;
- duplicate all information available on external platforms;
- become a social network;
- introduce technologies solely for demonstration purposes;
- become unnecessarily complex for architectural or visual effect.
