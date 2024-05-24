---
title: 'Deploy to Heroku'
description: 'Publish your website to Heroku'
---

> Deploy to Heroku, it takes 7 minutes.

This template is 100% compatible with Heroku, just make sure to understand and execute the following steps.

0. Create an account on heroku.com, do not create a project, you will do that later, all you need is email and password set.

1. Install Heroku (if you don't have it yet)
```bash
$ npm i heroku -g
```

2. Login to Heroku on the command line (if you have not already)
```bash
$ heroku login -i
```

3. Create an application (if you don't have it already)
```bash
$ heroku create <your_application_name>
```

4. Install buildpack-registry and buildpacks
```bash
$ heroku plugins:install buildpack-registry
$ heroku plugins:install buildpacks 
```

5. Add Python and also node.js capabilities to Heroku to be able to use npm on production
```bash
$ heroku buildpacks:add --index 1 heroku/python
$ heroku buildpacks:add --index 2 heroku/nodejs
```

6. Add a new Postgres database to your project
```bash
$ heroku addons:create heroku-postgresql:hobby-dev
# this command will also automatically add a DATABASE_URL env variable with the Postgres database url
```

7. Other Environment Variables

You cannot create a `.env` file on Heroku, instead you need to manually add all the variables using the command line or under your Heroku dashboard project settings.

Open your `.env` file and copy and paste each variable (FLASK_APP, FLASK_ENV, etc.) to Heroku. ⚠️ Do not add the `DATABASE_URL` variable again, it was already added by Heroku automatically when we added the Postgres add-on.

```bash
$ heroku config:set FLASK_APP_KEY="any key works"
$ heroku config:set FLASK_APP=src/app.py
#                               ↓ Important: Set to "production"
$ heroku config:set FLASK_ENV=production 
$ heroku config:set BASENAME=/
$ heroku config:set BACKEND_URL=
```

<p align="center">
<img width="400px" alt="Configuring Env Variables" src="https://github.com/4GeeksAcademy/flask-rest-hello/blob/main/docs/assets/env_variables.gif?raw=true" />
</p>

## Push your changes!

The last step is to push your code to Heroku with your most recent changes:

```bash
$ git add .
$ git commit -m 'deploying to heroku'
$ git push heroku main
```

## Done!

That is it! If you encounter any issues please refer to the [FAQ Heroku file](../tutorials/faq).
