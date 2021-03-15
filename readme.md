# Ticketing App
A full stack microservices event-driven project. 

This application allow users to purchase or sell tickets.

This app is created mainly using microservices architecture, docker, kubernetes, NATS Streamging Server, Nginx Ingress Controller, Node.js, Express, MongoDB, Next.js and Typescript.

## Setup (Local Dev)
make sure you have docker and kubernetes installed in your local enviorment, then clone this repository.

### Set Up NGINX Ingress Controller
follow the [documentation](https://kubernetes.github.io/ingress-nginx/deploy/) to set up NGINX Ingress Controller.

### Install Skaffold
Skaffold will be used in this project. Follow the [documentation](https://skaffold.dev/docs/install/) to install skaffold.

### Create Secret Token
You might want to have a Stripe account for the second secret (stripe-secret), and replace the public key in front end file `./client/pages/orders/[orderId].js`, and the secret key in the payment test file `./payments/src/test/setup.ts` using your own public and secret keys <br>
Alternative you can also just use the current test public and secret key.

```bash
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=<YOUR_SECRET_KEY>

kubectl create secret generic stripe-secret --from-literal=STRIPE_KEY=<YOUR_SECRET_KEY>
```

### Set Up Mock Hostname
In order to redirect all the traffic going to ticketing.dev to localhost, add the following line to the end of you hosts file. You can safely delete this line after running this app.
```
127.0.0.1 ticketing.dev
```

### Run the App
From the project's root directory, type in:
```
skaffold dev
```

If you see a HTTPS warning in chrome, just type in the following line anywhere directly in Chrome:
```
thisisunsafe
```

## Architecture Overview
![overall architecture](https://i.ibb.co/MVmWxV9/overall-architecture.jpg)

When a user is trying to visit the home page of this application, the Nginx Load Balancer will forward this request to the client service, and responded back a fully generated react app.

All Services except Expiration Service and Client Service have their own database to store data that are necessary for the service.

There are totally six micro-services communicating through the NATS Streaming Server(Event bus). Each of them has its own kubernetes deployment and cluster IP service associate with it so that they can communicate between each other. 

## Micro-Services
- **[Client Service](https://github.com/WeijuZheng/ticketing/tree/master/client)** <br>
This service is responsible for rendering a react app and send it back to the user.

- **[Authentication Service](https://github.com/WeijuZheng/ticketing/tree/master/auth)** <br>
This service is in charge of user signup, signin and signout; it's also responsible for generating and deleting user's json web token, so other services can know if a user is signed in.

- **[Tickets Service](https://github.com/WeijuZheng/ticketing/tree/master/tickets)** <br>
This service is charge of ticket creation, updating and showing ticket. To create or update a ticket, a user must be signed in. User can only update tickets they own and not reserved. When a ticket is created or updated, it will emit an `"ticket:created"` / `"ticket:updated"` event to the order service. If an `"order:created"` event is received, this service will block the corresponding ticket so that other users won't see that ticket.  If an `"order:cancelled"` event is received, this service will unblock the corresponding ticket so that other users can purchase it.

- **[Orders Service](https://github.com/WeijuZheng/ticketing/tree/master/orders)** <br>
This service manages order creation, deletion and showing order detail. User must be signed in to use this service. When an order is created, it will emit an `"order:created"` event to the ticket service, the payment service and the expiration service. When an order is deleted, it will emit an `"order:cancelled"` event to the ticket service and the payment service. If `"ticket:created"` / `"ticket:updated"` event is received, it will store it to its own ticket database for further use. If `"expiration:complete"` event is received, it will mark the order's status as "cancelled", and publish an `"order:cancelled"` event. If `"payment:created"` event is received, it will mark the order's status as "complete".

- **[Payments Service](https://github.com/WeijuZheng/ticketing/tree/master/payments)** <br>
This service handles users' payment. When a POST request is send by the front end to this service with valid information (valid stripe token and order Id), it will charge the user the correct amount of money for the purchased ticket. Then it will also publish a `"payment:created"` event to the order service to indicated that the order has been paid. It listens to the `"order:created"` and `"order:cancelled"` events in order to store the latest order data into its own order database for further usage.

- **[Expiration Service](https://github.com/WeijuZheng/ticketing/tree/master/expiration)** <br>
This service only in charge of the expiration timer. It only listen to the `"order:created"` event. When it receives such an event, it will calculate a correct delay time for the ticket. After the delay time, it will publish an `"expiration:complete"` event to indicate that the order is expired.

## Common Module
All the common code shared among each service are written in a NPM module.<br> 
- Code can be found [here](https://github.com/WeijuZheng/ticketing-common/tree/7417330665b3f90442fc5007cf10666bcc1b2751)<br>
- NPM module can be found [here](https://www.npmjs.com/package/@wztickets/common) 

## Deployment
This app was deployed using Digital Ocean Kubernetes. <br>
live demo at: http://www.ticketing-app-practice.xyz

## CI/CD
All the CI/CD workflow for this app are created using github action.