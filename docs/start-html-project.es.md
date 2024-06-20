---
title: 'Iniciar un nuevo proyecto HTML/CSS'
description: 'Cree y publique el sitio web HTML/CSS más básico que pueda construir'
technologies: ['html', 'css', 'python','javascript']
---

La plantilla más básica para cualquier estudiante de la Academia 4Geeks ideal para empezar su primer sitio web HTML/CSS.

## Si estás **trabajando localmente**:

Descarga e [instala python usando pyenv](https://4geeks.com/es/how-to/que-es-pyenv-y-como-instalar-pyenv).

## Si estás trabajando desde Gitpod:

Haz clic en [este enlace para iniciar tu proyecto](https://gitpod.io#https://github.com/4GeeksAcademy/html-hello.git).

[![Cómo abrir la vista previa html/css de mi proyecto](https://github.com/4GeeksAcademy/Templates-Boilerplates/blob/master/static/img/preview.png?raw=true)](https://youtu.be/dfbDCMu_p-0)

## ¿Qué hacer a continuación?

Cree un archivo `index.html` con la [estructura HTML básica](https://4geeks.com/es/lesson/what-is-html-learn-html-es#page-structure) y véalo en vivo ejecutando web-server con el siguiente comando:

```bash
$ pip install flask && python server.py
```

- Puedes crear tantos archivos HTML como quieras 
- También puedes crear archivos CSS y puedes importarlos a tu sitio web utilizando una etiqueta `<link>` colocada entre las etiquetas `<head></head>`, así:

```html
<head>
  ...
  <link rel="stylesheet" type="text/css" href="styles.css">
  ...
</head>
```
