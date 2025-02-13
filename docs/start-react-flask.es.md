---
title: 'Comienza un proyecto Fullstack con React $ Flux'
description: 'Utiliza Javascript con React.js para construir una aplicación web profesional.'
technologies: ['html', 'css', 'python','javascript','flask','react']
---

Esta plantilla tiene `archivos backend` y `archivos frontend` juntos, es la combinación perfecta de las plantillas React Flux y Flask API para que puedas crear una aplicación Full Stack aplicando todos los conceptos utilizados en el mundo profesional.

## Front end

Puedes encontrar una explicación completa sobre cómo crear nuevas páginas, componentes, añadir estilos y usar el contexto, dentro de [esta documentación previa que creamos para la plantilla React Flux](https://4geeks.com/es/docs/start/inicia-react-flux). Esto se debe a que la plantilla Full-Stack fue creada bajo la misma estructura y conceptos que aquella.

## Backend

Usted puede encontrar una explicación completa sobre la creación de sus puntos finales de la API de Flask, la creación de nuevos modelos, migraciones de base de datos y el uso del administrador de Flask [en esta documentación](https://4geeks.com/es/docs/start/inicia-api-flask-python), esto se debe a que esta plantilla fue creada con la misma estructura y conceptos que la plantilla de la API de Flask.

## Instalación manual (sólo si es necesario)

### Instalación Manual del Back-End

Se recomienda instalar primero el backend, asegúrate de tener Python 3.8+, Pipenv y un motor de base de datos (Postgres recomendado)

1. Instala los paquetes de python: `$ pipenv install`
2. Crea un archivo .env basado en el .env.example: `$ cp .env.example .env`
3. Instala tu motor de base de datos y crea tu base de datos. Instala tu motor de base de datos y crea tu base de datos, dependiendo de tu base de datos tienes que crear una variable DATABASE_URL con uno de los valores posibles, asegurate de reemplazar los valores con la información de tu base de datos:

| Engine | DATABASE_URL       |
| ------------- | ----------------------------------------------------- |
| SQLite | sqlite:////test.db      |
| MySQL  | mysql://username:password@localhost:port/example |
| Postgres | postgres://username:password@localhost:5432/example  |

4. Migrar las migraciones: `$ pipenv run migrate` (omitir si no se han hecho cambios en los modelos en el `./src/api/models.py`)
5. Ejecuta las migraciones: `$ pipenv run upgrade`
6. Ejecuta la aplicación: `$ pipenv run start`.

### Instalación Manual del Front-End

- Asegúrate de que estás utilizando la versión 14+ de node y que ya has instalado y ejecutado correctamente el backend.

1. Instala los paquetes: `$ npm install`
2. Inicia el servidor de desarrollo webpack `$ npm run start`.

## ¡Publica tu sitio web

Esta plantilla es 100% compatible con [Heroku](https://www.heroku.com/) y [Render.com](https://www.render.com), sólo asegúrate de leer las guías de despliegue rápido.

1. [Cómo desplegar en Render.com](https://4geeks.com/es/docs/start/despliega-con-render-com) (gratis)
2. [Cómo desplegar en Heroku.com](https://4geeks.com/es/docs/start/desplegar-a-heroku-con-postgresql) (desde $0.01 mensual)
