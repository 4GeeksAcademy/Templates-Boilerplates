---
title: 'Start Fastapi'
description: 'Starting with the fastapi-hello boilerplate'
technologies: ['postgres', 'databases','fast']
---
# Guide to Using FastAPI

## How to Start coding?

Starting with the [fastapi-hello](https://github.com/4GeeksAcademy/fastapi-hello) boilerplate, you can find an example API working with a database. All your application code should be written inside the `./src/` folder.

- src/main.py: This is where the app starts (main thread) and initializes; all other Python files are imported from this thread.
- src/endpoints/: Add inside a new Python file for each entity you want to manipulate, for example: user.py includes the GET, POST, PUT and DELETE methods and endpoints for `User` model/entity.
- src/models.py: Your database tables and models.
- src/utils.py: Some reusable classes and functions.
- src/admin.py: Add your models to the admin and manage your data very easy.

## The .env file (environment variable)

Using environment variables inside the .env file helps manage configuration settings in different environments (development, testing, production) without changing the code. FastAPI can use environment variables for configuration through libraries like `python-dotenv`.

1. **Copy the `.env.example` file to create a `.env` file** at the root of your project:

```ini
DATABASE_URL=postgresql+psycopg2://gitpod:postgres@localhost:5432/example

# Add any other variables below
SOME_VAR=SOME_VALUE
```

## Routing and Endpoints

Routing in FastAPI is done through the use of `APIRouter` objects which can be included in the main application.

1. **Create a user endpoint** in `./src/endpoints/user.py`:

```python
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from .models import User as UserModel
from .database import get_db
from .utils import APIException
from pydantic import BaseModel, EmailStr

router = APIRouter()

# Serializers are used to validate the incoming request body
# Here you determine which fields are required and their types
class CreateSerializer(BaseModel):
    password: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    is_active: bool

# Serializers are also used to format the outgoing response body
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
    return UserSmallSerializer.model_validate(db_user)

@router.put("/users/{user_id}", response_model=UserSmallSerializer)
def update_user(user_id: int, user: UserUpdate, db: Session = Depends(get_db)):
    db_user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if db_user is None:
        raise APIException(status_code=404, detail="User not found")
    for key, value in user.dict().items():
        setattr(db_user, key, value)
    db.commit()
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

> 🔥 All the python files inside `./src/endpoints` will be automatically included as routes in your API, there is no need to use the `app.include_router` function.

## Request Validations

In API development, a concept called "Serialization" is used to receive and return data:

- When receiving the information, you can use the serializers to **validate** the incoming data and convert it into Python objects.
- When returning information, you can use the serializers to **convert your Python objects back into JSON** text to be sent to the front end.

In FastAPI, you can create a Serializer using a library called "Pydantic" and these serializers are called Pydantic Models. 

The following serializer called `CreateSerializer` was defined to validate the incoming data payload used during the `POST /user` endpoint that creates a new user, the endpoint payload must contain a password, email and `is_active` boolean.

 ```py
# Serializers are used to validate the incoming request body
# Here you determine which fields are required and their types
class CreateSerializer(BaseModel):
    password: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    is_active: bool
```

We have to specify our `CreateSerializer` class as the first parameter of the function that handles the POST method, in this case the `create_user` function and FastAPI will do the validations:

```py
@router.post("/users/")
#                   ⬇️ here we add the CreateSerializer
def create_user(incoming_payload: CreateSerializer, db: Session = Depends(get_db)):

    # The incoming_payload has already been validated, and you can "trust" it.
    db_user = UserModel(
        password=incoming_payload.password,
        email=incoming_payload.email,
        is_active=incoming_payload.is_active
    )
    db.add(db_user)
    db.commit()
    return UserSmallSerializer.model_validate(db_user)
```

## Serialization

Serialization is handled by Pydantic models which automatically convert Python objects to JSON text.

2. **Use the response model in your endpoint** in `./src/endpoints/user.py`:
    ```python
    @router.post("/users/", response_model=UserSmallSerializer)
    def create_user(user: UserCreate, db: Session = Depends(get_db)):
        db_user = UserModel(username=user.username, email=user.email, age=user.age)
        db.add(db_user)
        db.commit()
        return UserSmallSerializer.model_validate(db_user)
    ```

## Data Operations and Modeling

For database operations we use SQLAlchemy.

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

2. Here are some different examples on creating, deleting and updating a user:

```python
# Create a new SQLAlchemy user instance
db_user = UserModel(username=user.username, email=user.email, age=user.age)
db.add(db_user) # Add the user to the session
db.commit() # Commit the session to save the user in the database

# Delete a user by id
db_user = db.query(UserModel).filter(UserModel.id == user_id).first()
if db_user is None: raise APIException(status_code=404, detail="User not found")
db.delete(db_user) # Delete the user from the session
db.commit() # Commit the session to remove the user from the database

# Update the user by id
db_user = db.query(UserModel).filter(UserModel.id == user_id).first()
if db_user is None: raise APIException(status_code=404, detail="User not found")
# update the fields you need to update, for example:
db_user.username = "some_new_username"
# Commit the session to save the changes in the database
db.commit()

# Get all users with more than 18 yrs old
users = db.query(UserModel).filter(UserModel.age > 18).all()
```

### Summary

This guide covers the basic setup and use of FastAPI with environment variables, routing (including CRUD operations), validations, serialization using Pydantic models, and database operations with SQLAlchemy. With these components in place, you can build scalable and robust web applications using FastAPI.
