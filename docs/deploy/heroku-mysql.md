---
title: 'Deploy to Heroku using MySQL'
description: 'Publish your website to Heroku with a MySQL database'
---

> Deploying to Heroku (takes 7 minutes)

This template is 100% compatible with Heroku, just make sure to understand and execute the following steps:

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

4. Commit and push to Heroku
Make sure you have committed your changes and push to Heroku
```bash
$ git push heroku master
```

## Environment Variables (takes 2 minutes)

<p align="center">
<img width="400px" alt="Configuring Env Variables" src="https://github.com/4GeeksAcademy/flask-rest-hello/blob/main/docs/assets/env_variables.gif?raw=true" />
</p>

You cannot create a `.env` file on Heroku, instead you need to manually create all the variables under your project settings.

Open your `.env` file and copy and paste each variable (FLASK_APP, DB_CONNECTION_STRING, etc.) to Heroku.


## Deploying your database to Heroku (takes 3 minutes)

<p align="center">
<img width="400px" alt="Create DB on heroku" src="https://github.com/4GeeksAcademy/flask-rest-hello/blob/main/docs/assets/db_config.gif?raw=true" />
</p>

Your local MySQL Database now has to be uploaded to a cloud, there are plenty of services that provide MySQL database hosting, but we recommend JawsDB because it has a Free Tier, it's simple and 100% integrated with Heroku.

1. Go to your Heroku project dashboard and look to add a new Heroku add-on.
2. Look for JawsDB MySQL and add it to your project (it may ask for a Credit Card but you will not be charged as long as you remain withing 5mb database size, enough for your demo).
3. Once JawsDB is added to your project, look for the Connection String inside your JawsDB dashboard, something like:
```
mysql://tqqa0ui0cga32nxd:eqi8nchjbpwth82v@c584md9egjnm02sk.5btxwkvyhwsf.us-east-1.rds.amazonaws.com:3306/45fds423rbtbr
```
4. Copy the connection string and create a new environment variable on your project settings.
5. Run migrations on Heroku: After your database is connected, you have to create the tables and structure, you can do that by running the `pipenv run upgrade` command on the production server like this:
```bash
$ heroku run -a=<your_app_name> pipenv run upgrade
```
> ⚠️ Note: Notice that you have to replace `<your app name>` with your application name, you also have to be logged into Heroku in your terminal (you can do that by typing `heroku login -i`)
