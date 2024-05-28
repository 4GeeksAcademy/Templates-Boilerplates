---
title: 'Inicia un proyecto Fullstack'
description: 'Utiliza las tecnologías Fullstack para crear aplicaciones profesionales con React.js y FastAPI.'
technologies: ['html', 'css', 'python','javascript','fastapi','react']
---

> 🎥 Puedes ver un videotutorial completo sobre [cómo crear tu aplicación React con Context.API y Flux siguiendo esta plantilla](https://www.loom.com/share/f37c6838b3f1496c95111e515e83dd9b).

## Inicio rápido

Crea tu primera vista, añádela a las rutas de tu aplicación, crea tu primer componente, añade estilos y utiliza la API de contexto.

### Instalación

Asegúrate de seguir primero los pasos de [ejecutar el proyecto](https://github.com/4GeeksAcademy/react-hello-webapp/blob/master/README.md), luego vuelve a esta lista, si estás usando Gitpod o Codespaces es posible que el proyecto ya esté en ejecución.

### Añade tu primera vista

Es hora de añadir algo de código: Todo empieza en el layout de la aplicación (`js/layout.js`), este archivo es como una tabla de contenidos donde se añadirán todas las páginas de tu aplicación antes de que puedan ser renderizadas por React y el navegador, puedes [leer más sobre React Router aquí](https://4geeks.com/lesson/routing-our-views-with-react-router).

Ya hemos añadido algunas rutas como `Home`, `Demo` y `Single`, estas vistas son ejemplos útiles de las cosas más frecuentes que sueles necesitar en un proyecto.

Todas las páginas de tu aplicación se añadirán en la carpeta `js/pages`, cada una de ellas será un componente React independiente.

Abramos la vista `<Demo>` en `js/pages/demo.js`.

### Codifica tu primera vista HTML

Como puedes ver, la página `demo.js` es sólo un componente React, aquí hay cosas adicionales a notar:

- El componente devuelve HTML.
- Al principio del archivo del componente (demo.js) hay dos importaciones: El `AppContext` que se utilizará para tratar cualquier información global necesaria de otras vistas o de la aplicación; Y el `demo.css` que se utilizará para añadir cualquier clase CSS y estilos utilizados en esta vista en particular.
- También es importante mencionar que el AppContext se declara dentro del componente, en el primer par de líneas:

```js
const { store, actions } = useContext(Context);
```

### Añadir estilos a vistas o componentes

Todos los estilos de la aplicación se guardan dentro de la carpeta `styles`, normalmente tenemos un estilo separado para cada componente.

Puedes actualizar `styles/index.css` o crear nuevos archivos `.css` dentro de `styles/` e importarlos a tus archivos CSS o JS actuales dependiendo de tus necesidades.

Por ejemplo, si quieres crear una clase `background-blue` que haga que el fondo de la home sea azul, tienes que hacer algo como esto:

- Añade la clase `.background-blue` en `styles/home.css`.
- Usa tu clase añadiendo el `<div className="background-blue">` en tu página HTML en `js/pages/home.js`.

### Crear su primer componente

Normalmente querrás que la mayor parte de tu aplicación HTML esté dividida en componentes que puedan ser reutilizados.
 
Todos los componentes deben ser creados en `js/components` y luego puedes importarlos a las páginas que los utilizarán.

> Estamos utilizando componentes funcionales (en lugar de componentes orientados a clases), ya que es la mejor práctica en la industria.
 
Por ejemplo, si queremos añadir un nuevo componente `<Card>` que replique la [tarjeta clásica de bootstrap](https://getbootstrap.com/docs/5.0/components/card/), podemos crear un `js/components/Card.js` con el siguiente código:

```jsx
export const Card = () => (
 const [state, setState] = useState('code here'); //utilizar el estado (si es necesario)
 return <div className="card">
   <div className="card-body">
     <h5 className="card-title">Card title</h5>
     <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
     <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
   </div>
 </div>
);
```

### Añadiendo componentes a nuestras páginas

Ahora que tenemos el componente `Card` podemos incorporarlo a nuestra página `Home.js` con los siguientes pasos:

1. Importar el componente en la parte superior de la página.
2. Utiliza la etiqueta del componente `<Card>` dentro del HTML que devuelve tu página, por ejemplo:

```jsx
import { Card } from "../component/Card.js";

export const Home = () => {
 const { store, actions } = useContext(Context);

 return (
  <div className="text-center mt-5">
   <h1>Hello Rigo!!</h1>
   <Card />
  </div>
 );
};
```

**Notas importantes**

- Es importante utilizar las llaves `{` al importar el componente de esta forma: `{ Card }`.
- Observa la etiqueta `<Card />` que se utiliza en la línea 9 del archivo `Home.js`.

### Uso del contexto

Este boilerplate viene con una API de Contexto general centralizada. El archivo `js/store/flux.js` tiene una estructura base para la tienda, te animamos a cambiarla y adaptarla a tus necesidades.

- React Context [docs](https://react.dev/reference/react/useContext).
- Lección de 4Geeks sobre [React hooks](https://content.breatheco.de/lesson/react-hooks-explained).

El `Provider` ya está configurado. Puedes consumir desde cualquier componente usando el hook `useContext` para obtener el `store` y las `actions` del Context. Mira `/views/demo.js` para ver una demo.

```jsx
import { Context } from "../store/appContext";

const MySuperPage = () => {
  //aquí se usaContext para obtener store y actions
  const { store, actions } = useContext(Context);

return <div>{/* puede utilizar sus acciones o almacenar dentro del html */}</div>
}
```

## Publique su sitio web

1. **Vercel:** El proveedor de hosting recomendado GRATIS es [vercel.com](https://vercel.com/), puedes desplegar en 1 minuto escribiendo los siguientes 2 comandos:

Login (necesitas tener una cuenta):

```bash
npm i vercel -g && vercel login
```

Despliegue:

```bash
vercel --prod
```

> ✎ Nota: Si no tiene una cuenta, vaya a vercel.com, cree una cuenta y vuelva aquí.

![Vercel example procedure to deploy](https://github.com/4GeeksAcademy/react-hello-webapp/blob/4b530ba091a981d3916cc6e960e370decaf2e234/docs/deploy.png?raw=true)

2. **Github Pages:** Este boilerplate es 100% compatible con el alojamiento gratuito de páginas Github.
Para publicar su sitio web que necesita para empujar su código a su repositorio de Github y ejecutar el siguiente comando después:

```bash
npm run deploy
```

> 👉 Nota: Tendrás que [configurar las páginas de Github para la rama gh-pages].(https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/#enabling-github-pages-to-publish-your-site-from-master-or-gh-pages)

## Ejecutar el proyecto

> Nota: Asegúrese de que está utilizando la versión 14+ de node

1. Instala los paquetes:

```bash
npm install
```

2. Cree un archivo .env:

```bash
cp .env.example .env
```

3. Empieza a programar y utiliza el servidor de desarrollo webpack con recarga en vivo, para Windows, Mac, Linux o Gitpod:

```bash
npm run start
```
