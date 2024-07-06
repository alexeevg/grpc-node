# GOAWAY issue demo

This example illustrates how GOAWAY from server triggers `RST_STREAM with code 2` and `CANCELLED` errors on client.

## Start the server

```
node server.js
```

## Start the client

```
GRPC_TRACE=transport GRPC_VERBOSITY=DEBUG node client.js
```

Soon you'll be getting log messages like these:

```
D 2024-07-06T14:25:38.086Z | v1.10.10 98559 | transport | dns:localhost:50052 creating HTTP/2 session to 127.0.0.1:50052
13 INTERNAL: Received RST_STREAM with code 2 (Internal server error)
1 CANCELLED: Call cancelled
D 2024-07-06T14:25:38.093Z | v1.10.10 98559 | transport | (37) 127.0.0.1:50052 local settings acknowledged by remote: {"headerTableSize":4096,"enablePush":true,"initialWindowSize":65535,"maxFrameSize":16384,"maxConcurrentStreams":4294967295,"maxHeaderListSize":4294967295,"maxHeaderSize":4294967295,"enableConnectProtocol":false}
D 2024-07-06T14:25:38.093Z | v1.10.10 98559 | transport | (36) 127.0.0.1:50052 session closed
D 2024-07-06T14:25:38.602Z | v1.10.10 98559 | transport | (37) 127.0.0.1:50052 connection closed by GOAWAY with code 0 and data max_age
D 2024-07-06T14:25:38.602Z | v1.10.10 98559 | transport | dns:localhost:50052 creating HTTP/2 session to 127.0.0.1:50052
13 INTERNAL: Received RST_STREAM with code 2 (Internal server error)
1 CANCELLED: Call cancelled
D 2024-07-06T14:25:38.608Z | v1.10.10 98559 | transport | (38) 127.0.0.1:50052 local settings acknowledged by remote: {"headerTableSize":4096,"enablePush":true,"initialWindowSize":65535,"maxFrameSize":16384,"maxConcurrentStreams":4294967295,"maxHeaderListSize":4294967295,"maxHeaderSize":4294967295,"enableConnectProtocol":false}
D 2024-07-06T14:25:38.608Z | v1.10.10 98559 | transport | (37) 127.0.0.1:50052 session closed
D 2024-07-06T14:25:39.142Z | v1.10.10 98559 | transport | (38) 127.0.0.1:50052 connection closed by GOAWAY with code 0 and data max_age
D 2024-07-06T14:25:39.142Z | v1.10.10 98559 | transport | dns:localhost:50052 creating HTTP/2 session to 127.0.0.1:50052
13 INTERNAL: Received RST_STREAM with code 2 (Internal server error)
```
