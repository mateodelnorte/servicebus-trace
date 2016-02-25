# servicebus-trace
servicebus middleware to publish message receipt information to a central store, for message tracking and tracing purposes.

### servicebus-trace utility

Install servicebus-trace globally to allow using the `servicebus-trace` utility. 
```
npm install -g servicebus-trace
servicebus-trace
```
will display service middleware trace information from your local redis instance similar to below:
```
  servicebus-trace
┌─────┬───────────────────────────────────┬──────────────────────────────┬──────────────────────────────┬──────────────────────────────┬───────────┬──────────────────────────────────────────┐
│ #   │ correlationId / cid               │ service name                 │ queue / routingKey           │ type                         │ direction │ date                                     │
├─────┼───────────────────────────────────┼──────────────────────────────┼──────────────────────────────┼──────────────────────────────┼───────────┼──────────────────────────────────────────┤
│ 1   │ patient-sunset-4ybOWdDse          │ test-service                 │ test.queue                   │ bla                          │ inbound   │ Sat Aug 31 48120 11:17:46 GMT-0400 (EDT) │
├─────┼───────────────────────────────────┼──────────────────────────────┼──────────────────────────────┼──────────────────────────────┼───────────┼──────────────────────────────────────────┤
│ 2   │ patient-sunset-4ybOWdDse          │ test-service                 │ test.queue                   │ bla                          │ outbound  │ Sat Aug 31 48120 11:17:41 GMT-0400 (EDT) │
└─────┴───────────────────────────────────┴──────────────────────────────┴──────────────────────────────┴──────────────────────────────┴───────────┴──────────────────────────────────────────┘
```
