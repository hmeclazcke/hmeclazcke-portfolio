# Canonical Data Enrichment Proposal: Technology Graph

**ID:** SPEC-007  
**Status:** Owner approved and implemented — visual checkpoint pending

Canonical data now records 54 meaningful technologies, eight contexts, and 64 approved Technology–Context relationships. Maven and Gradle are included; Linux is confirmed at Unitech and TeraCode, and Tomcat at TeraCode. Visible information nodes remain technologies only; family metadata is invisible layout guidance.

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

IAC, UNICEN, Unitech, TeraCode, hmeclazcke-portfolio, Reactive RAG Document Processor, Personal Projects, and Technical Secondary School are canonical contexts. Technical Secondary School is a learning context and records Linux / Slackware hands-on learning.

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

1. Coalesce each unordered technology pair and score it by shared-context count, then context specificity (fewer participating technologies), then stable technology IDs.
2. Build a deterministic maximum spanning forest from the scored candidates to represent every connected canonical component without an all-to-all clique.
3. Add remaining candidates only in that stable order within a tested visual edge budget and per-node degree cap.
4. Tooltip and semantic output always retain complete Used at and Learned at context evidence, regardless of visible-edge pruning.
