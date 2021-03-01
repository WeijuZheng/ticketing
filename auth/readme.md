# Auth Service
This is the auth service of the ticketing app. This service handles user signup, signin, and signout. it's responsible for generating and deleting user's json web token, so other services can know if a user is authenticated.

All the request to this app with path prefix of `/api/users/` will be send to this auth service.

Every json web token is signed using a secret key that is stored as a Kubernetes secret. It has the following payload:

```
{
    id: user's ID,
    email: user's email
}
```

The json web token then will be send back to the client in a cookie. Every time a client visit the app, the cookie will be checked to see if the user is authenticated.

## API
### **Get the current user's information**
#### Request
`GET /api/users/currentuser`
#### Request Body
`{}`
#### Response
- Status Code: `200`
- Content: `{ id: 123, email: 'test@test.com' }`

### **User Sign Up**
#### Request
`POST /api/users/signup`
#### Request Body
`{ email: 'test@test.com', password: 123456 }`
#### Response
- Status Code: `201`
- Content: `{ id: 123, email: 'test@test.com' }`

### **User Sign In**
#### Request
`POST /api/users/signin`
#### Request Body
`{ email: 'test@test.com', password: 123456 }`
#### Response
- Status Code: `200`
- Content: `{ id: 123, email: 'test@test.com' }`

### **User Sign Out**
#### Request
`POST /api/users/signout`
#### Request Body
`{}`
#### Response
- Status Code: `200`
- Content: `{}`