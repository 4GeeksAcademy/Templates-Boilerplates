---
title: 'Inicio de un proyecto de desarrollo de API (con Flask)'
description: 'Cómo crear una API de Flask con éxito'
---

> 🎥 Here's a video tutorial about [creating Flask API's using this boilerplate](https://youtu.be/ORxQ-K3BzQA).

## How to Start coding?

Empezando por el boilerplate [flast-rest-hello](https://github.com/4GeeksAcademy/flask-rest-hello), puedes encontrar un ejemplo de API trabajando con una base de datos. Todo el código de tu aplicación debe estar escrito dentro de la carpeta `./src/`.

- src/app.py: Es donde la aplicación se inicializa, en APIs pequeñas también puedes codificar tus diferentes endpoints aquí, por favor ten en cuenta que codificar los endpoints aquí sólo se recomienda si no hay un archivo `routes.py` en el proyecto.
- src/routes.py (opcional): Si tu proyecto tiene un fichero `src/routes.py`, aquí es donde debes codificar para añadir tus endpoints.
- src/models.py: Tus tablas de base de datos y lógica de serialización.
- src/utils.py: Algunas clases y funciones reutilizables.
- src/admin.py: Añade tus modelos al admin y gestiona tus datos fácilmente.

Para una explicación más detallada, busca el tutorial dentro de la carpeta `docs`.

## Instalación en Ubuntu y Mac

⚠️ Asegúrese de que tiene `python 3.6+` y `MySQL` instalado en su ordenador y MySQL se está ejecutando, a continuación, ejecute los siguientes comandos:

```bash
pipenv install #(to install pip packages)
pipenv run migrate #(to create the database)
pipenv run start #(to start the flask webserver)
```

## Añadir un endpoint

Para cada endpoint necesitará tener:

1. Un decorador `@app` que especifique la ruta para el endpoint.
    - Puedes tener parámetros en la URL como este `<int:person_id>`.
    - Puedes especificar qué métodos pueden ser invocados en ese endpoint como `methods=['PUT', 'GET']`.
2. El método que se ejecutará cuando se llame a ese endpoint (en este caso `get_single_person`).
3. Dentro del método puedes especificar qué lógica ejecutar de cada tipo de petición usando `if request.method == 'PUT'`.
4. Tienes que devolver siempre un json y un código de estado (200, 400, 404, etc.)

```py
@app.route('/person/<int:person_id>', methods=['PUT', 'GET'])
def get_single_person(person_id):
    """
    Una persona
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

### Cómo validar la carga útil de la solicitud o la cadena de consulta

---

Digamos que una petición viene del cliente y necesitamos asegurarnos de que contiene la información correcta.

Tenemos que usar condicionales para hacer las validaciones, si queremos validar el cuerpo de la petición tenemos que recuperarlo primero y luego añadir la condición, así:

```py
body = request.get_json()
if 'username' not in body:
    raise APIException('You need to specify the username', status_code=400)
```

- Es una buena práctica lanzar excepciones porque detendrá la ejecución del código.
- Es una buena práctica devolver 400 porque así el cliente sabe que fue su error y no el nuestro (el servidor).

### He aquí un ejemplo completo de una solicitud POST para añadir una nueva persona a una base de datos

```py
@app.route('/person', methods=['POST'])
def handle_person():

    # Primero obtenemos el payload json
    body = request.get_json()

    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'username' not in body:
        raise APIException('You need to specify the username', status_code=400)
    if 'email' not in body:
        raise APIException('You need to specify the email', status_code=400)

    # en este punto, todos los datos han sido validados, podemos proceder a insertar en la base de datos
    user1 = Person(username=body['username'], email=body['email'])
    db.session.add(user1)
    db.session.commit()
    return "ok", 200
```

## La base de datos

El boilerplate de Flask viene con una base de datos Postgres instalada y funcionando, [tómate 6 min para ver este video sobre Postgres](https://www.youtube.com/watch?v=S4VRl1BOYGY).

También usamos SQLAlchemy para abstraer nuestra base de datos, eso significa que no tienes que escribir SQL para tratar con tu base de datos, todo se hará usando python.

### Añadir, Actualizar y Borrar datos

Ya que no vamos a usar SQL directamente, en su lugar vamos a trabajar con SQLAlchemy usando Python.

> Pulsa en este enlace](/backend/database) para ver un tutorial más detallado sobre cómo trabajar con SQLAlchemy y Postgres para CRUD (Crear, Leer, Actualizar y Borrar datos).

### Flask Admin

Cualquier API desarrollada usando este boilerplate vendrá con una rápida y sencilla UI llamada: `Flask Admin`.

El flask admin te permite rápidamente ver, añadir, borrar o actualizar información de las tablas de tu base de datos.

Puede acceder a su administrador de flask añadiendo `/admin` al final de su API Host, por ejemplo:

Si su API host es `https://8000-blabla-us33.gitpod.io` entonces usted puede acceder a su base de datos admin así: `https://8000-blabla-us33.gitpod.io/admin`

> Aquí hay un video de 8 minutos explicando el [Flask Admin](https://www.youtube.com/watch?v=ysdShEL1HMM).

### Añadiendo tus modelos a tu admin de Flask

Con sólo un par de líneas de código puedes integrar tu modelo en el admin de Flask, por ejemplo, si tienes un modelo `Car` puedes añadir el modelo en el admin así:

```py
from models import Car
...
admin.add_view(ModelView(Car, db.session))
```

Pero tienes que añadir esas dos líneas dentro del archivo `admin.py` así:

```py
from flask_admin.contrib.sqla import ModelView
from flask_admin import Admin
from models import db, Car # < ------ Importar el modelo

def setup_admin(app):
    admin = Admin(app, name='your_admin_name', template_mode='bootstrap3')
    admin.add_view(ModelView(Car, db.session)) # < ------ Add the model to the admin
```

Puedes añadir tantos modelos como quieras, así:

```py
from flask_admin.contrib.sqla import ModelView
from flask_admin import Admin
from models import db, Car, Person, Patient # < ------ Importar el modelo

def setup_admin(app):
    admin = Admin(app, name='your_admin_name', template_mode='bootstrap3')
    admin.add_view(ModelView(Car, db.session)) # < ------ Añadir el modelo al admin
    admin.add_view(ModelView(Person, db.session)) # < ------ Añadir el modelo al admin
    admin.add_view(ModelView(Patient, db.session)) # < ------ Añadir el modelo al admin
```

## Migraciones

Los cambios en la base de datos se rastrean mediante migraciones alembic. Debe migrar y actualizar las migraciones para cada actualización que realice en sus modelos y que deba reflejarse en la estructura de las tablas:

```bash
pipenv run migrate #(para realizar las migraciones)
pipenv run upgrade #(para actualizar su base de datos con las migraciones)
```

### Reiniciar Migraciones

A veces la carpeta de migraciones puede estropearse, es realmente difícil arreglar algunos de los problemas y, dado que todavía estamos en desarrollo, tiene sentido resetear toda la base de datos y las migraciones.

Este boilerplate contiene un script que puede ayudarte a resetear desde cero toda tu base de datos en caso de que lo necesites. Para ejecutarlo ejecute `pipenv run reset_db`, esto borrará toda su base de datos y la reconstruirá desde cero, perdiendo todos los datos en el proceso. Estas son las acciones que realiza el script:

> ⚠️ Advertencia: sus datos se perderán

1. Borre toda la carpeta de migraciones `rm -R -f ./migrations`.
2. Crea una nueva carpeta de migraciones para flask `flask db init`.
3. Eliminar la base de datos `dropdb -h localhost -U gitpod ejemplo`.
4. Crear de nuevo la base de datos `createdb -h localhost -U gitpod ejemplo";`.
5. Crear la extensión 'inaccent' `psql -h localhost ejemplo -U gitpod -c 'CREATE EXTENSION unaccent;'`
7. Crea de nuevo los archivos de migración: `pipenv run migrate`.
8. 8. Aplique los archivos de migración a su base de datos: `pipenv run upgrade` >

> ⚠️ Nota: Por favor, recuerde que todos sus datos se perderán.

## Codificación de una operación CRUD típica

Como ejemplo, vamos a crear una pequeña API para gestionar una Persona.

### Añadir Modelos

Para cada `model` tendrás que declarar una clase con las propiedades del modelo y un método `serialize` que devuelva una representación de diccionario de la clase:

```py
class Person(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    # indica a python cómo imprimir el objeto de clase en la consola
    def __repr__(self):
        return '<Person %r>' % self.username

    # indica a python cómo convertir el objeto de clase en un diccionario listo para jsonificar
    def serialize(self):
        return {
            "username": self.username,
            "email": self.email
        }
```

> 📝 Encontrará más información en [creación de modelos](/backend/database#creating-the-models) aquí.

### Operaciones CRUD

Hay muchas maneras de manipular bases de datos, pero hemos decidido utilizar Python y SQLAlchemy para hacerlo. Esto significa que no necesitas conocimientos de SQL, pero te recomendamos encarecidamente que aún así practiques y domines SQL con fines de depuración (la mayoría de los errores se muestran en lenguaje SQL)

### Consulta (SELECT) de datos

Asumiendo que tienes un objeto Person en tu fichero `models.py`.

```py
# coger a toda la gente
people_query = Person.query.all()

# obtener sólo las que se llamen "Joe
people_query = Person.query.filter_by(name='Joe')

# asigna los resultados y tu lista de personas dentro de la variable all_people
all_people = list(map(lambda x: x.serialize(), people_query))

# obtener sólo una persona
user1 = Person.query.get(person_id)
 ```

### Insertar datos

Asumiendo que tienes un objeto Persona en tu fichero `models.py`.

```py
user1 = Person(username="my_super_username", email="my_super@email.com")
db.session.add(user1)
db.session.commit()
```

### Actualización de datos

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

### Borrar datos

 ```py
 user1 = Person.query.get(person_id)
if user1 is None:
    raise APIException('User not found', status_code=404)
db.session.delete(user1)
db.session.commit()
 ```

## Despliegue

Esta plantilla es 100% compatible con [Heroku](https://www.heroku.com/) y [Render.com](https://www.render.com), sólo asegúrate de leer las guías de despliegue rápido.

1. [Cómo desplegar en Render.com](https://4geeks.com/docs/start/deploy-to-render-com) (gratis)
2. [Cómo desplegar en Heroku.com](https://github.com/4GeeksAcademy/Templates-Boilerplates/blob/master/docs/deploy-heroku-postgress.md) (desde $0.01 mensual)
