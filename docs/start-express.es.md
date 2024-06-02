---
title: 'Inicie su API con Express.js y Typescript.js'
description: "Uso de Express, Javascript y Typescript para crear API REST"
technologies: ["TypeORM", "TypeScript", "Node.js", "Express.js", "Postgres"]
---


🍬 Technologies: TypeORM, TypeScript, Node.js, Express.js, Postgres

## Inicio rápido

Crear una API es básicamente crear una lista de endpoints que quieres que otros desarrolladores soliciten cada vez que necesiten interactuar con tu base de datos para Crear, Actualizar, Borrar o Leer información.
Cuando usas Express.js esos endpoints tienen que ser añadidos a tu API usando la función router.get (o post, put o delete). Por ejemplo:

```js
router.get("/users", getUser)
```

La línea anterior, especifica un nuevo endpoint que otros desarrolladores podrán llamar solicitando `GET /users`.

Después de declarar tu ruta, también tienes que declarar tu función que manejará esa petición (en este caso `getUser`)

Los dos ficheros principales que te interesan son `./src/<private|public>_routes.ts` y `./src/actions.ts` y tendrás que modificar ambos cada vez que crees un nuevo endpoint.

### 1) Añadir la URL de la ruta

#### Ruta final público o privado?

En primer lugar, debe pensar en la seguridad de su ruta: ¿quién utilizará esta ruta? ¿Cualquier usuario público o sólo los usuarios registrados?

Hay dos archivos y debes actualizar uno u otro **para cada endpoint que crees**:

- `public_routes.ts` es para URLs API que van a ser utilizadas por cualquiera, sin ningún tipo de seguridad, por ejemplo: Todo el mundo puede registrarse, todo el mundo puede intentar iniciar sesión, etc. - `private_routes.ts` estas URLs serán sólo para usuarios registrados, por ejemplo: Obtener mi lista de favoritos, u obtener mi información, etc.

Abre el archivo `./src/<private|public>_routes.ts` que hayas elegido y añade una nueva ruta a la lista de endpoints, por ejemplo, si queremos construir un endpoint para recuperar la información de un único usuario por un ID dado, por ejemplo: `GET /user/2`.

```ts
import { Router } from 'express';
import { safe } from './utils';
import { getUser } from './actions';
const router = Router();


router.get('/user/:id', safe(getUser));
```

> 👉 Nota: tenga en cuenta que la función `safe` debe llamarse siempre antes de su acción o los errores de la API serán silenciosos.

### 2) Declarando tu actions.ts

Abre el archivo `./src/actions.ts` y añade o reutiliza una de las funciones de acción, por ejemplo:

```ts
export const getUser = async (req: Request, res: Response): Promise<Response> =>{
 
 const users = await getRepository(Users).findOne(req.params.id);
 return res.json(users);
}
```

## Validar las solicitudes entrantes

Los desarrolladores junior siempre asumen que todo va a ir bien, mientras que los senior están preparados para los peores escenarios posibles.

Por ejemplo, hay que asumir que la información llega en un formato incorrecto: Los correos electrónicos no tienen el nombre de dominio dentro, los números de teléfono tienen letras, etc.

Hay tres posibles tipos de validaciones que recomendamos hacer:

### A) Validación de la carga útil de la solicitud (body)

El payload de la petición puede ser recuperado haciendo `req.body`, este es un ejemplo de cómo validar si el cuerpo de la petición contiene la propiedad `first_name`:

```ts
export const getUser = async (req: Request, res:Response): Promise<Response> =>{

 // validate that first_name exists or throw a new exception if not.
 if(!req.body.first_name) throw new Exception("Please provide a first_name")

 // the rest of your function code goes here

})
```

### B) Validación de los parámetros de la petición (en la url)

Si la URL de tu endpoint espera un parámetro puedes acceder a él escribiendo `req.params`, por ejemplo, si el endpoint `GET /user/:id` es llamado con `GET /user/23`, podemos recuperar el valor así:

```ts
 const user = await getRepository(Users).findOne(req.params.id);
 if(!user) throw new Exception("User not found", 404)
```

