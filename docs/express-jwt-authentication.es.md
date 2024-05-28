---
title: 'Autenticacion con JWT y Express'
description: 'Implemente  autenticación en su API Express con un JSON web token'
technologies: ['expressjs', 'node', 'JWT','RestAPI']
---

# Pasos para implementar JWT dentro de su aplicación express

## 1) Instalación

Instala estas 3 librerías que se encargarán de generar los tokens JWT:

```bash
npm install express-jwt @types/express-jwt jsonwebtoken @types/jsonwebtoken --save
```

## 2) Login endpoint

El segundo paso es crear una ruta API que pueda ser llamada por el cliente para generar un token (también conocido como login), esta ruta recibirá el `email` y `password` del `body` y buscará cualquier usuario en la base de datos que coincida con esos dos valores.

Si encuentra el valor, generará un token llamando a la función `jwt.sign`.

```js
//esta línea va en tu public_routes.ts
router.post('/token', safe(createToken));

// esta función va en tu actions.ts
export const createToken = async (req: Request, res: Response): Promise<Response> =>{
  
 if(!req.body.email) throw new Exception("Please specify an email on your request body", 400)
 if(!req.body.password) throw new Exception("Please specify a password on your request body", 400)

 const userRepo = await getRepository(Users)

 // Necesitamos validar que existe un usuario con este email y contraseña en la BD
 const user = await userRepo.findOne({ where: { email: req.body.email, password: req.body.password }})
 if(!user) throw new Exception("Invalid email or password", 401)

 // esta es la línea más importante en esta función, se crea un token JWT
 const token = jwt.sign({ user }, process.env.JWT_KEY as string);
 
 // devolver al cliente el usuario y el token creado recientemente
 return res.json({ user, token });
}
```

## 3) Ejecución

Ahora tenemos que añadir un [middleware](https://developer.okta.com/blog/2018/09/13/build-and-understand-express-middleware-through-examples) que buscará el token en el [Encabezado de autorización de la petición](https://blog.restcase.com/restful-api-authentication-basics/).

Añade estos dos middlewares dentro de `./src/app.js` que se encargarán de hacer cumplir el token.

```js
// ⬆ todo lo ANTERIOR es público
let opt: Options = { secret: process.env.JWT_KEY as string, algorithms: ["HS256"] }
app.use(jwt(opt))
// ⬇ todo lo que esté POR DEBAJO es público
app.use(((err: any, req: any, res: any, next: any) => {
 if (err) console.error(err);
 if (err.name === 'UnauthorizedError') {
   res.status(401).json({ status: err.message });
 }
 next();
}))
```

#### ⚠️ Important

Cualquier endpoint que se añada DEBAJO de estos middlewares será privado, por ejemplo:

```js
app.get('/public', (req, res) => {
 res.json({ message: "Anyone can see me" }); 
})

// ⬆ anything ABOVE is public
app.use(jwt(opt)) // ⬅ JWT Middleware
// ⬇ anything BELOW is public

app.get('/private', (req, res) => {
 res.json({ message: "If you can se me, you are logged in" }); 
})
```

## 3) Obtener el usuario autenticado

Hemos terminado, pero si sólo los usuarios registrados pueden llamar a nuestros endpoints privados, entonces necesitamos una forma de saber quién los está llamando, por ejemplo podemos usar `req.user` de ahora en adelante, para identificar al usuario de la petición:

```js
export const getMe = async (req: Request, res: Response): Promise<Response> =>{
 
 const users = await getRepository(Users).find({ where: });
 //                  ⬇ no procedentes de la BD
 return res.json(req.user);
}
```

O podemos utilizar esa información y obtener más información del solicitante de la base de datos.

```js
export const getMe = async (req: Request, res: Response): Promise<Response> =>{


 //                  ⬇ not comming from the BD
 return res.json(req.user);
}
```
