---
title: 'Start a React + Flask Full-Stack Project'
description: 'Use Javascript, React.js, Python and Flask to build an entire full-stack application'
technologies: ['html', 'css', 'python','javascript','flask','react']
---

This template has `backend files` and `front end files` together, it's the perfect combination of the React Flux and the Flask API templates so that you can create a Full Stack application applying all the concepts used in the professional world.

## Front end

You can find a thorough explanation on how to create new pages, components, adding styles and using the context, inside [this previous documentation we created for the React Flux template](/starters/start-react-flux). This is because the Full-Stack Template was created under the same structure and concepts as that one.

## Backend

You can find a thorough explanation on creating your Flask API endpoints, creating new models, database migrations and using the flask admin [in this documentation](/starters/python-api-flask-template), this is because this template was created with the same structure and concepts as the Flask API Template.


## Manual Installation (only if needed)

### Back-End Manual Installation:

It is recommended to install the backend first, make sure you have Python 3.8+, Pipenv and a database engine (Postgres recommended)

1. Install the python packages: `$ pipenv install`
2. Create a .env file based on the .env.example: `$ cp .env.example .env`
3. Install your database engine and create your database, depending on your database you have to create a DATABASE_URL variable with one of the possible values, make sure you replace the values with your database information:

| Engine	| DATABASE_URL 						|
| ------------- | ----------------------------------------------------- |
| SQLite	| sqlite:////test.db	 				|
| MySQL		| mysql://username:password@localhost:port/example	|
| Postgres	| postgres://username:password@localhost:5432/example 	|

4. Migrate the migrations: `$ pipenv run migrate` (skip if you have not made changes to the models on the `./src/api/models.py`)
5. Run the migrations: `$ pipenv run upgrade`
6. Run the application: `$ pipenv run start`


### Front-End Manual Installation:

- Make sure you are using node version 14+ and that you have already successfully installed and run the backend.

1. Install the packages: `$ npm install`
2. Start coding! start the webpack dev server `$ npm run start`

## Publish your website!

This template is 100% compatible with [Heroku](https://www.heroku.com/) and [Render.com](https://www.render.com), just make sure to read the quick deployment guides.

1. [How to deploy into Render.com](https://4geeks.com/docs/start/deploy-to-render-com) (for free)
2. [How to deploy into Heroku.com](https://4geeks.com/docs/start/deploy-heroku-postgres) (for $0.01 a month)
