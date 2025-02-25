---
title: 'Start a Web Application with React'
description: 'Use advanced React to guarantee a dynamic and interactive user experience, optimizing the performance and responsiveness of the application.'
technologies: ['html', 'css', 'javascript', 'react', 'react-router', 'useReducer', 'useContext']
---


## Quick Start: `useReducer` and `useContext` in your Template

### 1. Installation

Make sure to first follow the steps to [run the project](https://github.com/4GeeksAcademy/react-hello-webapp/blob/master/README.md), then return to this reading. If you are using **Codespaces**, the project might already be running.

### 2. Add your first view

The app starts in `main.jsx`, where the global provider is defined. The routes are in the `routes.jsx` file, which organizes the application's navigation through `react-router`. You can [read more about React Router here](https://4geeks.com/lesson/routing-our-views-with-react-router).

Open the `routes.jsx` file, where the routes are defined as:

```javascript
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
            <Route path="/" element={<Home />} />
            <Route path="/single/:theId" element={<Single />} />
            <Route path="/demo" element={<Demo />} />
        </Route>
    )
);
```

As you can see, we have already added some routes like `Home`, `Demo`, and `Single`. These views are useful examples of the most common things you might need in a project.

### 3. Code your first HTML view

As you can see, the page `/pages/Demo.jsx` is a React component that accesses the global state and dispatches actions:

```javascript
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Demo = () => {
  const { store, dispatch } = useGlobalReducer();
  
  return (
    <ul>
      {store.todos.map(todo => (
        <li key={todo.id} style={{ background: todo.background }}>
          {todo.title}
          <button onClick={() => dispatch({ 
            type: 'add_task', 
            payload: { id: todo.id, color: '#ffa500' } 
          })}>
            Change color
          </button>
        </li>
      ))}
    </ul>
  );
};
```
Some key points you might notice from this view are:

- The component returns HTML.
- At the beginning of the component file (`Demo.js`), `useGlobalReducer` is imported, which will be used to handle any global information needed from other views or the application.
- It is also important to mention that `useGlobalReducer` is called within the component, in the first few lines:

```js
const { store, dispatch } = useGlobalReducer();
```

### 4. Add styles to components

Save styles in the `index.css` file or create CSS files per component.

#### Example (`src/styles/demo.css`):

```css
.orange-bg { 
  background-color: #ffa500; 
}
```

Import in `Demo.jsx`:

```javascript
import "../styles/demo.css";
```

### 5. Create your first reusable component

Create `./components/Card.jsx`:

```javascript
export const Card = ({ title, subtitle }) => (
  <div className="card">
    <h5>{title}</h5>
    <h6>{subtitle}</h6>
  </div>
);
```

Use it in `Home.jsx`:

```javascript
import { Card } from "../components/Card";

export const Home = () => (
  <Card title="Hello" subtitle="Welcome to Home" />
);
```

### 6. Using context (`useGlobalReducer`)

`useGlobalReducer` gets `store` and `dispatch` from the global context defined in `src/hooks/useGlobalReducer.jsx`, connecting with the state management system in `src/store.js`.

#### 🟡 How to use it?
In your components, import and use the `useGlobalReducer` hook to access the state (`store`) and update it via `dispatch`.

#### 📌 Example in `Demo.jsx`:

```javascript
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Demo = () => {
  const { store, dispatch } = useGlobalReducer();
  
  const changeColor = (id) => {
    dispatch({
      type: 'add_task',
      payload: { id, color: '#ffa500' }
    });
  };

  return (
    <ul>
      {store.todos.map(todo => (
        <li key={todo.id} style={{ background: todo.background }}>
          {todo.title}
          <button onClick={() => changeColor(todo.id)}>
            Change color
          </button>
        </li>
      ))}
    </ul>
  );
};
```

### How actions work (`store.js`):

The global state is stored and managed in `src/store.js` through a *reducer* and an initial state defined in `initialStore`.

#### Initial state (`initialStore`):
```javascript
export const initialStore = () => {
  return {
    message: null,
    todos: [
      { id: 1, title: "Make the bed", background: null },
      { id: 2, title: "Do my homework", background: null }
    ]
  };
};
```

The initial state contains a message and a list of tasks (`todos`), each with an `id`, `title`, and `background`.

#### Reducer (`storeReducer`):

When `dispatch` is executed, the action is received by the *reducer* in `src/store.js`, which updates the state according to the `type`:

```javascript
case 'add_task':
  return {
    ...store,
    todos: store.todos.map(todo => 
      todo.id === action.payload.id 
        ? { ...todo, background: action.payload.color }
        : todo
    )
  };
```

With this structure (`initialStore` and `storeReducer`), your application maintains a centralized and scalable global state.

## Publish your website!

1. **Vercel:** The recommended FREE hosting provider is [vercel.com](https://vercel.com/), you can deploy in 1 minute by typing the following 2 commands:

Log in (you need to have an account):
```sh
$ npm i vercel -g && vercel login
```
Deploy:
```sh
$ vercel --prod
```
✎ Note: If you don't have an account, just go to vercel.com, create an account, and come back here.

![Example procedure of Vercel to deploy](https://github.com/4GeeksAcademy/react-hello-webapp/blob/4b530ba091a981d3916cc6e960e370decaf2e234/docs/deploy.png?raw=true)
