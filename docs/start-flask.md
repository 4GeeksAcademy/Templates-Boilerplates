---
title: 'Starting a project for API Development (with Flask)'
description: 'How to start and build a successful Flask API'
technologies: ['python', 'flask']

---

> 🎥 Here's a video tutorial about [creating Flask API's using this boilerplate](https://youtu.be/ORxQ-K3BzQA).

## How to Start coding?

Starting with the [flast-rest-hello](https://github.com/4GeeksAcademy/flask-rest-hello) boilerplate, you can find an example API working with a database. All your application code should be written inside the `./src/` folder.

- src/app.py: It's where the app initializes, in small API's you can also code your different endpoints here, please be advised that coding the endpoints here is only recommended if there is no `routes.py` file in the project already.
- src/routes.py (optional): If your project has a `src/routes.py` file, here is where you must code to add your endpoints.
- src/models.py: Your database tables and serialization logic.
- src/utils.py: Some reusable classes and functions.
- src/admin.py: Add your models to the admin and manage your data easily.

For a more detailed explanation, look for the tutorial inside the `docs` folder.

## Installing on Ubuntu, Mac and Windows

⚠️ Make sure you have `python 3.6+` (Here we have a step-by-step guide of [how to install python](https://4geeks.com/how-to/how-to-install-python)), `pipenv` (On this article, we explain [what is pyenv and how to install pyenv](https://4geeks.com/how-to/what-is-pyenv-and-how-to-install-pyenv)) and `Postgres` installed on your computer, then make sure Postgres is running, and run the following commands:

```bash
$ pipenv install # (to install pip packages)
$ pipenv run migrate # (to create the database)
$ pipenv run start # (to start the flask webserver)
```

> ⚠️ Local installation may work, but you can also try installing it online through [4Geeks' Click and Learn](https://breathecode.herokuapp.com/start) on top of Github Codespaces or Gitpod.

## Adding an endpoint

For each endpoint you will need to have:
1. One `@app` decorator that specifies the path for the endpoint.
    - You can have parameters in the URL like this `<int:person_id>`
    - You can specify what methods can be called on that endpoint like this `methods=['PUT', 'GET']`
2. The method that will execute when that endpoint is called (in this case `get_single_person`).
3. Inside the method you can specify what logic to execute of each type of request using `if request.method == 'PUT'`
4. You have to always return a json and a status code (200, 400, 404, etc.)

```py
from sqlalchemy import select
from sqlalchemy.exc import NoResultFound


@app.route('/person/<int:person_id>', methods=['PUT', 'GET'])
def get_single_person(person_id):
    """A person (Updated: Using session.execute)"""
    body = request.get_json() #{ 'username': 'new_username'}
    try:
        stmt = select(Person).where(Person.id == person_id)
        result = db.session.execute(stmt)
        user1 = result.scalars().first()
        
        if user1 is None:
            return jsonify({'error': 'Person not found'}), 404

        if request.method == 'PUT':
            user1.username = body['username']
            db.session.commit()
            return jsonify(user1.serialize()), 200
        elif request.method == 'GET':
            return jsonify(user1.serialize()), 200

    except NoResultFound:
        return jsonify({'error': 'Person not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    return jsonify({'error': 'Invalid method'}), 405
```


### How to validate request payload or query string

---

Let's say a request is coming from the client and we need to make sure it contains the right information.

We have to use conditionals to make the validations, if we want to validate the request body we have to retrieve it first and then add the condition, like this:

```py
body = request.get_json()
if 'username' not in body:
    raise APIException('You need to specify the username', status_code=400)
```

- It's a good practice to raise exceptions because it will stop the code execution.
- It's a good practice to return 400 because that way the client knows it was his mistake and not ours (the server).

### Here is a full example of a POST request to add a new person into a database

```py
@app.route('/person', methods=['POST'])
def handle_person():

    # First we get the payload json
    body = request.get_json()

    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'username' not in body:
        raise APIException('You need to specify the username', status_code=400)
    if 'email' not in body:
        raise APIException('You need to specify the email', status_code=400)

    # at this point, all data has been validated, we can proceed to insert into the database
    user1 = Person(username=body['username'], email=body['email'])
    db.session.add(user1)
    db.session.commit()
    return "ok", 200
```

## The Database

The Flask boilerplate comes with a Postgres database installed and running, [take 6 min to watch this video about Postgres](https://www.youtube.com/watch?v=S4VRl1BOYGY).

We also use SQLAlchemy to abstract our database, that means that you don't have to write SQL to deal with your database, everything will be done using python.

### Add, Update & Delete data

Since we are not going to be using SQL directly, instead we are going to be working with SQLAlchemy using Python.

> [Click in this link](/docs/start/postgresql-template-starter) for a more in-depth tutorial on how to work with SQLAlchemy and Postgres to CRUD (Create, Read, Update and Delete data).

### Flask Admin

Any API developed using this boilerplate will come with a quick and easy UI called: `Flask Admin`.

The flask admin allows you to quickly see, add, delete or update information from your database tables.

You can access your flask admin by adding `/admin` to the end of your API Host, for example:

If your API host is `https://8000-blabla-us33.gitpod.io` then you can access your database admin like this: `https://8000-blabla-us33.gitpod.io/admin`

> 🎥 Here is an 8 min video explaining the [Flask Admin](https://www.youtube.com/watch?v=ysdShEL1HMM).

### Adding your models to your Flask admin

With just a couple lines of code you can integrate your model into the Flask Admin, for example, if you have a `Car` model you can add the model into the admin like this:
```py
from models import Car
...
admin.add_view(ModelView(Car, db.session))
```

But you have to add those two lines inside the `admin.py` file like this:

```py
from flask_admin.contrib.sqla import ModelView
from flask_admin import Admin
from models import db, Car # < ------ Import the model

def setup_admin(app):
    admin = Admin(app, name='your_admin_name', template_mode='bootstrap3')
    admin.add_view(ModelView(Car, db.session)) # < ------ Add the model to the admin
```

You can add as many models as you want, like this:

```py
from flask_admin.contrib.sqla import ModelView
from flask_admin import Admin
from models import db, Car, Person, Patient # < ------ Import the model

def setup_admin(app):
    admin = Admin(app, name='your_admin_name', template_mode='bootstrap3')
    admin.add_view(ModelView(Car, db.session)) # < ------ Add the model to the admin
    admin.add_view(ModelView(Person, db.session)) # < ------ Add the model to the admin
    admin.add_view(ModelView(Patient, db.session)) # < ------ Add the model to the admin
```

## Migrations

Database changes are tracked using alembic migrations.
You have to migrate and upgrade the migrations for every update you make to your models that must be reflected in the tables structure:

```bash
$ pipenv run migrate #(to make the migrations)
$ pipenv run upgrade #(to update your database with the migrations)
```

### Reset Migrations

Sometimes the migration folder can get messed up, it's really hard to fix some of the issues and, since we are still in development, it makes sense to reset the entire database and migrations.

This boilerplate contains a script that can help you to reset from scratch all your database in case you need it. To run it execute `pipenv run reset_db`, this will delete your entire database and rebuild it from the ground up, loosing all the data in the process. These are the actions that the script performs:

> ⚠️ Warning: your data will be lost

1. Delete the entire migrations folder `rm -R -f ./migrations`.
2. Create a new migration folder for flask `flask db init`
3. Delete the database `dropdb -h localhost -U gitpod example`
4. Create the database again `createdb -h localhost -U gitpod example";`
5. Create the 'inaccent' extension `psql -h localhost example -U gitpod -c 'CREATE EXTENSION unaccent;'`
7. Create the migration files again: `pipenv run migrate`
8. Apply the migration files into your database `pipenv run upgrade`

> ⚠️ Note: Please remember, all your data will be lost.

## Coding a typical CRUD operation

As an example, we are going to create a small API to manage a Person.

### Adding Models

For each `model` you will have to declare a class with the model properties and a method `serialize` that returns a dictionary representation of the class:

```py
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column


class Person(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(unique=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)

    # indica a python cómo convertir el objeto de clase en un diccionario listo para jsonificar
    def serialize(self):
        return {
            "username": self.username,
            "email": self.email
        }
```

> 📝 You can find more information on [creating models](https://4geeks.com/docs/start/postgresql-template-starter#creating-the-models) here.

### CRUD Operations

There are many ways to manipulate databases, but we decided to use Python and SQLAlchemy to do so. This means that you need no SQL knowledge, but we strongly recommend you still practice and master SQL for debugging purposes (most of the errors are shown in SQL language)

### Querying (SELECT) data

Assuming you have a Person object in your `models.py` file.

```py
# get all the people
stmt = select(Person)
people_query = db.session.execute(stmt).scalars().all()

# get only the ones named "Joe"
stmt = select(Person).where(Person.name == 'Joe')
people_query = db.session.execute(stmt).scalars().all()

# map the results and your list of people inside of the all_people variable
all_people = list(map(lambda x: x.serialize(), people_query))

# get just one person
stmt = select(Person).where(Person.id == person_id)
user1 = db.session.execute(stmt).scalars().first()
```

### Inserting data

Assuming you have a Person object in your `models.py` file.

```py
user1 = Person(username="my_super_username", email="my_super@email.com")
db.session.add(user1)
db.session.commit()
```

### Updating data

```py
stmt = select(Person).where(Person.id == person_id)
user1 = db.session.execute(stmt).scalars().first()

if user1 is None:
    raise APIException('User not found', status_code=404)

if "username" in body:
    user1.username = body["username"]
if "email" in body:
    user1.email = body["email"]
db.session.commit()
```
 
### Delete data
 
 ```py
stmt = select(Person).where(Person.id == person_id)
user1 = db.session.execute(stmt).scalars().first()

if user1 is None:
    raise APIException('User not found', status_code=404)
db.session.delete(user1)
db.session.commit()
 ```

## How to implement a JWT schema on my API with Flask?

> [In this article you will find the details about how to implement this schema on your Flask API](https://4geeks.com/lesson/what-is-jwt-and-how-to-implement-with-flask)

## Deploy 

This template is 100% compatible with [Heroku](https://www.heroku.com/) and [Render.com](https://www.render.com), just make sure to read the quick deployment guides.

1. [How to deploy into Render.com](https://4geeks.com/docs/start/deploy-to-render-com) (for free)
2. [How to deploy into Heroku.com](https://4geeks.com/docs/start/deploy-heroku-postgres) (for $0.01 a month)
