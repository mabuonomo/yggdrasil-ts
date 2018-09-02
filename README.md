## YGGDRASIL

<div align="center">
  <a href="#">
    <img src="https://github.com/mabuonomo/yggdrasil/raw/master/resources/logo.jpg" height="228">
  </a>
  <br>
  <br>
</div>

[![dependencies Status](https://david-dm.org/mabuonomo/yggdrasil/status.svg)](https://david-dm.org/mabuonomo/yggdrasil)

A prototype of a nodejs server, written in Typescript, with JWT authentication, GraphQL and TypeORM

## Run
```bash
npm start run
```

## Testing
### GraphQL without JWT authentication
To simulate GraphQL via browser (without JWT authentication) navigate to 
```bash
http://localhost:3000/graphl
```

Create an user:
```graphql
mutation add($newUser: UserInput!) {
  insert(newUser: $newUser) {
    name
    _id
    password
    profile {
      email
    }
  }
}

{
  "newUser": {
    "name": "Mario",
    "profile": {
      "email": "email@email.it"
    },
    "password": "password"
  }
}
```

### Login (get JWT token):
You can use Inmsomia or Postman
```
Endpoint 
/auth
```
```
Body
email: email@email.it
password: password
```

### GraphQL with JWT authentication
To simulate GraphQL with JWT authentication you can use Inmsomia (https://support.insomnia.rest/)
```
Endpoint
http://localhost:3000/api
```

```
Header
Authorization Bearer YOUR_JWT_TOKEN

```


