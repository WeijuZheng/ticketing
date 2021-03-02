# Auth Service
This is the auth service of the [ticketing app](https://github.com/WeijuZheng/ticketing). This service handles user signup, signin, and signout. It's responsible for generating and deleting user's json web token, so other services can know if a user is authenticated. This service do not need to communicate to other services.

All the request to this app with path prefix of `/api/users/` will be send to this auth service.

Every json web token is signed using a secret key that is stored as a Kubernetes secret. It has the following payload:

```
{
    id: user's ID,
    email: user's email
}
```

The json web token then will be send back to the client in a cookie. Every time a client visit the app, the cookie will be checked to see if the user is authenticated.

## Service API
### Get the current user's information
#### Request
`GET /api/users/currentuser`
#### Request Body
`{}`
#### Response
- Status Code: `200`
- Content: `{ id, email }`
---
### User sign up
#### Request
`POST /api/users/signup`
#### Request Body
`{ email, password }`
#### Response
- Status Code: `201`
- Content: `{ id, email }`
---
### User sign in
#### Request
`POST /api/users/signin`
#### Request Body
`{ email, password }`
#### Response
- Status Code: `200`
- Content: `{ id, email }`
---
### User sign out
#### Request
`POST /api/users/signout`
#### Request Body
`{}`
#### Response
- Status Code: `200`
- Content: `{}`
---