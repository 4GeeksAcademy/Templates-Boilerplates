# Example actions using TypeORM & Express

Each of these actions can be matched with a URL like this:

```
router.get('/some_url', yourAction);
```

But we are not going to be focusing on the URL's but only the actions, here is the table of contents:

1. How to create
2. How to edit/update
3. How to delete
4. How to get one user
5. How to get all users
6. Update logged in user


## 1) How to create

We must always start with validations, the best way to notify a validation error to the user is by throwing exceptions like this:

```js
if(something_wrong) throw new Exception("Message to the user")
```

Here is the sample user creation:

```js
export const createUser = async (req: Request, res:Response): Promise<Response> =>{

	// important validations to avoid ambiguous errors, the client needs to understand what went wrong
	if(!req.body.first_name) throw new Exception("Please provide a first_name")
	if(!req.body.last_name) throw new Exception("Please provide a last_name")
	if(!req.body.email) throw new Exception("Please provide an email")
	if(!req.body.password) throw new Exception("Please provide a password")

	const userRepo = getRepository(Users)// to manipulate users I need the user repository
	// fetch for any user with this email
	const user = await userRepo.findOne({ where: {email: req.body.email }})
	if(user) throw new Exception("User already exists with this email")

	const newUser = getRepository(Users).create(req.body);  //Create the new user based on the incoming json body
	const results = await getRepository(Users).save(newUser); //commit to the database
	return res.json(results);
}
```

## 2) How to update entities

Very similar to the user creation, we need to start with validations and then proceed to update the user:

```js
export const updateUser = async (req: Request, res:Response): Promise<Response> =>{
    const userRepo = getRepository(Users) // I need the userRepo to manage users

    // find user by id
	const user = await userRepo.findOne(req.params.id); 
	if(!user) throw new Exception("Not User found");
	
    // better to merge, that way we can do partial update (only a couple of properties)
	userRepo.merge(user, req.body); 
	const results = await userRepo.save(user);  // commit to DB	
	return res.json(results);
}
```

## 3) How to delete

```js
export const deleteUser = async (req: Request, res: Response): Promise<Response> =>{
	const users = await getRepository(Users).delete(req.params.id);
	return res.json(users);
}
```

## 4) How to get one single user

Get a single user is simple using the findOne, but the cool part is that you can also retrieve the user planets by passing a second param to the findOne function. `{ relations: ["planets"] }`

Note: there are other ways to find, [you can read more about find here](./query).

```js
export const getUser = async (req: Request, res: Response): Promise<Response> =>{
	
    // we can pass a second param to the findOne with the extra relations that we need
	const user = await getRepository(Users).findOne(req.params.id, { relations: ["planets"] });
	if(!user) throw new Exception("User not found", 404)

	return res.json(user);
}
```

## 5) Get all users

Similar to the single user find, but we use the function `find` instead of `findOne`.

```js
export const getUsers = async (req: Request, res: Response): Promise<Response> =>{
		const users = await getRepository(Users).find();
		return res.json(users);
}
```

## 6) Update currently logged in user

It's very similar to updating any other user, the difference is that we can get the current user ID using `req.user.id`.

```js
export const updateCurrentUser = async (req: Request, res:Response): Promise<Response> =>{
    const userRepo = getRepository(Users) // I need the userRepo to manage users

	/**
	 * We can guess the current user from the authentication, more information about that here:
	 * get-the-authenticated-user
	*/
	if(!req.user) throw new Exception("No user was found on the session token")
	const user_id = (req.user as ObjectLiteral).id
	const user = await userRepo.findOne(user_id); 
	if(!user) throw new Exception("User not found");
	
    // better to merge, that way we can do partial update (only a couple of properties)
	userRepo.merge(user, req.body); 
	const results = await userRepo.save(user);  // commit to DB	
	return res.json(results);
}
```
