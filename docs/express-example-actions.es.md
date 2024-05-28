---
title: 'Ejemplos de acciones en Express'
description: 'Echa un vistazo a cómo crear rutas funcionales que gestionen la información de tu base de datos'
technologies: ['expressjs', 'node', 'Postgres','RestAPI']
---

## Ejemplos de acciones con TypeORM y Express

Cada una de estas acciones puede emparejarse con una URL como ésta:

```
router.get('/some_url', yourAction);
```

Pero no vamos a centrarnos en las URL sino sólo en las acciones, aquí está el índice:

1. Cómo crear
2. Cómo editar/actualizar
3. Cómo borrar
4. Cómo obtener un usuario
5. Cómo obtener todos los usuarios
6. Actualizar usuario registrado

## 1) Cómo crear

Siempre debemos empezar con validaciones, la mejor forma de notificar un error de validación al usuario es lanzando excepciones como esta:

```js
if(something_wrong) throw new Exception("Message to the user")
```

Este es el ejemplo de creación de un usuario:

```js
export const createUser = async (req: Request, res:Response): Promise<Response> =>{

// validaciones importantes para evitar errores ambiguos, el cliente necesita entender qué ha fallado
if(!req.body.first_name) throw new Exception("Please provide a first_name")
if(!req.body.last_name) throw new Exception("Please provide a last_name")
if(!req.body.email) throw new Exception("Please provide an email")
if(!req.body.password) throw new Exception("Please provide a password")

const userRepo = getRepository(Users)// para manipular usuarios necesito el repositorio de usuarios
// buscar cualquier usuario con este email
const user = await userRepo.findOne({ where: {email: req.body.email }})
if(user) throw new Exception("User already exists with this email")

const newUser = getRepository(Users).create(req.body);  //Crear el nuevo usuario basado en el cuerpo json entrante
const results = await getRepository(Users).save(newUser); //confirmar en la base de datos
return res.json(results);
}
```

## 2) ¿Cómo actualizar entidades?

De forma muy similar a la creación de usuarios, necesitamos empezar con las validaciones y luego proceder a actualizar el usuario:

```js
export const updateUser = async (req: Request, res:Response): Promise<Response> =>{
    const userRepo = getRepository(Users) // Necesito el userRepo para gestionar usuarios

    // encontrar usuario por id
 const user = await userRepo.findOne(req.params.id); 
 if(!user) throw new Exception("Not User found");
 
    // mejor fusionar, asi podemos hacer actualizacion parcial (solo un par de propiedades)
 userRepo.merge(user, req.body); 
 const results = await userRepo.save(user);  // commit to DB 
 return res.json(results);
}
```

## 3) ¿Como borrar?

```js
export const deleteUser = async (req: Request, res: Response): Promise<Response> =>{
 const users = await getRepository(Users).delete(req.params.id);
 return res.json(users);
}
```

## 4) ¿Como obtener un solo usuario?

Obtener un único usuario es sencillo utilizando findOne, pero lo bueno es que también puedes recuperar los planets de usuarios pasando un segundo parámetro a la función findOne. `{ relations: ["planets"] }`

Nota: hay otras formas de buscar, [puedes leer más sobre buscar aquí](./consultas-con-express).

```js
export const getUser = async (req: Request, res: Response): Promise<Response> =>{
 
    // podemos pasar un segundo parámetro al findOne con las relaciones extra que necesitamos
 const user = await getRepository(Users).findOne(req.params.id, { relations: ["planets"] });
 if(!user) throw new Exception("User not found", 404)

 return res.json(user);
}
```

## 5) Obtener todos los usuarios

Similar a la búsqueda de un solo usuario, pero usamos la función `find` en lugar de `findOne`.

```js
export const getUsers = async (req: Request, res: Response): Promise<Response> =>{
  const users = await getRepository(Users).find();
  return res.json(users);
}
```

## 6) Actualizar el usuario actualmente conectado

Es muy similar a actualizar cualquier otro usuario, la diferencia es que podemos obtener el ID del usuario actual usando `req.user.id`.

```js
export const updateCurrentUser = async (req: Request, res:Response): Promise<Response> =>{
    const userRepo = getRepository(Users) // I need the userRepo to manage users

 /**
  * Podemos adivinar el usuario actual a partir de la autenticación, más información sobre esto aquí:
  * get-the-authenticated-user
 */
 if(!req.user) throw new Exception("No user was found on the session token")
 const user_id = (req.user as ObjectLiteral).id
 const user = await userRepo.findOne(user_id); 
 if(!user) throw new Exception("User not found");
 
    // mejor que merge, así podemos hacer actualización parcial (sólo un par de propiedades)
 userRepo.merge(user, req.body); 
 const results = await userRepo.save(user);  // commit to DB 
 return res.json(results);
}
```
