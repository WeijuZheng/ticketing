# Payments Service
This is the payments service of the [ticketing app](https://github.com/WeijuZheng/ticketing). This service manages order payments.

All the request to this app with path prefix of `/api/payments` will be send to this payments service.

This service has its own database for order information, so it does not depend on the order service when it want information about an order.

## Event Flow
This service listens to `"order:created"` and `"order:cancelled"` events in order to get the latest information about the order. This service publishes `"payment:created"` events.

### "payment:created" Event Flow
![payment:created Event Flow](https://i.ibb.co/ZLk3G9K/payment-service-event-flow.jpg)

## Service API
### Create a new payment to charge the user
#### Request
`POST /api/payments`
#### Request Body
`{token: StripeToken, orderId}`
#### Response
- Status Code: `200`
- Content: `{ id: paymentId }`
---
