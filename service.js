const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const { ApolloGateway, RemoteGraphQLDataSource } = require("@apollo/gateway");
const express = require('express');
const http = require('http');

const { serviceList, pollIntervalInMs } = require("./config");

const gateway = new ApolloGateway({
  serviceList,
  pollIntervalInMs,
  buildService({ url }) {
    return new RemoteGraphQLDataSource({
      url,
      willSendRequest({ request, context }) {
        if (context.Authorization) {
          request.http.headers.set("Authorization", context.Authorization);
        }
      },
    });
  },
});

(async () => {
  const app = express();
  const httpServer = http.createServer(app, {
    cors: false,
  });
  const server = new ApolloServer({
    gateway,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground({
        httpServer: httpServer,
      }),
    ],
    context: ({ req }) => {
      return {
        Authorization: req.headers.authorization || null,
      };
    },
  });

  await server.start();
  server.applyMiddleware({ app });
  await new Promise(resolve => httpServer.listen({ port: process.env.PORT || 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
})();
