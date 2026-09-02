# Frontend Agent Instructions

These instructions extend the repository-wide rules in `../AGENTS.md`.

- Use React and TypeScript with Vite; preserve the statically buildable frontend without a backend requirement.
- Follow frontend TDD: write a behavior-oriented React Testing Library test, confirm it fails, implement the minimum behavior, and confirm it passes.
- Prefer accessible semantic HTML and observable DOM behavior in tests.
- Run applicable frontend gates from this directory: `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run test:run`, and `npm run build`.
- Keep dependencies and frontend scope limited to approved specifications. Do not add backend, deployment, or future portfolio functionality without an approved specification.
