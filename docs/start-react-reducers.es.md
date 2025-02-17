# Inicio rápido: `useReducer` y `useContext` en tu Template



## 🛠️ 1. Instalación
Asegúrate de que tu proyecto esté en ejecución. Si usas Gitpod o Codespaces, ya debería estar activo.


## 📂 2. Añade tu primera vista

La app inicia en `main.jsx`, donde se define el proveedor global. Las rutas están en `routes.jsx`, que organiza la navegación de la aplicación.

Abre `routes.jsx` (`src/routes.jsx`), donde se definen las rutas como:

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

### 💻 3. Codifica tu primera vista HTML

`Demo.jsx` accede al estado global y despacha acciones:

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
            Cambiar color
          </button>
        </li>
      ))}
    </ul>
  );
};
```


### 🎨 4. Añadir estilos a componentes  

Guarda estilos en `src/index.css` o crea archivos CSS por componente.  

#### Ejemplo (`src/styles/demo.css`):

```css
.orange-bg { 
  background-color: #ffa500; 
}
```

Importa en `Demo.jsx`:

```javascript
import "../styles/demo.css";
```

### 🧩 5. Crea tu primer componente reutilizable  

Crea `src/components/Card.jsx`:  

```javascript
export const Card = ({ title, subtitle }) => (
  <div className="card">
    <h5>{title}</h5>
    <h6>{subtitle}</h6>
  </div>
);
```

Úsalo en `Home.jsx`:

```javascript
import { Card } from "../components/Card";

export const Home = () => (
  <Card title="Hello" subtitle="Welcome to Home" />
);
```

### 💡 6. Uso del contexto (`useGlobalReducer`)  

`useGlobalReducer` obtiene el `store` y `dispatch` del contexto global (`src/hooks/useGlobalReducer.jsx`).  
Las acciones se manejan en `src/store.js`.  

#### Ejemplo de acción en `store.js`:
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