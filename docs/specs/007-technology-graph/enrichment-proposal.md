# Canonical Data Enrichment Proposal: Technology Graph

**ID:** SPEC-007  
**Status:** Historical enrichment record - implemented and owner-approved; SPEC-007 is complete

Canonical data now records 54 meaningful technologies, eight contexts, and 64 approved Technology–Context relationships. Maven and Gradle are included; Linux is confirmed at Unitech and TeraCode, and Tomcat at TeraCode. Visible information nodes remain technologies only; family metadata is invisible layout guidance.

> **Authority note:** This file preserves staged owner-enrichment history. Its initial inventory, counts, and deferred lists are not the current canonical inventory. The canonical JSON collections are authoritative for current facts; the later relationship-audit and orphan-correction updates in this file supersede earlier conflicting proposal entries.

## Current refinement update

This owner-confirmed refinement increases the canonical inventory from 54 to 69 visible technologies and from 64 to 72 Technology-Context relationships. The 15 additions are Ollama, Qwen, Git, Jenkins, GitHub Actions, JUnit, Mockito, Testcontainers, Postman, Selenium, Keycloak, Docker Compose, Kibana, OpenAPI / Swagger, and Resilience4j.

| Technology | Family | Added canonical context |
| --- | --- | --- |
| Ollama, Qwen | AI / MODERN DATA | Reactive RAG Document Processor |
| Git, GitHub Actions | BUILD / TESTING | hmeclazcke-portfolio |
| Jenkins, Selenium | BUILD / TESTING | Unitech |
| Postman | BUILD / TESTING | TeraCode |
| Kibana | DATABASES / DATA | Unitech |
| JUnit, Mockito, Testcontainers | BUILD / TESTING | None: no specific supported context recorded in this pass |
| Keycloak | ENTERPRISE / SECURITY | None: no specific supported context recorded in this pass |
| Docker Compose | SERVERS / INFRASTRUCTURE | None: no specific supported context recorded in this pass |
| OpenAPI / Swagger | APIs / MESSAGING | None: no specific supported context recorded in this pass |
| Resilience4j | JAVA / APPLICATION FRAMEWORKS | None: no specific supported context recorded in this pass |

Unconnected additions remain visible but intentionally have no invented graph edge. Visible edge records retain their derived shared context metadata; desktop pointer hover presents the singular or plural shared-context explanation without changing technology selection.

## Relationship audit update

`Personal Projects` remains canonical personal-history evidence for C, BASIC, and Python, but is explicitly `graphEdgeEligible: false`; it cannot generate a technology pair, score, edge label, or edge tooltip explanation. A concrete `job-search-platform` portfolio context now records Java, Spring Boot, Apache Kafka, Redis, MongoDB, Docker, Docker Compose, OpenAPI / Swagger, and Resilience4j as used. Microsoft SQL Server now also records its confirmed TeraCode use. REST APIs has no Personal Projects relationship. Keycloak remains visible and context-unresolved pending owner confirmation.

Selected direct visible edges display a compact context-name label; edge hover presents the full eligible shared context name and type using a Unicode em dash separator.

## Orphan correction update

Keycloak now records Unitech use. Maven records Unitech, TeraCode, and job-search-platform use; it remains absent from the Gradle-based Reactive RAG Document Processor. Gradle records Unitech and Reactive RAG use. JUnit, Mockito, Testcontainers, Postman, Git, and Jenkins now record the owner-confirmed professional and concrete-current-project contexts. The projection adds a deterministic truthful-candidate coverage repair so every candidate-connected visible technology retains a visible edge. Python remains the only visible candidate-orphan because its Personal Projects history is intentionally non-edge-eligible.

## A. Initial Visible Technology Inventory (52)

