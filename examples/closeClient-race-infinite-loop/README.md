# Infinite loop issue demo

This example demonstrates the infinite loop that happens when new requests are created concurrently with grpc.closeClient call.

## Start the server

```
node server.js
```

## Start the client

```
GRPC_TRACE=load_balancing_call GRPC_VERBOSITY=DEBUG node client.js
```

Soon the client will enter an infinite loop producing log messages like these:

```
D 2024-07-06T17:36:58.495Z | v1.10.10 10882 | load_balancing_call | [84] Pick called
D 2024-07-06T17:36:58.495Z | v1.10.10 10882 | load_balancing_call | [84] Pick result: COMPLETE subchannel: (1) 127.0.0.1:50052 status: undefined undefined
D 2024-07-06T17:36:58.495Z | v1.10.10 10882 | load_balancing_call | [84] Picked subchannel (1) 127.0.0.1:50052 has state IDLE after getting credentials metadata. Retrying pick
D 2024-07-06T17:36:58.495Z | v1.10.10 10882 | load_balancing_call | [84] Pick called
D 2024-07-06T17:36:58.495Z | v1.10.10 10882 | load_balancing_call | [84] Pick result: COMPLETE subchannel: (1) 127.0.0.1:50052 status: undefined undefined
D 2024-07-06T17:36:58.495Z | v1.10.10 10882 | load_balancing_call | [84] Picked subchannel (1) 127.0.0.1:50052 has state IDLE after getting credentials metadata. Retrying pick
D 2024-07-06T17:36:58.495Z | v1.10.10 10882 | load_balancing_call | [84] Pick called
D 2024-07-06T17:36:58.495Z | v1.10.10 10882 | load_balancing_call | [84] Pick result: COMPLETE subchannel: (1) 127.0.0.1:50052 status: undefined undefined
D 2024-07-06T17:36:58.495Z | v1.10.10 10882 | load_balancing_call | [84] Picked subchannel (1) 127.0.0.1:50052 has state IDLE after getting credentials metadata. Retrying pick
D 2024-07-06T17:36:58.495Z | v1.10.10 10882 | load_balancing_call | [84] Pick called
D 2024-07-06T17:36:58.495Z | v1.10.10 10882 | load_balancing_call | [84] Pick result: COMPLETE subchannel: (1) 127.0.0.1:50052 status: undefined undefined
D 2024-07-06T17:36:58.495Z | v1.10.10 10882 | load_balancing_call | [84] Picked subchannel (1) 127.0.0.1:50052 has state IDLE after getting credentials metadata. Retrying pick```
