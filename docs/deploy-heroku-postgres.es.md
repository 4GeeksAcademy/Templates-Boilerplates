---
title: 'Despliegue en Heroku'
description: 'Publique su sitio web en Heroku'
technologies: ['postgres', 'databases','flask','node','express','react']
---

> Desplegar en Heroku, toma 7 minutos.

Esta plantilla es 100% compatible con Heroku, sólo asegúrese de entender y ejecutar los siguientes pasos.

0. Crea una cuenta en heroku.com, no crees un proyecto, eso lo harás después, todo lo que necesitas es email y contraseña configurados.

1. Instala Heroku (si aún no lo tienes)
```bash
$ npm i heroku -g
```

2. Inicie sesión en Heroku en la línea de comandos (si aún no lo ha hecho)
```bash
$ heroku login -i
```

3. Cree una aplicación (si aún no la tiene)
```bash
$ heroku create <your_application_name>
```

4. Instalar buildpack-registry y buildpacks
```bash
$ heroku plugins:install buildpack-registry
$ heroku plugins:install buildpacks 
```

5. Añadir capacidades Python y también node.js a Heroku para poder utilizar npm en producción.
```bash
$ heroku buildpacks:add --index 1 heroku/python
$ heroku buildpacks:add --index 2 heroku/nodejs
```

6. Añada una nueva base de datos Postgres a su proyecto
```bash
$ heroku addons:create heroku-postgresql:hobby-dev
# este comando también añadirá automáticamente una variable env DATABASE_URL con la url de la base de datos Postgres
```

7. Otras Variables de Entorno

No puedes crear un archivo `.env` en Heroku, en su lugar necesitas añadir manualmente todas las variables usando la línea de comandos o bajo la configuración de tu proyecto en el dashboard de Heroku.

Abre tu archivo `.env` y copia y pega cada variable (FLASK_APP, FLASK_ENV, etc.) en Heroku. ⚠️ No añadas la variable `DATABASE_URL` de nuevo, ya fue añadida por Heroku automáticamente cuando añadimos el complemento Postgres.

```bash
$ heroku config:set FLASK_APP_KEY="any key works"
$ heroku config:set FLASK_APP=src/app.py
#                               ↓ Importante: Establecer a "producción"
$ heroku config:set FLASK_ENV=production 
$ heroku config:set BASENAME=/
$ heroku config:set BACKEND_URL=
```

<p align="center">
<img width="400px" alt="Configuring Env Variables" src="https://github.com/4GeeksAcademy/flask-rest-hello/blob/main/docs/assets/env_variables.gif?raw=true" />
</p>

## ¡Sube tus cambios!

El último paso es enviar el código a Heroku con los cambios más recientes:

```bash
$ git add .
$ git commit -m 'deploying to heroku'
$ git push heroku main
```

## ¡Listo!

Ya está. Si se encuentra con algún problema, por favor consulte el [archivo FAQ Heroku](https://help.heroku.com/).