Básicamente estamos consultando la base de datos para obtener el usuario con ese ID dado y asegurarnos de que existe. 

### C) Otros ejemplos de validación

En el siguiente archivo [🔥🔥🔥 puedes encontrar más ejemplos de validación.](https://4geeks.com/es/docs/start/ejemplos-de-actions-en-express)

## Consulta a la base de datos (Obtener información)

TypeORM tiene un montón de maneras de recuperar información de la base de datos, vamos a mostrar los ejemplos más utilizados aquí, y puede consultar este documento para formas más avanzadas de consultar información.

> ⚠️ Importante: Siempre debe comenzar declarando un nuevo `repositorio` para esa entidad.

```js
const user = repository.create({
    id: 1,
    firstName: "Timber",
    lastName: "Saw",
}) // lo mismo que const user = new User(); user.firstName = "Timber"; user.lastName = "Saw";
```

Después de tener el objeto repositorio puede iniciar su consulta, por ejemplo:

### Buscar por

Buscar el usuario con el nombre "Bob".

```js
userRepository.find({ where: { firstName: "Bob", lastName: "Saw" } });
```

### Find by (many)

Find the user with the first name "Bob"

```js
userRepository.find({ where: { firstName: "Bob", lastName: "Saw" } });
```

### Buscar uno por (sólo uno)

Encontrar el usuario con el nombre "Bob"

```typescript
userRepository.findOne(1, {
    where: { firstName: "Bob" }
})
```

### Más consultas avanzadas

[🔥🔥🔥 Haga clic aquí para ver más ejemplos de consultas avanzadas](https://4geeks.com/es/docs/start/consultas-con-express)

## Operaciones CRUD de base de datos

TypeORM es una de las librerías ORM más sencillas de usar.

### Crear un usuario

He aquí un ejemplo muy sencillo de cómo crear un nuevo usuario:

```js
const user = repository.create({
    id: 1,
    firstName: "Timber",
    lastName: "Saw"
}); // mismo que const user = new User(); user.firstName = "Timber"; user.lastName = "Saw";
```

### Borrar un usuario

Suponiendo que desea eliminar el usuario con ID=1

```js
await repository.delete(1);
```

### Actualizar un usuario

Suponiendo que desea actualizar el usuario con el ID=1 y establecer su nombre a Rizzrak:

```js
await repository.update(1, { firstName: "Rizzrak" });
```

[🔥🔥🔥 Aquí puede encontrar otros ejemplos de operaciones CRUD más complejas.](https://4geeks.com/es/docs/start/haciendo-un-crud-con-express)

## Migraciones (sólo para el entorno de producción)

Usted no tiene que utilizar las migraciones en el modo de desarrollo porque TypeORM ya lo hace por usted, pero antes de pasar a la producción tiene que ejecutar el siguiente comando para crear sus migraciones:

1. Generar un nuevo archivo de migración después de los cambios realizados en los modelos:

```bash
npm run makemigrations
```

2. Aplique todas sus migraciones pendientes:

```bash
npm run migrate
```

## PostgreSQL

Esto te proporcionará un servidor PostgreSQL de auto-inicio (debería auto-iniciarse cada vez que abras un nuevo Terminal), además de unos cuantos scripts de utilidades que puedes ejecutar en un Terminal o en un comando .gitpod.yml:

```
pg_start: inicia el servicio PostgreSQL
pg_stop: detiene el servicio PostgreSQL
pg_ctl status: comprueba si el servicio PostgreSQL se está ejecutando
Una vez que el servidor PostgreSQL se está ejecutando, puede utilizar la CLI psql como de costumbre:

$ psql -h localhost -d postgres
psql (10.8 (Ubuntu 10.8-0ubuntu0.18.10.1))
Type "help" for help.

postgres=#
```
## ¿Cómo implementar un esquema JWT en mi API con Flask?

> [En éste artículo encontrarás todos los detalles de cómo implementar este esquema en tu API Flask](https://4geeks.com/es/lesson/what-is-JWT-and-how-to-implement-with-Flask-es)