| Group | Technologies |
| --- | --- |
| Languages / web | Java, JavaScript, TypeScript, Node.js, C, C++, BASIC, Visual Basic, Smalltalk, SQL, PL/SQL, HTML, CSS, Python |
| Frameworks / application development / graphics | OpenGL, Spring Framework, Spring Boot, Spring Data, Hibernate, Spring WebFlux / Project Reactor, React, Angular, jQuery |
| API / integration / messaging | REST APIs, SOAP Web Services, GraphQL, Apache Kafka |
| Data | Oracle Database, PostgreSQL, Microsoft SQL Server, MongoDB, Redis, Elasticsearch, Qdrant |
| Servers / infrastructure | Linux, Docker, Apache Tomcat, JBoss / WildFly, WebLogic, Oracle Application Server, Oracle RAC, HAProxy |
| Enterprise / security | Oracle ADF, Liferay, PKI, Blockchain |
| Modern AI | Spring AI, Gemini |
| Owner-confirmed supporting technologies | BIRT, Nexus, JDeveloper, Toad |

Java versions remain metadata, never nodes. Node.js remains distinct from JavaScript and TypeScript. The existing Oracle record was reconciled to Oracle Database.

## B. Secondary / Deferred Technologies

The following are not yet canonical graph nodes: Git; Subversion; Jenkins; JUnit; Selenium; Postman; SoapUI; GitHub Actions; Oracle SQL Developer; Eclipse.

Generic competencies and concepts remain excluded: Agile/Scrum; Decision-Making; Attention to Detail; Mentoring; Algorithms; Data Structures; Software Design Patterns; Code Review; SOLID; Microservices; RAG; Circuit Breakers; Enterprise Software; Front-End Development; Web Applications; Networking.

## C. Approved Contexts

IAC, UNICEN, Unitech, TeraCode, hmeclazcke-portfolio, Reactive RAG Document Processor, Personal Projects, and Technical High School are canonical contexts. Technical High School is a learning context and records Linux / Slackware hands-on learning.

## D. Approved Educational Relationships

Educational technology relationships use both learned and used when the technology was exercised hands-on. Used describes the context of use; it does not imply professional work.

| Technology | Context | Meanings |
| --- | --- | --- |
| C, C++, OpenGL, Smalltalk, Java, Oracle Database | UNICEN | learned, used |
| BASIC, Visual Basic | IAC | learned, used |
| Linux | Technical Secondary School | learned, used |

C++ and OpenGL share UNICEN as a university elective data-visualization project context.

## E. Approved Professional Relationships Added

| Technologies | Context | Meaning |
| --- | --- | --- |
| Oracle Application Server, Oracle RAC, HTML, CSS, Liferay, BIRT, Nexus, JDeveloper, Toad | Unitech | used |
| HTML, CSS | TeraCode | used |
| JavaScript, TypeScript, Node.js | hmeclazcke-portfolio | used |
| Java, Spring Boot, Spring WebFlux / Project Reactor, MongoDB, Redis, Elasticsearch, Qdrant, Docker, GraphQL, Apache Kafka, Spring AI, Gemini | Reactive RAG Document Processor | used |
| SQL, PL/SQL, Spring Framework, Spring Boot, Spring Data, Hibernate, Angular, jQuery, REST APIs, SOAP Web Services, PostgreSQL, Microsoft SQL Server, Apache Tomcat, JBoss / WildFly, WebLogic, HAProxy, Oracle ADF, PKI, Blockchain | Unitech | used |
| Python | Personal Projects | used |

Existing canonical professional and portfolio relationships remain preserved.

## F. Remaining Context Confirmation Needed

No further owner-approved relationship from this initial inventory remains unrecorded. Linux is the sole genuine current isolate: it has a truthful Technical Secondary School relationship, but no second technology shares that context. It remains intentionally unconnected rather than receiving an invented edge.

## G. Deterministic Shared-Context Edge Rule

Every candidate visual edge is derived from a shared canonical context and retains all shared context IDs as evidence. No hand-authored technology-to-technology edge is permitted.

1. Coalesce each unordered technology pair and score it with inverse context-size evidence; multiple shared contexts accumulate and focused contexts contribute more than broad ones.
2. Select deterministic visual edges with endpoint-degree balancing, initially favoring uncovered technologies and then penalizing already-high visible degree; stable pair hashing resolves semantic ties.
3. Apply a tested visual edge budget and per-node degree cap without forcing a spanning-tree star.
4. Tooltip and semantic output always retain complete Used at and Learned at context evidence, regardless of visible-edge pruning.
