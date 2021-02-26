# Ticketing App
A full stack microservices event-driven project. 

This ticketing application allow users to create accounts in order to sell or purchase tickets.

This app is created mainly using microservices architecture, docker, kubernetes, NATS Streamging Server, Nginx Ingress Controller, Node.js, Express, MongoDB, Next.js and Typescript.

# Architecture Overview
![overall architecture](https://i.ibb.co/MVmWxV9/overall-architecture.jpg)

When a user is trying to visit the home page of this application, the Nginx Load Balancer will forward this request to the client service, and responded back a fully generated react app.

All Services except Expiration Service and Client Service have their own database to store data that are necessary for the service.

There are totally six micro-services communicating through the NATS Streaming Server(Event bus). Each of them has its own kubernetes deployment and cluster IP service associate with it so that they can communicate between each other. 

## Micro-services
- [Client Service](https://github.com/WeijuZheng/ticketing/tree/master/client) <br>
This service is responsible for rendering a react app and send it back to the user

- [Authentication Service](https://github.com/WeijuZheng/ticketing/tree/master/auth) <br>
This service is in charge of user signup, signin and signout; it's also responsible for generating and deleting user's json web token.

- [Tickets Service](https://github.com/WeijuZheng/ticketing/tree/master/tickets) <br>
This service is charge of ticket creation, updating and showing ticket. To create or update a ticket, a user must be signed in. User can only update tickets they own and not reserved. When a ticket is created or updated, it will emit an "ticket:created" / "ticket:updated" event to the order service. If an "order:created" event was received, this service will block the corresponding ticket so that other users won't see that ticket.  If an "order:cancelled" event was received, this service will unblock the corresponding ticket so that other users can purchase it.

- [Orders Service](https://github.com/WeijuZheng/ticketing/tree/master/orders) <br>
This service manages orders creation, deletion and showing order detail. User must be signed in to use this service. When an order is created, it will emit an "order:created" event to the ticket service, the payment service and the expiration service. When an order is deleted, it will emit an "order:cancelled" event to the ticket service and the payment service. If "ticket:created" / "ticket:updated" event was received, it will store it to its own ticket database for further use. If "expiration:complete" event was received, it will mark the order's status as "cancelled", and publish an "order:cancelled" event. If "payment:created" event was received, it will mark the order's status as "complete".

- [Payments Service](https://github.com/WeijuZheng/ticketing/tree/master/payments) <br>

- [Expiration Service](https://github.com/WeijuZheng/ticketing/tree/master/expiration) <br>