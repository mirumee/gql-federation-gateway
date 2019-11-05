# Graphql Federation Gateway

This is a simple gateway that exposes uniform GraphQL API for multiple services using Apollo Federation. Runs on Apollo Server.

## Configuration

### Services
The only one settings that service really needs is a list of GraphQL endpoints in the federation along with their identifying aliases:

```bash
export ENDPOINTS="first:http://host:8000/graphql/ second:http://host2:8000/graphql/"
```

Endpoints must be separated by spaces and a name is finished by the first colon. 

### Polling

Gateway will poll services to update schema on regular intervals. Default interval is 6 seconds, you can change it with _POLLING_INTERVAL_ environment variablem which is in miliseconds.

```bash
export POLLING_INTERVAL=10000
```

This whill set polling interval to 10 seconds.
