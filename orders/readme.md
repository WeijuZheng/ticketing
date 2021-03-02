# Orders Service
This is the orders service of the [ticketing app](https://github.com/WeijuZheng/ticketing). This service handles order creation and order deletion. User must be signed in to use this service.

All the request to this app with path prefix of `/api/orders` will be send to this orders service.

This service has its own database for ticket information, so it does not depend on the ticket service when it want information about a ticket.

## Event Flow
This service listens to `"ticket:created"`, `"ticket:updated"`, `"expiration:complete"` and `"payment:created"` events in order to get the latest information about the ticket or cancel the order if the order is expirated. This service publishes `"order:created"` and `"order:cancelled"` events.
### "order:created" Event Flow
![order:created Event Flow](https://i.ibb.co/6vjM4Ds/order-service-event-flow.jpg)
### "order:cancelled" Event Flow
![order:cancelled Event Flow](https://i.ibb.co/9Gc6YWT/order-service-event-flow2.jpg)

## Service API
### Get all orders for the current signed in user
#### Request
`GET /api/orders`
#### Request Body
`{}`
#### Response
- Status Code: `200`
- Content: `[ { id, userId, expiresAt, status, version, ticket: { id, title, price } } ]`
---
### Get the detail of a specific order
#### Request
`GET /api/orders/:id`
#### Request Body
`{}`
#### Response
- Status Code: `200`
- Content: `{ id, userId, expiresAt, status, version, ticket: { id, title, price } }`
---
### Create an order with a specific ticket
#### Request
`POST /api/orders`
#### Request Body
`{ ticketId }`
#### Response
- Status Code: `200`
- Content: `{ id, userId, expiresAt, status, version, ticket: { id: ticketId, title, price } }`
---
### Cancel an order
#### Request
`DELETE /api/orders/:id`
#### Request Body
`{}`
#### Response
- Status Code: `204`
- Content: `{ id, userId, expiresAt, status: 'cancelled', version, ticket: { id, title, price } }`
---
