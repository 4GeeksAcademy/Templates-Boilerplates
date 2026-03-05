---
title: 'Autenticacion de APIs con Json Web Tokens'
description: 'Implemente autenticación en su API Express con un JSON web token'
technologies: ['expressjs', 'node', 'JWT','RestAPI', 'python','flask','fastapi']
---

Casi todas las API necesitan una capa o layer de autenticación, y hay muchas maneras de abordar ese problema, hoy vamos a implementar el token JWT en nuestra API Flask.

## Cómo funciona la autenticación de la API

Puedes dividir un proceso de autenticación estándar en 5 pasos principales:

1. El usuario escribe su nombre de usuario y contraseña en tu sitio web.
2. El nombre de usuario y la contraseña se envían a la API de backend.
3. La API busca cualquier registro en la tabla `User` que coincida con el nombre de usuario.
    1. En muchos casos se suelen encriptar las claves al guardarlas, por ello es necesario utilizar un método especifico para validarla dependiendo del caso.
4. Si se valida un usuario, genera un `token` para ese usuario y responde `status_code=200` al front-end.
5. El front-end utilizará ese `token` a partir de ahora para realizar cualquier solicitud futura.

![Autentication workflow](https://github.com/breatheco-de/content/blob/master/src/assets/images/authentication-diagram.png?raw=true)

> ☝️ Si no sabes lo que es un token, te recomiendo [esta lectura](https://4geeks.com/es/lesson/token-based-api-authentication-es).

<!-- ## ¿Cómo implementar un esquema JWT en mi API con express?
 -->
## ¿Cómo implementar un esquema JWT en mi API con Flask?

> [En éste artículo encontrarás todos los detalles de cómo implementar este esquema en tu API Flask](https://4geeks.com/es/lesson/what-is-JWT-and-how-to-implement-with-Flask-es)
