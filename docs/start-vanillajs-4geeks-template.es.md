---
title: 'Proyecto Vanilla.js'
description: 'Utilizar Webpack para compilar y crear un proyecto con Javascript y HTML/CSS actualizados.'
technologies: ['vanillajs', 'html', 'css']
---

# Empezar un proyecto en Vanilla JS

Empieza a programar en 30 segundos [abriendo esta plantilla en un nuevo ordenador en la nube aquí](https://breathecode.herokuapp.com/v1/provisioning/public/container/new?repo=https://github.com/4GeeksAcademy/vanillajs-hello.git).

O puede descargar la plantilla en su ordenador e instalarla manualmente siguiendo los pasos que se indican a continuación:

1) Recuerda instalar primero los paquetes npm:
```bash
$ npm install
```

2) Construye y empieza a codificar

Construir la aplicación por primera vez...

```bash
$ npm run start
```

Y empieza a codificar tu aplicación Vanilla.js, actualiza el `src/index.html`, `src/style.css` o `src/app.js` dependiendo de tus necesidades.

## FAQ

### 1) ¿Cómo puedo ejecutar mi código?

- Escriba en la línea de comandos `$ npm run start` y escriba localhost en el navegador.

### 2) ¿Dónde escribo mi código?

Depende del lenguaje, pero tienes `./src/app.js`, `./src/style.css` y `./src/index.html` respectivamente, puedes añadir nuevos `.html` a tu gusto, sólo asegúrate de importarlos en el `app.js`.

> Nota: recuerda que el flujo de trabajo JS comienza dentro de `window.onload`.

### 3) No veo mis cambios.

Cada vez que cambies cualquier archivo dentro de la carpeta `./src` la URL pública del sitio web refrescará automáticamente los cambios (es un proceso llamado hot deploy) Recuerda también refrescar limpiando la caché (`command+shift+r` en Mac, `control+shift+r` en PC y Linux)

### 4) ¿Cómo puedo incluir más imágenes en mi proyecto?
Añádelas dentro de la carpeta `./src/assets/img` e impórtalas desde cualquiera de tus archivos JS. Por ejemplo: `import "../assets/img/rigo-baby.jpg";`.

### 5) ¿Cómo incluyo más archivos JS?
Simplemente añade los archivos en la carpeta JS e importa los archivos/variables en tu `app.js`. Por ejemplo: `import myVar from "./archivo2.js"`.

### 6) ¿Cómo publico el sitio web?

Este boilerplate es 100% compatible con el alojamiento gratuito de páginas en Github. Publica tu página web ejecutando:
```bash
$ npm run deploy
```

¡Muy fácil y en un solo paso! Empuja a tu rama __main__ y utiliza el alojamiento gratuito que viene con [GitHub pages](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/#enabling-github-pages-to-publish-your-site-from-master-or-gh-pages), el proyecto está listo para ser publicado. Recuerda elegir ejecutar la página de Github desde tu rama maestra.
