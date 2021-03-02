# Tickets Service
This is the tickets service of the [ticketing app](https://github.com/WeijuZheng/ticketing). This service handles ticket creation and ticket updating. User must be signed in to create or edit tickets.

All the request to this app with path prefix of `/api/tickets` will be send to this orders service.

## Event Flow
This service listens to `"order:created"` and `"order:cancelled"` events in order to reserve or unreserve a ticket. This service publishes `"ticket:created"` and `"ticket:updated"` events.

### "ticket:created" and "ticket:updated" Event Flow
![ticket Event Flow](https://i.ibb.co/wWDtpMj/tickets-service-event-flow.jpg)

## Service API
### Get all the tickets
#### Request
`GET /api/tickets`
#### Request Body
`{}`
#### Response
- Status Code: `200`
- Content: `[ { id, title, price, userId, version } ]`
---
### Get the detail of a specific ticket
#### Request
`GET /api/tickets/:id`
#### Request Body
`{}`
#### Response
- Status Code: `200`
- Content: `{ id, title, price, userId, version }`
---
### Create a ticket
#### Request
`POST /api/tickets`
#### Request Body
`{ title, price }`
#### Response
- Status Code: `201`
- Content: `{ id, title, price, userId, version }`
---
### Update a ticket
#### Request
`PUT /api/tickets/:id`
#### Request Body
`{ title, price }`
#### Response
- Status Code: `200`
- Content: `{ id, title, price, userId, version }`
---