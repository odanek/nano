# Nano

**A small, dependency-light UI library for the browser.** Nano pairs familiar
functional components and hooks with a typed JSX runtime, virtual DOM, and
built-in CSS-in-JS—without making the fundamentals feel heavy.

```tsx
import { render, useState } from '@nano-ui/nano';

function Counter(): JSX.Element {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}

render(<Counter />, document.body);
```

## What it includes

- Functional components, hooks, context, refs, fragments, and portals
- A lightweight virtual DOM with reconciliation and browser event handling
- Type-safe JSX and DOM props for TypeScript projects
- CSS-in-JS utilities: `css`, `keyframes`, and reusable style sheets
- A compact, modern API with minimal runtime dependencies

## Try the Todo example

```sh
npm install
npm run dev --workspace @nano-ui/sample-todo
```

The example is a Vite app in [`samples/todo`](samples/todo) and demonstrates
components, reducers, events, and scoped styles working together.

## Develop

```sh
npm run typecheck  # check the library
npm run build      # build @nano-ui/nano
npm test           # run the test suite
npm run lint       # lint and verify formatting
```

Nano is written in strict TypeScript and is released under the [MIT License](LICENSE).
