# AGENTS.md

## Purpose

This file defines the permanent working rules for AI agents operating in this repository.

Keep this file concise. Detailed product requirements, architectural decisions, implementation plans, and feature specifications belong in the `docs/` directory.

---

## Development Workflow

This project follows Spec-Driven Development (SDD).

- Do not implement features without an approved specification.
- Work on one active specification at a time.
- Before implementing, understand the specification, plan, and tasks.
- If requirements are ambiguous, stop and ask for clarification instead of guessing.
- Do not silently introduce requirements that are not present in the specification.
- Keep changes strictly within the scope of the active specification.
- Do not perform unrelated refactors while implementing a feature.
- A feature is not complete until it has been validated against its specification and applicable quality gates.

Expected workflow:

1. Understand the requirement.
2. Clarify ambiguities.
3. Define or review the specification.
4. Define the implementation plan.
5. Break the plan into tasks.
6. Implement the tasks.
7. Run the applicable quality gates.
8. Validate the result against the specification.

---

## Documentation

Project documentation lives under `docs/`.

The intended documentation structure is:

- `docs/vision.md`: product vision and project goals.
- `docs/architecture.md`: architectural decisions and system structure.
- `docs/roadmap.md`: high-level project phases.
- `docs/quality-gates.md`: project-wide completion and validation rules.
- `docs/current.md`: current development state and active work.
- `docs/specs/`: feature specifications, plans, and tasks.

Treat these documents as project sources of truth once they exist.

When documents disagree:

1. Do not guess.
2. Identify the inconsistency.
3. Ask for clarification before implementing.

Do not change architectural or product decisions implicitly through code.

---

## Testing

This project follows Test-Driven Development (TDD).

For behavior that can reasonably be tested:

1. Write or update a test that expresses the expected behavior.
2. Verify that the test fails for the expected reason.
3. Implement the minimum production code required to make it pass.
4. Refactor while keeping the tests green.

Additional rules:

- Do not remove or weaken tests merely to make a build pass.
- Bug fixes should include a regression test whenever reasonably possible.
- Prefer deterministic tests.
- Tests must verify behavior, not implementation details unnecessarily.
- Run the relevant tests after making changes.

---

## Architecture

Favor clear boundaries and dependency direction.

When backend code is introduced:

- Follow Clean Architecture / Hexagonal Architecture principles.
- Dependencies must point toward the core of the application.
- Domain and application logic must not depend on frameworks or infrastructure details.
- External systems must be accessed through explicit boundaries/ports.
- Framework-specific code belongs at the edges of the system.

Do not introduce new architectural patterns, infrastructure components, frameworks, or major dependencies without an explicit project decision.

Prefer simple solutions over speculative abstractions.

---

## Code Quality

Follow these principles:

- SOLID.
- Clean Code.
- DRY where duplication represents the same concept.
- KISS.
- YAGNI.
- High cohesion.
- Low coupling.
- Explicit dependencies.
- Clear and intention-revealing names.
- Small, focused units of code.

Do not create abstractions merely because they might be useful in the future.

Prefer existing project conventions over inventing new ones.

Before adding new functionality, check whether equivalent functionality already exists.

---

## Change Discipline

Keep changes small, focused, and reviewable.

Before modifying code:

- Understand the relevant existing code.
- Identify the files actually required by the active task.
- Avoid modifying unrelated files.

After modifying code:

- Review the diff.
- Run applicable tests and quality gates.
- Report any failing checks honestly.
- Do not claim a task is complete if required validation failed.

Never hide, suppress, or ignore failures merely to complete a task.

---

## Git Safety

Do not perform any of the following unless explicitly requested:

- `git commit`
- `git push`
- force push
- branch deletion
- tag creation
- history rewriting
- destructive Git operations

Do not discard user changes.

Do not reset, revert, overwrite, or remove existing work unless explicitly authorized.

---

## Agent Behavior

For analysis, planning, review, or explanation requests:

- Do not modify files unless the request explicitly asks for changes.

For implementation requests:

- Modify only what is necessary to fulfill the approved scope.
- Explain important assumptions.
- Ask before making a major architectural decision.
- Prefer evidence from the repository over assumptions.

Never report that a command, test, build, or validation succeeded unless it was actually executed successfully.

---

## Repository-Specific Instructions

More specific `AGENTS.md` files may exist inside subdirectories.

When present, they extend or specialize these root rules for that part of the repository.

Examples:

- `frontend/AGENTS.md`
- `backend/AGENTS.md`

More specific instructions must remain compatible with the project-wide rules defined here.

---

## Public Documentation

- Treat `docs/` as the authoritative source for product, architecture, roadmap, specifications, and project status.
- Treat the root `README.md` as the public entry point to the repository, not as a separate source of truth.
- Keep the README consistent with the authoritative project documentation.
- Update the README when a completed change materially affects what an external reader should know, such as:
  - project capabilities or features;
  - supported technologies;
  - architecture at a high level;
  - setup or execution instructions;
  - deployment or usage;
  - project maturity or meaningful milestones.
- Do not update the README for trivial internal changes, temporary implementation details, or work that is not yet complete.
- Before updating the README, consult the relevant authoritative documents under `docs/`; do not infer project status from code alone when documentation exists.
- If the README conflicts with authoritative documentation, do not silently choose one. Report the inconsistency and resolve the authoritative documentation first.
- Do not introduce new product requirements, architectural decisions, roadmap commitments, or project status solely in the README.
- Keep the README concise and useful to an external reader. Link to detailed documentation instead of duplicating it.
- Do not expose agent instructions, internal planning notes, temporary status notes, or unfinished specifications in the README.
