# Graphql Federation Gateway

This is a simple gateway that exposes uniform GraphQL API for multiple services using Apollo Federation. Runs on Apollo Server.

This is a fork of: [saleor/gql-federation-gateway](https://github.com/mirumee/gql-federation-gateway)


### Environment variables (* mandatory):

- `API_URL`: The base graphql API (*)  
- `PLUGINS`: A comma separated list of plugin IDs from saleor
- `POLLING_INTERVAL`: Apollo pollIntervalInMs


Run with `npm start`, open in `http://localhost:4000/graphql`
