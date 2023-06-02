---
title: 'Starting a project for API Development (with Flask)'
description: 'How to start and build a successful Flask API'
---

> 🎥 Here's a video tutorial about [creating Flask API's using this boilerplate](https://youtu.be/ORxQ-K3BzQA).

## How to Start coding?

There is an example API working with an example database. All your application code should be written inside the `./src/` folder.

- src/app.py: It's where the app initializes, in small API's you can also code your different endpoints here, please be advised that coding the endpoints here is only recommended if there is no `routes.py` file in the project already.
- src/routes.py (optional): If your project has a `src/routes.py` file, here is where you must code to add your endpoints.
- src/models.py: Your database tables and serialization logic.
- src/utils.py: Some reusable classes and functions.
- src/admin.py: Add your models to the admin and manage your data easily.

For a more detailed explanation, look for the tutorial inside the `docs` folder.

## Installing on Ubuntu & Mac

⚠️ Make sure you have `python 3.6+` and `MySQL` installed on your computer and MySQL is running, then run the following commands:
```bash
$ pipenv install #(to install pip packages)
$ pipenv run migrate #(to create the database)
$ pipenv run start #(to start the flask webserver)
```

## The Database

The Flask boilerplate comes with a Postgres database installed and running, [take 6 min to watch this video about Postgres](https://www.youtube.com/watch?v=S4VRl1BOYGY).

We also use SQLAlchemy to abstract our database, that means that you don't have to write SQL to deal with your database, everything will be done using python.

### Add, Update & Delete data

Since we are not going to be using SQL directly, instead we are going to be working with SQLAlchemy using Python.

> [Click in this link](/backend/database) for a more in-depth tutorial on how to work with SQLAlchemy and Postgres to CRUD (Create, Read, Update and Delete data).

### Flask Admin

Any API developed using this boilerplate will come with a quick and easy UI called: `Flask Admin`.

The flask admin allows you to quickly add, delete or update your database tables.

You can access your flask admin by adding `/admin` to the end of your API Host, for example:

If your API host is `https://8000-blabla-us33.gitpod.io` then you can access your database admin like this: `https://8000-blabla-us33.gitpod.io/admin`

> You can read more about the [Flask Admin by clicking on the following link](/backend/flask-admin).

## Migrations

Database changes are tracked using alembic migrations.

### Running migrations

You have to migrate and upgrade the migrations for every update you make to your models:

```bash
$ pipenv run migrate #(to make the migrations)
$ pipenv run upgrade #(to update your database with the migrations)
```

### Reset Migrations

If your migrations are broken, you can reset them by following [this process](/backend/reset-migrations). 

> ⚠️ Note: Please remember, all your data will be lost.

## Coding a typical CRUD operation

As an example, we are going to create a small API to manage a Person.

### Adding Models

For each `model` you will have to declare a class with the model properties and a method `serialize` that returns a dictionary representation of the class:

```py
class Person(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    # tell python how to print the class object on the console
    def __repr__(self):
        return '<Person %r>' % self.username

    # tell python how to convert the class object into a dictionary ready to jsonify
    def serialize(self):
        return {
            "username": self.username,
            "email": self.email
        }
```

> 📝 You can find more information on [creating models](/backend/database#creating-the-models) here.

### Adding an endpoint

For each endpoint you will need to have:
1. One `@APP` decorator that specifies the path for the endpoint.
    - You can have parameters in the URL like this `<int:person_id>`
    - You can specify what methods can be called on that endpoint like this `methods=['PUT', 'GET']`
2. The method that will execute when that endpoint is called (in this case `get_single_person`).
3. Inside the method you can specify what logic to execute of each type of request using `if request.method == 'PUT'`
4. You have to always return a json and a status code (200, 400, 404, etc.)

```py
@APP.route('/person/<int:person_id>', methods=['PUT', 'GET'])
def get_single_person(person_id):
    """
    Single person
    """
    body = request.get_json() #{ 'username': 'new_username'}
    if request.method == 'PUT':
        user1 = Person.query.get(person_id)
        user1.username = body.username
        db.session.commit()
        return jsonify(user1.serialize()), 200
    if request.method == 'GET':
        user1 = Person.query.get(person_id)
        return jsonify(user1.serialize()), 200

    return "Invalid Method", 404
```

### Using the admin

You can add your models to the admin, that way you will be able to manage them without any extra code.

To add a new model into the admin, just open the `src/admin.py` file and add this line inside the `setup_admin` function.

```python
admin.add_view(ModelView(YourModelName, db.session))
```

> Note: Make sure you import the model on the top of the file

## Deploy 

This template is 100% compatible with [Heroku](https://www.heroku.com/) and [Render.com](https://www.render.com), just make sure to read the quick deployment guides.

1. [How to deploy into Render.com](/deploy/render) (for free)
2. [How to deploy into Heroku.com](/deploy/heroku-postgress) (for $0.01 a month)
