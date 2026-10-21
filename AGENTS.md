# Nano contributor guide

Nano is a small, dependency-light functional UI library for the browser. It
provides JSX, a virtual DOM, hooks and CSS-in-JS utilities.

## Repository layout

- `packages/nano/`: the published `@nano-ui/nano` UI library.
  - `src/api/`: public types and small public primitives (`Fragment`, `Portal`,
    VNode, ref, key, context, hook, and style types).
  - `src/core/`: roots, `render`, VNode creation, function components,
    context, refs, and fiber traversal.
  - `src/reconciler/`: fibers, child reconciliation, the work loop, and the
    `begin-work`/`complete-work` and before/mutation/after-mutation commit
    phases.
  - `src/hooks/`: hook implementations, hook payloads, and effect scheduling.
  - `src/dom/`: DOM element and text handling, event wrappers, the event
    dispatcher, `StyleDecorator`, and DOM prop types.
  - `src/style/`: CSS-in-JS utilities and stylesheet management.
  - `src/jsx/`: JSX factory, runtime exports, and intrinsic HTML/SVG/ARIA
    element declarations in `intrinsic/`.
  - `src/shared/`: internal helpers (predicates, flags, object/array/string
    utilities, utility types).
  - `src/index.ts`: the public API surface.
- `samples/todo/`: Vite-based integration sample. It consumes the library via
  its package exports, so build `packages/nano` before type-checking or
  building it.
- `vitest.config.ts`: test configuration; tests live next to sources as
  `packages/**/*.test.ts`.
- `README.md`: project overview and usage docs.
- `TODO.md`: planned work.

## Commands

Run commands from the repository root unless a package command is specified.

- `npm install`: install workspace dependencies.
- `npm run lint`: run ESLint and verify Prettier formatting across the repo.
- `npm run lint:fix`: apply ESLint and Prettier fixes.
- `npm run build`: compile `packages/nano` into `packages/nano/dist`.
- `npm run typecheck`: type-check the library, its test files, and the Todo
  sample without emitting files.
- `npm test`: run the Vitest suite once (`npm run test:watch` for watch mode).
- `npm run build --workspace @nano-ui/sample-todo`: type-check and build the
  sample with Vite.
- `npm run dev --workspace @nano-ui/sample-todo`: run the sample locally.

Test coverage is still small. For behavior changes, add or update Vitest tests
where practical and use the Todo sample as the integration check.

## Code conventions

- Write TypeScript with strict types. The library enables
  `isolatedDeclarations`, `verbatimModuleSyntax`, `erasableSyntaxOnly`, and
  `noUncheckedIndexedAccess`.
- Add explicit return types to functions; ESLint and `isolatedDeclarations`
  enforce this.
- Use `import type` (or inline `type` specifiers) for type-only imports.
- Use `as const` objects instead of `enum`s; `erasableSyntaxOnly` disallows
  enums, namespaces, and parameter properties.
- Preserve the existing ESM style: relative internal imports omit file
  extensions, and exported public API is gathered in `packages/nano/src/index.ts`.
- Match the surrounding formatting. Prettier uses single quotes and trailing
  commas where applicable.
- Keep browser-facing APIs fully typed. When adding JSX or DOM props, update the
  corresponding declarations in `src/jsx/intrinsic/` and `src/dom/` as needed.
- Name test files `*.test.ts` next to the code they cover; they are excluded
  from the build and type-checked through `tsconfig.test.json`.

## Change guidance

- Keep public API changes intentional. Update `packages/nano/src/index.ts` and
  package exports whenever a new public runtime or type must be importable.
- Changes to reconciliation, effects, hooks, refs, or event dispatch can affect
  multiple rendering phases. Trace the relevant flow through
  `reconciler/work-loop.ts`, `begin-work.ts`, `complete-work.ts`, the mutation
  phase files, and `hooks/effect.ts` before editing.
- Treat generated `packages/nano/dist/` output as build output; change `src/`
  files instead.
- Do not alter workspace dependency versions or lockfiles unless the task
  requires it.
- For library changes, build `packages/nano` and run `npm test`; also build
  `samples/todo` when the public API, JSX runtime, events, styling, or DOM
  rendering behavior changes.

## Before handing off

Run the narrowest relevant checks first, then run `npm run lint` for source or
formatting changes. Report any checks that could not be run and avoid committing
generated artifacts unless explicitly requested.
