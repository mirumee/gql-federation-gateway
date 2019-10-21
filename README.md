# Graphql Federation Gateway

This is a simple gateway that exposes uniform GraphQL API for multiple services using Apollo Federation. Runs on Apollo Server.

## Configuration

The only one settings that service needs is list of GraphQL endpoints in federation along with names:

```bash
export ENDPOINTS="first:http://host:8000/graphql/ second:http://host2:8000/graphql/"
```

Endpoints must be separated by spaces and a name is finished by the first colon. 