# Nano

**A small, dependency-light UI library for the browser.** Nano pairs familiar
functional components and hooks with a typed JSX runtime, virtual DOM, and
built-in CSS-in-JS—without making the fundamentals feel heavy.

## What it includes

- Functional components, hooks, context, refs, fragments, and portals
- A lightweight virtual DOM with reconciliation and browser event handling
- Type-safe JSX and DOM props for TypeScript projects
- CSS-in-JS utilities: `css`, `keyframes`, and reusable style sheets
- A compact, modern API with minimal runtime dependencies

## Get started

In a TypeScript app with a JSX-capable bundler such as Vite, install Nano:

```sh
npm install @nano-ui/nano
```

Configure TypeScript's automatic JSX runtime in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@nano-ui/nano"
  }
}
```

Write JSX in `.tsx` files. Mount your app into an existing HTML element after
the document body is available, for example from an HTML module script:

```tsx
import { render, useState } from '@nano-ui/nano';

interface CounterProps {
  initialCount?: number;
}

function Counter({ initialCount = 0 }: CounterProps): JSX.Element {
  const [count, setCount] = useState(initialCount);

  return (
    <button type="button" onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}

const root = render(<Counter initialCount={1} />, document.body);
```

`render` returns a root with `render(node)` to update its contents and
`unmount()` to remove them.

## Write components

Components are functions that receive props and return renderable content.
Use capitalized names in JSX, pass props as attributes, and compose components
by nesting them. `PropsWithChildren` adds an optional `children` prop:

```tsx
import type { PropsWithChildren } from '@nano-ui/nano';

function Panel({ children }: PropsWithChildren): JSX.Element {
  return <section>{children}</section>;
}

function App(): JSX.Element {
  return (
    <Panel>
      <h1>Hello from Nano</h1>
    </Panel>
  );
}
```

Return `null` to render nothing or use `<>...</>` to group siblings. Use
`condition ? <Content /> : null` for conditional content and stable `key`
props for list items. Include `PropsWithKey` in a custom component's props type
when it needs to accept a JSX `key`.

Call hooks at the top level of a component or custom hook, in the same order
on every render. `useState` takes an initial value and its setter takes the
next value, as in the counter above. `useReducer` handles action-based updates;
`useRef` holds a mutable value or DOM reference. Use `useEffect` or
`useLayoutEffect` with an explicit dependency array, returning a cleanup
function when needed.

## CSS-in-JS

Define reusable styles outside components with `css` and `createStyleSheet`.
Inside a component, `useStyleSheet` registers the rules and returns generated
class names. Apply them with the JSX `class` prop:

```tsx
import { createStyleSheet, css, useStyleSheet } from '@nano-ui/nano';
import type { PropsWithChildren } from '@nano-ui/nano';

const buttonStyles = createStyleSheet({
  button: css`
    padding: 8px 16px;
    border: 0;
    border-radius: 6px;
    background: royalblue;
    color: white;
    cursor: pointer;

    &:hover {
      background: navy;
    }
  `,
});

function Button({ children }: PropsWithChildren): JSX.Element {
  const classes = useStyleSheet(buttonStyles);

  return (
    <button type="button" class={classes.button}>
      {children}
    </button>
  );
}
```

Nano inserts styles while the sheet is in use and cleans up unused rules
after unmounting. CSS is inserted directly into the browser, so nested
selectors such as `&:hover` require native CSS nesting support.

For conditional classes, use
`classNames({ [classes.button]: true, [classes.active]: isActive })` with
`classNames` imported from Nano and both styles defined in the sheet.
For values that change with props or state, use typed inline styles, for
example `<div style={{ color: textColor, padding: '8px' }} />`.

`createStyleSheet` also accepts a function that returns the styles. Use this
form to encapsulate definitions that reference one another, such as a rule
and its `keyframes` animation. The function runs when the sheet is created.

Include the animation in the returned styles and reference its `id` in the
animation declaration:

```tsx
import { createStyleSheet, css, keyframes } from '@nano-ui/nano';

const animatedStyles = createStyleSheet(() => {
  const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
  `;

  return {
    fadeIn,
    content: css`
      animation: ${fadeIn.id} 200ms ease-in;
    `,
  };
});
```

Call `useStyleSheet(animatedStyles)` and apply its `content` class as above.

## Try the Todo example

```sh
npm install
npm run build
npm run dev --workspace @nano-ui/sample-todo
```

The example is a Vite app in [`samples/todo`](samples/todo) and demonstrates
components, reducers, events, and scoped styles working together.

## Develop

```sh
npm run typecheck  # check the library and Todo sample
npm run build      # build @nano-ui/nano
npm test           # run the test suite
npm run lint       # lint and verify formatting
```

Nano is written in strict TypeScript and is released under the [MIT License](LICENSE).
