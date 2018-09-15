## YGGDRASIL
A prototype of a nodejs server, written in Typescript, with JWT authentication, GraphQL and TypeORM

## Prerequisites
* MongoDB
* NPM 6.2+
* NodeJS 10.9+

### First
* Compile the ts files.
* Copy ormconfig.json and config.json into dist folder

### Run
```bash
npm start run
```

## Endpoints

There are two endpoints, /sign and /api.

### Registration and Login (without JWT token)
The first, without JWT check validation, allow you to make a registration and a login
```
http://localhost:3000/sign
```
```graphql
query login($loginInput: LoginInput!) {
  signIn(loginInput: $loginInput) {
    result,
    token,
    error,
    info {
      message
    }
  }
}

mutation register($newUser: UserInput!) {
  signUp(newUser: $newUser) {
    name
  }
}
```
```json
Query variables:
{
  "loginInput": {
    "email": "email@email.it",
    "password": "password"
  },
  "newUser": {
    "name": "user",
    "profile": {
      "email": "email@email.it"
    },
    "password": "password"
  }
}

Result Login:
{
  "data": {
    "signIn": {
      "result": true,
      "token": "******",
      "error": null,
      "info": {
        "message": "Logged In Successfully"
      }
    }
  }
}
```

### API (need a JWT token)
The second endpoint need a JWT token that you can to get from login query.

```
http://localhost:3000/api
```

```graphql
query getByEmail($email: String!) {
  getByEmail(email: $email) {
    name
  }
}
```
```json
Query variables:
{
  "email": "email@email.it"
}

Result:
{
  "data": {
    "getByEmail": {
      "name": "user"
    }
  }
}
```
---
## Thanks to
* NodeJS        https://nodejs.org
* TypeGraphql   https://github.com/19majkel94/type-graphql
* TypeOrm       https://github.com/typeorm/typeorm
* JWT           https://jwt.io/
