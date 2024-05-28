---
title: 'Despliegue a Render.com'
description: 'Publica tu sitio web con Render.com gratis'
technologies: ['postgres', 'databases','flask','node','express','react']
---

Despliega a Render.com (takes 7 minutes).

> Importante: No puede desplegar este proyecto sin crear primero las migraciones, por favor ejecute el proyecto en su editor de código y asegúrese de que la carpeta `src/migrations` existe. Si no existe, puede ejecutar `pipenv run init` o `flask db init` dentro del entorno. Además, asegúrate de que tienes todas las migraciones necesarias ejecutando `pipenv run migrate` o `flask db migrate` dentro del entorno.

## 1) Crear una cuenta

[Crea una cuenta en Render.com utilizando Github connect](https://dashboard.render.com/register?next=/). Por favor, no hagas nada más.

## 2) Crear blueprint

Crea un blueprint desde tu conexión a Github. [Haz clic aquí](https://dashboard.render.com/select-repo?type=blueprint) y busca el repositorio de su proyecto.

> Importante: Asegúrate de que tu proyecto contiene un archivo `render.yml` en la raíz. El [4Geeks Flask + React boilerplate](https://github.com/4GeeksAcademy/react-flask-hello) viene con él.

Después de elegir su repositorio debería ver una pantalla similar a esta:

![Nuevo blueprint](https://raw.githubusercontent.com/4GeeksAcademy/Templates-Boilerplates/master/static/img/new-blueprint.png)

## 3) Rellene el formulario para el plano

Ahora debería ver un pequeño formulario con 3 preguntas:

- 3.1. Elija un `Nombre de grupo de servicios`, por ejemplo: `Mi primer proyecto`. 
- 3.2. Selecciona una `rama`, normalmente la rama `main` debería ser suficiente.
- 3.3. Pulse el botón azul "Aplicar".

Verás una animación de carga con el estado de la base de datos Postgres y el servicio web que se está construyendo.

![Cargando blueprint](https://raw.githubusercontent.com/4GeeksAcademy/Templates-Boilerplates/master/static/img/loading-blueprint.gif)

Se tarda varios minutos en cargar ambos servicios, por favor sea paciente y espere hasta que aparezcan ambas marcas de verificación.

## 4) Configurar las variables de entorno

Como hiciste en tu proyecto local, tendrás que configurar las variables de entorno adicionales que hayas agregado en tu proyecto en la configuración de Render.

Ve a la sección de Entorno en el panel de tu servidor en Render e incluye las Variables de Entorno adicionales que necesites.

> 🔥 IMPORTANTE: Cada vez que cambies las variables de entorno (ENV VARs), necesitarás volver a desplegar tu proyecto. Las variables de entorno (ENV VARs) solo tienen efecto cuando el proyecto se reconstruye.**

## ¡Tu sitio web está listo!

Una vez que el despliegue haya terminado, puede seguir adelante y abrir su sitio web:

![abre su sitio web](https://raw.githubusercontent.com/4GeeksAcademy/Templates-Boilerplates/master/static/img/open-website.png)

## ¿Errores? Cómo solucionar problemas

Si ha encontrado un error al desplegar el servicio web, [puede consultar los registros del servidor aquí](https://raw.githubusercontent.com/4GeeksAcademy/Templates-Boilerplates/master/site/static/img/blueprint-error.gif). 

Algunas veces el servicio de despliegue tiene errores sin ninguna razón en particular, si cree que ese es su caso, intente [volver a desplegar utilizando un despliegue manual](https://raw.githubusercontent.com/4GeeksAcademy/Templates-Boilerplates/master/site/static/img/manual-deploy.gif). 

## Compruebe los registros de despliegue

Siempre es recomendable comprobar los registros de despliegue en busca de errores o cualquier otro mensaje importante, así es como debería ser un despliegue correcto.

![registro de éxitos](https://raw.githubusercontent.com/4GeeksAcademy/Templates-Boilerplates/master/static/img/success-log.png)
