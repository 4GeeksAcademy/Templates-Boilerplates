---
title: 'Inicia un proyecto en Python con Fast Api'
description: 'Iniciando con el boilerplate fastapi-hello'
technologies: ['postgres', 'databases','fast']
---
# Guía de uso de FastAPI

## ¿Cómo empezar a codificar?

Empezando por el boilerplate  [fastapi-hello](https://github.com/4GeeksAcademy/fastapi-hello), puedes encontrar un ejemplo de API funcionando con una base de datos. Todo el código de tu aplicación debe estar escrito dentro de la carpeta `./src/`.

- src/main.py: Aquí es donde la aplicación arranca (hilo principal) y se inicializa; todos los demás archivos Python se importan desde este hilo.
- src/endpoints/: Añade dentro un nuevo archivo Python para cada entidad que quieras manipular, por ejemplo: user.py incluye los métodos GET, POST, PUT y DELETE y los endpoints para el modelo/entidad `User`.
- src/models.py: Las tablas y modelos de tu base de datos.
- src/utils.py: Algunas clases y funciones reutilizables.
- src/admin.py: Añade tus modelos al admin y gestiona tus datos muy fácilmente.

## El archivo .env (variable de entorno)

El uso de variables de entorno dentro del archivo .env ayuda a gestionar los ajustes de configuración en diferentes entornos (desarrollo, pruebas, producción) sin cambiar el código. FastAPI puede utilizar variables de entorno para la configuración a través de librerías como `python-dotenv`.

1. **Copie el archivo `.env.example` para crear un archivo `.env`.** en la raíz de su proyecto:

```ini
DATABASE_URL=postgresql+psycopg2://gitpod:postgres@localhost:5432/example

# Add any other variables below
SOME_VAR=SOME_VALUE
```

## Enrutamiento y Endpoints

El enrutamiento en FastAPI se realiza mediante el uso de objetos `APIRouter` que pueden ser incluidos en la aplicación principal.

1. **Crear una ruta de usuario** en `./src/endpoints/user.py`:

```python
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from .models import User as UserModel
from .database import get_db
from .utils import APIException
from pydantic import BaseModel, EmailStr

router = APIRouter()

# Los serializadores se utilizan para validar el cuerpo de la solicitud entrante
# Aquí se determina qué campos son obligatorios y sus tipos
class CreateSerializer(BaseModel):
    password: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    is_active: bool

# Los serializadores también se utilizan para dar formato al cuerpo de la respuesta saliente
class UserSmallSerializer(BaseModel):
    email: str
    is_active: bool

    class Config:
        from_attributes = True

@router.get("/users/")
def read_users(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    users = db.query(UserModel).offset(skip).limit(limit).all()
    return [UserSmallSerializer.model_validate(user) for user in users]

@router.get("/users/{user_id}")
def read_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if user is None:
        raise APIException(status_code=404, detail="User not found")
    return UserSmallSerializer.model_validate(user)

@router.post("/users/")
def create_user(user: CreateSerializer, db: Session = Depends(get_db)):
    db_user = UserModel(username=user.username, email=user.email, age=user.age)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return UserSmallSerializer.model_validate(db_user)

@router.put("/users/{user_id}", response_model=UserSmallSerializer)
def update_user(user_id: int, user: UserUpdate, db: Session = Depends(get_db)):
    db_user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if db_user is None:
        raise APIException(status_code=404, detail="User not found")
    for key, value in user.dict().items():
        setattr(db_user, key, value)
    db.commit()
    db.refresh(db_user)
    return UserSmallSerializer.model_validate(db_user)

@router.delete("/users/{user_id}", response_model=UserSmallSerializer)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if db_user is None:
        raise APIException(status_code=404, detail="User not found")
    db.delete(db_user)
    db.commit()
    return UserSmallSerializer.model_validate(db_user)
```

> 🔥 Todos los archivos python dentro de `./src/endpoints` serán incluidos automáticamente como rutas en tu API, no hay necesidad de usar la función `app.include_router`.

### Validaciones

FastAPI proporciona validación automática de peticiones utilizando modelos Pydantic. Se pueden lanzar excepciones personalizadas para errores de validación.

El siguiente serializador llamado `CreateSerializer` fue definido para validar el `POST /user` que crea un nuevo usuario, el payload del endpoint debe contener una contraseña, email y el booleano `is_active`.

 ```py
# Los serializadores se utilizan para validar el cuerpo de la solicitud entrante
# Here you determine which fields are required and their types
class CreateSerializer(BaseModel):
    password: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    is_active: bool
```

Tenemos que especificar nuestra clase `CreateSerializer` como primer parámetro de la función que maneja el método POST, en este caso la función `create_user` y FastAPI hará las validaciones:

```py
@router.post("/users/")
#                   ⬇️ aquí añadimos el CreateSerializer
def create_user(user: CreateSerializer, db: Session = Depends(get_db)):
    db_user = UserModel(username=user.username, email=user.email, age=user.age)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return UserSmallSerializer.model_validate(db_user)
```

### Serialización

La serialización es manejada por modelos Pydantic que automáticamente convierten objetos Python a texto JSON.

2. **Utilice el modelo de respuesta en su endpoint** en `./src/endpoints/user.py`:
    ```python
    @router.post("/users/", response_model=UserSmallSerializer)
    def create_user(user: UserCreate, db: Session = Depends(get_db)):
        db_user = UserModel(username=user.username, email=user.email, age=user.age)
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return UserSmallSerializer.model_validate(db_user)
    ```

### Operaciones y modelado de datos

Para las operaciones de base de datos utilizamos SQLAlchemy.

1. **Define a database model** in `./src/models.py`:
    ```python
    from sqlalchemy import Column, Integer, String
    from .database import Base

    class User(Base):
        __tablename__ = "users"
        id = Column(Integer, primary_key=True, index=True)
        username = Column(String, unique=True, index=True)
        email = Column(String, unique=True, index=True)
        age = Column(Integer)
    ```

2. He aquí algunos ejemplos de creación, eliminación y actualización de un usuario:

```python
# Crear una nueva instancia de usuario SQLAlchemy
db_user = UserModel(username=user.username, email=user.email, age=user.age)
db.add(db_user) # Añadir el usuario a la sesión
db.commit() # Confirmar la sesión para guardar el usuario en la base de datos

# Eliminar un usuario por id
db_user = db.query(UserModel).filter(UserModel.id == user_id).first()
if db_user is None: raise APIException(status_code=404, detail="User not found")
db.delete(db_user) # Eliminar el usuario de la sesión
db.commit() # Confirmar la sesión para eliminar el usuario de la base de datos

# Actualizar el usuario por id
db_user = db.query(UserModel).filter(UserModel.id == user_id).first()
if db_user is None: raise APIException(status_code=404, detail="User not found")
# Actualizar los campos que necesite actualizar, por ejemplo:
db_user.username = "some_new_username"
# Confirmar la sesión para guardar los cambios en la base de datos
db.commit()

# Obtener todos los usuarios con más de 18 años de edad
users = db.query(UserModel).filter(UserModel.age > 18).all()
```

### Resumen

Esta guía cubre la configuración básica y el uso de FastAPI con variables de entorno, enrutamiento (incluyendo operaciones CRUD), validaciones, serialización usando modelos Pydantic, y operaciones de base de datos con SQLAlchemy. Con estos componentes en su lugar, usted puede construir aplicaciones web escalables y robustas utilizando FastAPI.
