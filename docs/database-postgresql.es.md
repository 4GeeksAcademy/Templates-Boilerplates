---
title: 'Configuración de plantilla de inicio PostgreSQL y configuración de la base de datos'
description: 'Configure su motor de base de datos Postgres'
technologies: ['postgre', 'databases']
---

En esta plantilla, puede utilizar Postgres o SQLite como motor de base de datos. Verifique su archivo .env para especificar cuál desea utilizar. Puede utilizar la var env `DATABASE_URL` para este propósito.

## Crear y/o acceder a la base de datos Postgres

1. Inicie sesión en el terminal Postgres:
```bash
$ psql
```
2. Una vez dentro, lista todas las bases de datos y comprueba si tienes la base de datos ya creada:
```sql
\l
```
> Nota: Si estás usando Gitpod, revisa el archivo `docs/assets/reset_migrations.bash`. Básicamente, estás creando una base de datos desde cero llamada `example`.

3. Si no ves la base de datos de ejemplo, créala escribiendo:
```sql
CREATE DATABASE example;
```
Nota: Asegúrese de actualizar `DB_CONNECTION_STRING` en el archivo `.env` con el nombre correcto de la base de datos.

3. Si tu base de datos ya está creada, entra en ella tecleando:

*Command*
```sql
\c example;
```

*Result*
```sql
postgres=# \c example;
Ahora estás conectado a la base de datos "example" como usuario "gitpod".
```
4. Ahora querrá ver todas las tablas disponibles:
```sql
\dt
```

5. Además, puedes ejecutar todas las consultas SQL que quieras. Por ejemplo, suponiendo que tienes una tabla `users`:
```sql
select * from users;
```

> Nota: Escriba `exit` si desea salir del terminal Postgres.

Para más comandos, puedes consultar este [asombroso resumen](https://www.postgresqltutorial.com/postgresql-cheat-sheet/).

## Creación de Modelos

La mayoría de las plantillas de 4Geeks Academy utilizan la librería SQLAlchemy para construir modelos, crear un modelo es muy sencillo:

```py
class Artist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)

    # Así es como el artista se imprimirá en la consola, sólo el nombre
    def __repr__(self):
        return self.name

    # Este es el aspecto que tendrá el artista en las respuestas JSON de la API
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
        }
```

He aquí algunos ejemplos de los distintos tipos de relaciones.

### Relación UNO a MUCHOS

Una relación uno a muchos coloca una clave foránea en la tabla del hijo que hace referencia al padre.

`db.relationship()` se especifica en el padre, como referencia a una colección de elementos representados por el hijo:

```py
class Artist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    
    # Un artista puede tener muchas grabaciones, y llamaremos a esta lista "records"
    # esta es una clave externa que apunta al Record.id
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
    
    # un registro sólo puede tener un artista, esto apunta al Artist.id
    artist_id = db.Column(db.Integer, db.ForeignKey("parent.id"), nullable=False)
    
    def __repr__(self):
        return self.name
        
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
        }
```

### Relación Muchos a Muchos

Muchos a Muchos añade una tabla de asociación entre dos clases. La tabla de asociación se indica mediante el argumento secundario de `db.relationship()`.

Normalmente, la tabla utiliza el objeto MetaData asociado a la clase base declarativa, para que las directivas ForeignKey puedan localizar las tablas remotas con las que enlazar:

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

## Migraciones

Una vez que tu archivo `models.py` esté listo, tienes que `migrar` y `actualizar` para poder sincronizar los cambios en tu motor de base de datos.

### Crear migraciones

Este comando creará todos los archivos de migraciones en tu carpeta `./migrations`, de esta forma los tendremos confirmados en Github y todos los que trabajen en el proyecto tendrán exactamente la misma estructura de base de datos.

```bash
$ pipenv run migrate
```

> Nota: Es importante mencionar que el comando `migrate` no actualiza tu base de datos, tendrás que `upgrade` si quieres realmente sincronizar los cambios en tu base de datos.

### Ejecutar las migraciones

El comando de actualización echa un vistazo a los archivos de migraciones, y ejecuta todo lo que queda por ejecutar (fuera de sincronización) para asegurarse de que su base de datos está alineada con las migraciones.

```bash
$ pipenv run upgrade
```

### Resolución de problemas en las migraciones

Al actualizar y migrar su base de datos, se encontrará con muchos errores. 
Aquí es donde resultan útiles los conocimientos de sintaxis SQL.

> 🛑 **El botón del pánico**: Hemos preparado este comando para ayudarte a poner a cero tu base de datos y tus migraciones.

```bash
$ bash docs/assets/reset_migrations.bash
```

## Operaciones CRUD

Hay muchas maneras de manipular bases de datos, pero hemos decidido utilizar Python y SQLAlchemy para hacerlo. Esto significa que no necesitas conocimientos de SQL, pero te recomendamos encarecidamente que aún así practiques y domines SQL con fines de depuración (la mayoría de los errores se muestran en lenguaje SQL)

### Consulta (SELECT) de datos

Asumiendo que tienes un objeto Person en tu archivo `models.py`.

```py
# conseguir a toda la gente
people_query = Person.query.all()

# obtener sólo los nombrados"Joe"
people_query = Person.query.filter_by(name='Joe')

# asigna los resultados y tu lista de personas dentro de la variable all_people
all_people = list(map(lambda x: x.serialize(), people_query))

# conseguir una sola persona
user1 = Person.query.get(person_id)
 ```

### Insertar datos

Asumiendo que tienes un objeto Person en tu fichero `models.py`.

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

## DOCUMENTACIÓN OFICIAL PARA MODELOS FLASK SQLAlchemy

Para más información, visite la siguiente página: https://flask-sqlalchemy.palletsprojects.com/en/2.x/models/
