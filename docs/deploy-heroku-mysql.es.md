---
title: 'Deploy to Heroku using MySQL'
description: 'Publish your website to Heroku with a MySQL database'
technologies: ['mysql', 'databases','flask','node','express','react']
---

> Implementación en Heroku (7 minutos)

Nuestras plantilla son compatibles con Heroku, sólo asegúrese de entender y ejecutar los siguientes pasos:

## Prepárate

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

4. Commit y Push a Heroku. Asegúrese de que ha confirmado los cambios y empujar a Heroku.

```bash
$ git push heroku master
```

## Variables de entorno (2 minutos)

<p align="center">
<img width="400px" alt="Configuring Env Variables" src="https://github.com/4GeeksAcademy/flask-rest-hello/blob/main/docs/assets/env_variables.gif?raw=true" />
</p>

No puedes crear un archivo `.env` en Heroku, en su lugar necesitas crear manualmente todas las variables bajo la configuración de tu proyecto.

Abre tu archivo `.env` y copia y pega cada variable (FLASK_APP, DB_CONNECTION_STRING, etc.) en Heroku.

## Despliegue de la base de datos en Heroku (3 minutos)

<p align="center">
<img width="400px" alt="Create DB on heroku" src="https://github.com/4GeeksAcademy/flask-rest-hello/blob/main/docs/assets/db_config.gif?raw=true" />
</p>

Tu Base de Datos MySQL local ahora tiene que ser subida a una nube, hay un montón de servicios que proporcionan alojamiento de bases de datos MySQL, pero recomendamos JawsDB porque tiene un Tier Gratuito, es simple y 100% integrado con Heroku.

1. Ve al panel de control de tu proyecto Heroku y busca añadir un nuevo add-on Heroku.

2. Busca JawsDB MySQL. 2. Busque JawsDB MySQL y añádalo a su proyecto (puede que le pida una tarjeta de crédito pero no se le cobrará mientras se mantenga dentro de los 5mb de tamaño de base de datos, suficiente para su demo).

3. Una vez que JawsDB esté añadido a su proyecto, haga clic en "Añadir". Una vez que JawsDB este agregado a su proyecto, busque el Connection String dentro de su dashboard de JawsDB, algo como:

```
mysql://tqqa0ui0cga32nxd:eqi8nchjbpwth82v@c584md9egjnm02sk.5btxwkvyhwsf.us-east-1.rds.amazonaws.com:3306/45fds423rbtbr
```

4. Copia la cadena de conexión y crea una nueva variable de entorno en la configuración de tu proyecto.

5. Ejecuta las migraciones en Heroku: Después de que tu base de datos esté conectada, tienes que crear las tablas y la estructura, puedes hacerlo ejecutando el comando `pipenv run upgrade` en el servidor de producción así:

```bash
$ heroku run -a=<your_app_name> pipenv run upgrade
```

> ⚠️ Nota: Ten en cuenta que tienes que sustituir `<nombre de tu aplicación>` por el nombre de tu aplicación, también tienes que haber iniciado sesión en Heroku en tu terminal (puedes hacerlo escribiendo `heroku login -i`)
