---
title: 'Inicia una aplicación Web con React'
description: 'Utiliza las tecnologías Fullstack para crear aplicaciones profesionales con React.js.'
technologies: ['html', 'css', 'javascript', 'react', 'react-router', 'useReducer', 'useContext']
---

> 🎥 Puedes ver un videotutorial completo sobre [cómo crear tu aplicación React con Context.API y useReducer siguiendo esta plantilla]().




## Inicio rápido: `useReducer` y `useContext` en tu Template



### 1. Instalación

Asegúrate de seguir primero los pasos de [ejecutar el proyecto](https://github.com/4GeeksAcademy/react-hello-webapp/blob/master/README.es.md), luego vuelve a esta lectura. Si estás usando **Codespaces** es posible que el proyecto ya esté en ejecución.



### 2. Añade tu primera vista

La app inicia en `main.jsx`, donde se define el proveedor global. Las rutas están en el archivo `routes.jsx`, que organiza la navegación de la aplicación a través de `reac-router`, puedes [leer más sobre React Router aquí](https://4geeks.com/lesson/routing-our-views-with-react-router).

Abre  el archivo `routes.jsx`, donde se definen las rutas como:

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

Como verás ya hemos añadido algunas rutas como `Home`, `Demo` y `Single`, estas vistas son ejemplos útiles de las cosas más frecuentes que sueles necesitar en un proyecto.

### 3. Codifica tu primera vista HTML

Como puedes ver, la página `/pages/Demo.jsx` es un componente React  que accede al estado global y despacha acciones:

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
Algunos puntos claves que podrias observar de esta vista, son:

- El componente devuelve HTML.
- Al principio del archivo del componente (`Demo.js`) se hace la importacion de `useGlobalReducer` que se utilizará para tratar cualquier información global necesaria de otras vistas o de la aplicación.
- También es importante mencionar que `useGlobalReducer` se llama dentro del componente, en el primer par de líneas:

```js
const { store, dispatch } = useGlobalReducer();
```


### 4. Añadir estilos a componentes  

Guarda estilos en el archivo `index.css` o crea archivos CSS por componente.  

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

### 5. Crea tu primer componente reutilizable  

Crea `./components/Card.jsx`:  

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



### 6. Uso del contexto (`useGlobalReducer`)

`useGlobalReducer` obtiene `store` y `dispatch` desde el contexto global definido en `src/hooks/useGlobalReducer.jsx`, conectándose con el sistema de manejo de estado de `src/store.js`.

#### 🟡 ¿Cómo usarlo?
En tus componentes, importa y usa el hook `useGlobalReducer` para acceder al estado (`store`) y actualizarlo mediante `dispatch`.

#### 📌 Ejemplo en `Demo.jsx`:

```javascript
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Demo = () => {
  const { store, dispatch } = useGlobalReducer();
  
  const cambiarColor = (id) => {
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
          <button onClick={() => cambiarColor(todo.id)}>
            Cambiar color
          </button>
        </li>
      ))}
    </ul>
  );
};
```

### Cómo funcionan las acciones (`store.js`):

El estado global se guarda y gestiona en `src/store.js` mediante un *reducer* y un estado inicial definido en `initialStore`.

#### Estado inicial (`initialStore`):
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

El estado inicial contiene un mensaje y una lista de tareas (`todos`), cada una con un `id`, `title` y `background`.

#### Reducer (`storeReducer`):

Cuando se ejecuta `dispatch`, la acción es recibida por el *reducer* en `src/store.js`, que actualiza el estado según el `type`:

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

Con esta estructura (`initialStore` y `storeReducer`), tu aplicación mantiene un estado global centralizado y escalable. 


## ¡Publica tu sitio web!

1. **Vercel:** El proveedor de alojamiento GRATUITO recomendado es [vercel.com](https://vercel.com/), puedes desplegar en 1 minuto escribiendo los siguientes 2 comandos:

Iniciar sesión (necesitas tener una cuenta):
```sh
$ npm i vercel -g && vercel login
```
Desplegar:
```sh
$ vercel --prod
```
✎ Nota: Si no tienes una cuenta, simplemente ve a vercel.com, crea una cuenta y regresa aquí.

![Procedimiento de ejemplo de Vercel para desplegar](https://github.com/4GeeksAcademy/react-hello-webapp/blob/4b530ba091a981d3916cc6e960e370decaf2e234/docs/deploy.png?raw=true)
