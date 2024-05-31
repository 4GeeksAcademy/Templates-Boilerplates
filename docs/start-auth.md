---
title: "Understanding JWT and how to implement a simple JWT with Flask"
subtitle: "What is JSON Web Token (JWT), how does it work, and how to apply it to your API using the Flask Microframework for API Development"
technologies: ['expressjs', 'node', 'JWT','RestAPI', 'python','flask','fastapi']
---

Almost every API needs an authentication layer, and there are many ways to tackle that problem. Today we are going to be implementing JWT token into our Flask API.

## How API Authentication works

You can divide a standard authentication process into 5 main steps:

1. The user writes their username and password on your website.
2. The username and password get sent to the backend API.
3. The API looks for any record on the `User` table that matches the username.
    1. In many cases, the keys are usually encrypted when saving them, so it is necessary to use a specific method to validate it depending on the case.
4. If a user is validated, it generates a `token` for that user and responds `status_code=200` back to the front end.
5. The front-end will use that `token` from now on to make any future request.

![Autentication workflow](https://github.com/breatheco-de/content/blob/master/src/assets/images/authentication-diagram.png?raw=true)

> ☝️ If you don't know what a token is, I would recommend [this reading](https://4geeks.com/lesson/token-based-api-authentication).

<!-- ## How to implement a JWT schema on my API with express? -->

## How to implement a JWT schema on my API with Flask?

> [In this article you will find the details about how to implement this schema on your Flask API](https://4geeks.com/lesson/what-is-jwt-and-how-to-implement-with-flask)
