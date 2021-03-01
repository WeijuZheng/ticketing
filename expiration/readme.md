# Expiration Service
This service in charge of the expiration timer. It's implemented using Redis and Bull.js.

When it recerives an "order:created" event from the order service, it first calculate the correct time by doing 

```
delay = order'expiration time - the current time
```

After the delay, it means the order has already been expired, therefore this service will publish an "expiration:complete" event to indicate that the order is expired.