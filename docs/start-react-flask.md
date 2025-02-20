---
title: 'Start a Fullstack Project with React, useReducer, useContext + Flask'
description: 'Use Javascript, React.js, Python, and Flask to build a complete full-stack application'
technologies: ['html', 'css', 'python','javascript','flask','react']
---

This template has `backend files` and `frontend files` together, it is the perfect combination of the React.js and Flask API templates so you can create a Full Stack application applying all the concepts used in the professional world.

## Front end

You can find a complete explanation on how to create new pages, components, add styles, and use context, within [this previous documentation we created for the React, useReducer, and useContext template](https://4geeks.com/docs/start/react-flask-template). This is because the Full-Stack template was created under the same structure and concepts as that one.

## Backend

You can find a complete explanation on creating your Flask API endpoints, creating new models, database migrations, and using the Flask admin [in this documentation](https://4geeks.com/docs/start/python-api-flask-template), this is because this template was created with the same structure and concepts as the Flask API template.

## Manual Installation (only if necessary)

### Manual Back-End Installation

It is recommended to install the backend first, make sure you have Python 3.10+, Pipenv, and a database engine (Postgres recommended)

1. Install the python packages: `$ pipenv install`
2. Create a .env file based on the .env.example: `$ cp .env.example .env`
3. Install your database engine and create your database. Install your database engine and create your database, depending on your database you have to create a DATABASE_URL variable with one of the possible values, make sure to replace the values with your database information:

| Engine | DATABASE_URL       |
| ------------- | ----------------------------------------------------- |
| SQLite | sqlite:////test.db      |
| MySQL  | mysql://username:password@localhost:port/example |
| Postgres | postgres://username:password@localhost:5432/example  |

4. Migrate the migrations: `$ pipenv run migrate` (skip if no changes have been made to the models in `./src/api/models.py`)
5. Run the migrations: `$ pipenv run upgrade`
6. Run the application: `$ pipenv run start`.

### Manual Front-End Installation

- Make sure you are using node version 20 and that you have already installed and successfully run the backend.

1. Install the packages: `$ npm install`
2. Start the webpack development server `$ npm run start`.

## Publish your website

This template is 100% compatible with [Heroku](https://www.heroku.com/) and [Render.com](https://www.render.com), just make sure to read the quick deployment guides.

1. [How to deploy on Render.com](https://4geeks.com/es/docs/start/despliega-con-render-com) (free)
2. [How to deploy on Heroku.com](https://4geeks.com/es/docs/start/desplegar-a-heroku-con-postgresql) (from $0.01 monthly)