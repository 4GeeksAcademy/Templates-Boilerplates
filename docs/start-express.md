---
title: 'Start your API with Express.js and Typescript.js'
description: "Use Express, Javascript, Typescript to build REST API's"
---


🍬 Technologies: TypeORM, TypeScript, Node.js, Express.js, Postgres

## Quick Start

Creating an API is basically creating a list of endpoints that you want other developers to request whenever they need to interact with your database to Create, Update, Delete or Read information. 
When using Express.js those endpoints have to be added into your API using the router.get (or post, put or delete) function. For example:

```js
router.get("/users", getUser)
```

The line above, specifies a new endpoint that other devs will be able to call by requesting `GET /users`.

After declaring your route, you also have to declare your function that will handle that request (in this case `getUser`)

The two main files you care about are `./src/<private|public>_routes.ts` and `./src/actions.ts` and you will have to always modify both every time you create a new endpoint.

### 1) Adding the route URL

#### Public or Private endpoint?

First you have to think about your endpoint security, who will be using this endpoint? Any public user or only the logged in users?

There are two files and you should update one or the other **for each endpoint you create**:

- `public_routes.ts` is for API URLs that are going to be used by anyone, no security whatsoever, for example: Everyone can sign up, everyone can try to login, etc.
- `private_routes.ts` these URLs will be only for logged in users, for example: Get my list of favorites, or get my information, etc.

Open your chosen `./src/<private|public>_routes.ts` file and add a new route to the list of endpoints, for example, if we want to build an endpoint to retrieve a single user information by a given ID, for example: `GET /user/2`

```ts
import { Router } from 'express';
import { safe } from './utils';
import { getUser } from './actions';
const router = Router();


router.get('/user/:id', safe(getUser));
```

> 👉 Note: please note that the `safe` function must always be called before your action or the API errors will be silent.

### 2) Declaring your actions.ts

Open the `./src/actions.ts` and add or re-use one of the action functions, for example:

```ts
export const getUser = async (req: Request, res: Response): Promise<Response> =>{
	
	const users = await getRepository(Users).findOne(req.params.id);
	return res.json(users);
}
```

## Validate incoming requests

Junior developers always assume that everything will be O.K. while Senior developers are prepared for the worst possible scenarios.

You have to assume that the information is coming in a bad format, for example: Emails don't have the domain name inside, phone numbers have letters, etc.

There are three possible types of validations that we recommend doing:

### A) Validating the request payload (body)

The request payload can be retrieved by doing `req.body`, this is an example on how to validate if the request body contains the property `first_name`:

```ts
export const getUser = async (req: Request, res:Response): Promise<Response> =>{

	// validate that first_name exists or throw a new exception if not.
	if(!req.body.first_name) throw new Exception("Please provide a first_name")

	// the rest of your function code goes here

})
```

### B) Validating the request params (in the url)

If your endpoint URL is expecting a parameter you can access it by typing `req.params`, for example, if the endpoint `GET /user/:id` is called with `GET /user/23`, we can retrieve the value like this:

```ts
	const user = await getRepository(Users).findOne(req.params.id);
	if(!user) throw new Exception("User not found", 404)
```

We are basically querying the database to get the user with that given ID and make sure it exists.

### C) Other validation examples

In the following file [🔥🔥🔥 you can find more validation examples.](/other/express/example-actions) 

## Authentication with JWT

We strongly recommend using express-jwt and jsonwebtoken libraries for authentication.

The authentication can be split into 4 steps and [🔥🔥🔥 here is a very detailed explanation on how to implement it with express and typescript.](/other/express/jwt-authentication)

## Database Query (Get information)

TypeORM has a lot of ways to retrieve information from the database, we are going to show the most used examples here, and you can check this document for more advanced ways to query information.

> ⚠️ Important: You must always start by declaring a new `repository` for that entity

```js
const user = repository.create({
    id: 1,
    firstName: "Timber",
    lastName: "Saw",
}) // same as const user = new User(); user.firstName = "Timber"; user.lastName = "Saw";
```

After having the repository object you can start your query, for example:

### Find by

Find the user with the first name "Bob"

```js
userRepository.find({ where: { firstName: "Bob", lastName: "Saw" } });
```

### Find by (many)

Find the user with the first name "Bob"

```js
userRepository.find({ where: { firstName: "Bob", lastName: "Saw" } });
```

### Find One by (just one)

Find the user with the first name "Bob"

```typescript
userRepository.findOne(1, {
    where: { firstName: "Bob" }
})
``` 

### More advanced queries

[🔥🔥🔥 Click here for more advanced query examples](/other/express/query)

## Database CRUD operations

TypeORM is one of the most simple-to-use ORM library.

### Create a user 

Here is a very simple example on how to create a new user:

```js
const user = repository.create({
    id: 1,
    firstName: "Timber",
    lastName: "Saw"
}); // same as const user = new User(); user.firstName = "Timber"; user.lastName = "Saw";
```

### Delete a user

Assuming you want to delete user with ID=1

```js
await repository.delete(1);
```

### Update a user

Assuming you want to update the user with the ID=1 and set his/her name to Rizzrak:

```js
await repository.update(1, { firstName: "Rizzrak" });
```

[🔥🔥🔥 Here you can find other example of more complex CRUD operations.](/other/express/crud)

## Migrations (only for production environment)

You don't have to use migrations in development mode because TypeORM already does that for you, but before moving to production you have to run the following command to create your migrations:

1. Generate a new migration file after changes were made to the models:

```bash
$ npm run makemigrations
```

2. Apply all of your pending migrations:

```bash
$ npm run migrate
```


## PostgreSQL


This will give you an auto-starting PostgreSQL server (it should auto-start every time you open a new Terminal), plus a few utility scripts that you can run in a Terminal or in a .gitpod.yml command:

```
pg_start: start the PostgreSQL service
pg_stop: stop the PostgreSQL service
pg_ctl status: check if the PostgreSQL service is running
Once the PostgreSQL server is running, you can use the psql CLI as usual:

$ psql -h localhost -d postgres
psql (10.8 (Ubuntu 10.8-0ubuntu0.18.10.1))
Type "help" for help.

postgres=#
```

