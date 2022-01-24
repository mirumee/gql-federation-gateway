const { ApolloServer } = require("apollo-server");
const { ApolloGateway, RemoteGraphQLDataSource } = require("@apollo/gateway");
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
  const { schema, executor } = await gateway.load();

  const server = new ApolloServer({
    schema,
    executor,
    context: ({ req }) => {
      return {
        Authorization: req.headers.authorization || null,
      };
    },
  });

  server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
})();
