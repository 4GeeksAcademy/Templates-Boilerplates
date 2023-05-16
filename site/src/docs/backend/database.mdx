---
title: 'Database Configuration'
description: 'Setup your Postgres or MySQL database engine'
---

In this boilerplate, you can use either Postgres or SQLite as database engine. Verify your .env file to specify which one you would like to use.
You can use the env var `DATABASE_URL` for this purpose.

## Creating and/or Accessing the Postgres Database

1. Log in to Postgres terminal:
```bash
$ psql
```
2. Once inside, list all the databases and check if you have the database already created:
```sql
\l
```
> Note: If you are using Gitpod, check the file `docs/assets/reset_migrations.bash`. Basically, you are creating a database from scratch called `example`.

3. If you don't see the example database, create it by typing:
```sql
CREATE DATABASE example;
```
Note: Make sure to update the `DB_CONNECTION_STRING` on the `.env` file with the correct database name.

3. If your database is already created, get inside of it by typing:

*Command*
```sql
\c example;
```

*Result*
```sql
postgres=# \c example;
You are now connected to database "example" as user "gitpod".
```
4. Now you may want to see all the tables available:
```sql
\dt
```

5. Also, you can execute all the SQL queries you want. For example, assuming you have a `users` table:
```sql
select * from users;
```

> Note: Type `exit` if you want to exit from the Postgres terminal.

For more commands, you can check this [amazing summary](https://www.postgresqltutorial.com/postgresql-cheat-sheet/).

## Creating the Models

Most of the 4Geeks Academy templates use the SQLAlchemy library to build models, creating a model is very simple:

```py
class Artist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)

    # This is how the artist will print in the console, just the name
    def __repr__(self):
        return self.name

    # This is how the artist will look inside the API JSON responses 
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
        }
```

Here are a few examples on the different types of relationships.

### ONE to MANY relationship

A one to many relationship places a foreign key on the child's table referencing the parent. 

`db.relationship()` is then specified on the parent, as referencing a collection of items represented by the child:

```py
class Artist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    
    # One artist can have many records, and we will call this list "records"
    # this is a foreign key that points to the Record.id
    records = db.relationship('Record', backref='parent',lazy=True)

    def __repr__(self):
        return self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "records": list(map(lambda x: x.serialize(), self.records))
        }

class Record(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    
    # one record can only have one artist, this points to the Artist.id
    artist_id = db.Column(db.Integer, db.ForeignKey("parent.id"), nullable=False)
    
    def __repr__(self):
        return self.name
        
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
        }
```

### MANY to MANY relationship

Many to Many adds an association table between two classes. The association table is indicated by the secondary argument to `db.relationship()`. 

Usually, the Table uses the MetaData object associated with the declarative base class, so that the ForeignKey directives can locate the remote tables with which to link:

```py
association_table = db.Table('association',
    db.Column("sister_id", db.Integer, db.ForeignKey("sister.id"), primary_key=True),
    db.Column("brother_id", db.Integer, db.ForeignKey("brother.id"), primary_key=True)
)

class Sister(db.Model):
    id = db.Column(Integer, primary_key=True)
    name = db.Column(String(80), nullable=False)
    brothers = db.relationship("Brother",
                    secondary=association_table,
                    back_populates="sisters") # this line is so it updates the field when Sister is updated
                    
    def __ref__(self):
        return f'<Sister {self.name}>'
        
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "brothers": list(map(lambda x: x.serialize(), self.brothers))
        }

class Brother(db.Model):
    id = db.Column(Integer, primary_key=True)
    name = db.Column(String(80), nullable=False)
    sisters = db.relationship("Sister",
                    secondary=association_table,
                    back_populates="brothers")
                    
    def __ref__(self):
        return f'<Brother {self.name}>'
        
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "sisters": list(map(lambda x: x.serialize(), self.sisters))
        }
```

## Migrations

Once your `models.py` file is ready, you have to `migrate` and `upgrade` so you can sync the changes into your database engine.

### Creating migrations

This command will create all the migrations files in your `./migrations` folder, that way we have them committed into Github and everyone
working on the project will have the exact same database structure.

```bash
$ pipenv run migrate
```

> Note: It's important to mention that the `migrate` command does not update your database, you will have to `upgrade` if you want to actually sync changes to your database.

### Running the migrations

The upgrade command takes a look at the migrations files, and runs everything there is left to run (out of sync) to make sure that your database is aligned with the migrations.

```bash
$ pipenv run upgrade
```

### Troubleshooting migrations

You will encounter lots of errors when updating and migrating your database. 
This is where that SQL syntax knowledge comes handy.

> 🛑 **The panic button**: We have prepared this command to help you reset your database and migrations back to zero.

```bash
$ bash docs/assets/reset_migrations.bash
```

## CRUD Operations

There are many ways to manipulate databases, but we decided to use Python and SQLAlchemy to do so. This means that you need no SQL knowledge, but we strongly recommend you still practice and master SQL for debugging purposes (most of the errors are shown in SQL language)

### Querying (SELECT) data

Assuming you have a Person object in your `models.py` file.

```py
# get all the people
people_query = Person.query.all()

# get only the ones named "Joe"
people_query = Person.query.filter_by(name='Joe')

# map the results and your list of people inside of the all_people variable
all_people = list(map(lambda x: x.serialize(), people_query))

# get just one person
user1 = Person.query.get(person_id)
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
user1 = Person.query.get(person_id)
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
 user1 = Person.query.get(person_id)
if user1 is None:
    raise APIException('User not found', status_code=404)
db.session.delete(user1)
db.session.commit()
 ```


# OFFICIAL DOCUMENTATION FOR MODELS FLASK SQLAlchemy

Please visit the following page for more information: https://flask-sqlalchemy.palletsprojects.com/en/2.x/models/
