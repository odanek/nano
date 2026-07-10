# Nano contributor guide

Nano is a small, dependency-light functional UI library for the browser. It
provides JSX, a virtual DOM, hooks and CSS-in-JS utilities.

## Repository layout

- `packages/nano/`: the published `@nano-ui/nano` UI library.
  - `src/vdom/`: virtual DOM, fibers, reconciliation, rendering, and hooks.
  - `src/event/`: browser event wrappers and dispatching.
  - `src/style/`: CSS-in-JS utilities and stylesheet management.
  - `src/jsx/`: JSX factory and runtime exports.
- `samples/todo/`: Vite-based integration sample.
- `README.md`: short project overview.
- `TODO.md`: planned work.

## Commands

Run commands from the repository root unless a package command is specified.

- `npm install`: install workspace dependencies.
- `npm run lint`: run ESLint and verify Prettier formatting across the repo.
- `npm run lint:fix`: apply ESLint and Prettier fixes.
- `npm run typecheck`: type-check the library without emitting files.
- `npm run build`: compile `packages/nano` into `packages/nano/dist`.
- `npm run build --workspace @nano-ui/sample-todo`: type-check and build the
  sample with Vite.
- `npm run dev --workspace @nano-ui/sample-todo`: run the sample locally.

There is currently no automated test suite. For behavior changes, type-check the
affected workspace and use the Todo sample as the integration check.

## Code conventions

- Write TypeScript with strict types.
- Add explicit return types to functions; ESLint enforces this rule.
- Use `import type` for type-only imports.
- Preserve the existing ESM style: relative internal imports omit file
  extensions, and exported public API is gathered in `packages/nano/src/index.ts`.
- Match the surrounding formatting. Prettier uses single quotes and trailing
  commas where applicable.
- Keep browser-facing APIs fully typed. When adding JSX or DOM props, update the
  corresponding declarations in `src/jsx/` and `src/vdom/host/` as needed.

## Change guidance

- Keep public API changes intentional. Update `packages/nano/src/index.ts` and
  package exports whenever a new public runtime or type must be importable.
- Changes to reconciliation, effects, hooks, refs, or event dispatch can affect
  multiple rendering phases. Trace the relevant flow through `begin-work.ts`,
  `complete-work.ts`, and mutation/effect files before editing.
- Treat generated `packages/nano/dist/` output as build output; change `src/`
  files instead.
- Do not alter workspace dependency versions or lockfiles unless the task
  requires it.
- For library changes, build `packages/nano`; also build `samples/todo` when the
  public API, JSX runtime, events, styling, or DOM rendering behavior changes.

## Before handing off

Run the narrowest relevant checks first, then run `npm run lint` for source or
formatting changes. Report any checks that could not be run and avoid committing
generated artifacts unless explicitly requested.
