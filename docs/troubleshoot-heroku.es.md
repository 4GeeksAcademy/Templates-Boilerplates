---
title: 'Heroku Troubleshoot - 4Geeks Academy Templates'
description: 'Frequently asked questions or problems about deploying 4Geeks Academy template starters into heroku'
---

# Heroku Troubleshoot


## How to Add a Heroku Remote to an Existing Project

If you see a message like: `src refspec heroku does not match any` its because you need to add heroku to your github repo:

```bash
$ heroku git:remote --app <your_app_name>
```

## The deploy failed

If you application failed to deploy you can retry by making any change to your files and doing a commit and push again.

```bash
# make sure to make any change to your files
$ git add .
$ git commit -m 'trying to redeploy app'
$ git push heroku main
```

## I see only the backend, the front-end is not showing up

You probably forgot to change the FLASK_ENV enviromental variable to `production`, run the following command on the console:

```bash
$ heroku config:set FLASK_ENV=production 
```
