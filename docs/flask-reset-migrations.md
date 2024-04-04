---
title: 'Reset Database Migrations'
description: 'Reset your migrations in mysql or postgres database'
---

Sometimes the migration folder can get messed up, it's really hard to fix some of the issues and, since we are still in development, it makes sense to reset the entire database and migrations.

## To reset the migrations carefully follow these commands:

> ⚠️ Warning: your data will be lost

1. Delete the entire migrations folder.
2. Delete de database `mysql -u root -e "DROP DATABASE example";`
3. Create de database again `mysql -u root -e "CREATE DATABASE example";`
4. Initialize the migrations again: `pipenv run init`
5. Create the migration files again: `pipenv run migrate`
6. Apply the migration files into your database `pipenv run upgrade`
