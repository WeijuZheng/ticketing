# Expiration Service
This is the expiration service of the [ticketing app](https://github.com/WeijuZheng/ticketing). This service in charge of the expiration timer. It's implemented using Redis and Bull.js.

## Event Flow
This service listens to `"order:created"` events to start a timer to eventually expire the order. This service publishes `"expiration:complete"` events.

When it recerives an `"order:created"` event from the order service, it first calculate the correct time by doing 

```
delay = order's expiration time - the current time
```

After the delay, it means the order has already been expired, therefore this service will publish an `"expiration:complete"` event to indicate that the order is expired.

### "expiration:complete" Event Flow
![expiration:complete Event Flow](https://i.ibb.co/kmjXLk0/expiration-service-event-flow.jpg)