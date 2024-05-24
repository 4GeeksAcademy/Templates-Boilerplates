# Steps to implement JWT inside your express application

## 1) Installation

Install these 3 libraries that will take care of generating the JWT tokens:

```bash
$ npm install express-jwt @types/express-jwt jsonwebtoken @types/jsonwebtoken --save
```

## 2) Login endpoint

Second step is to create one API Route that can be called by the client to
generate a token (a.k.a: login), this endpoint will receive the `email` and `password` information form the `body` and look for any user in the DB that matches those two values. 

If the value is found, it will generate a token by calling the function `jwt.sign`.

```js
//this line goes in your public_routes.ts
router.post('/token', safe(createToken));

// this function goes in your actions.ts
export const createToken = async (req: Request, res: Response): Promise<Response> =>{
		
	if(!req.body.email) throw new Exception("Please specify an email on your request body", 400)
	if(!req.body.password) throw new Exception("Please specify a password on your request body", 400)

	const userRepo = await getRepository(Users)

	// We need to validate that a user with this email and password exists in the DB
	const user = await userRepo.findOne({ where: { email: req.body.email, password: req.body.password }})
	if(!user) throw new Exception("Invalid email or password", 401)

	// this is the most important line in this function, it create a JWT token
	const token = jwt.sign({ user }, process.env.JWT_KEY as string);
	
	// return the user and the recently created token to the client
	return res.json({ user, token });
}
```

## 3) Enforcement

Now we need to add a [middleware](https://developer.okta.com/blog/2018/09/13/build-and-understand-express-middleware-through-examples) that will check for the token on the [Request Authoritzation Header](https://blog.restcase.com/restful-api-authentication-basics/).

Add these two middlewares inside `./src/app.js` that will take care of enforcing the token.

```js
// ⬆ anything ABOVE is public
let opt: Options = { secret: process.env.JWT_KEY as string, algorithms: ["HS256"] }
app.use(jwt(opt))
// ⬇ anything BELOW is public
app.use(((err: any, req: any, res: any, next: any) => {
	if (err) console.error(err);
	if (err.name === 'UnauthorizedError') {
	  res.status(401).json({ status: err.message });
	}
	next();
}))
```

#### ⚠️ Important

Any endpoint that is added BELOW these middlewares will be private, for example:
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


## 3) Get the authenticated user

We are done, but if only logged in users are supposed to call our private endpoints, then we need a way to know who is calling them, for example we can use `req.user` from now on, to identify request user):

```js
export const getMe = async (req: Request, res: Response): Promise<Response> =>{
	
	const users = await getRepository(Users).find({ where: });
	//                  ⬇ not comming from the BD
	return res.json(req.user);
}
```

Or we can use that info and get more information form the requester from the database.
```js
export const getMe = async (req: Request, res: Response): Promise<Response> =>{


	//                  ⬇ not comming from the BD
	return res.json(req.user);
}
```