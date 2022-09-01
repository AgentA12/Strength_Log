const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schema/index");
const db = require("./config/connection");
const express = require("express");

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

function startApolloServer(typeDefs, resolvers) {
  db.once("open", async () => {
    await server.start();
    server.applyMiddleware({ app });
    app.listen(PORT, () => {
      console.log(
        `Use for testing at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
}

startApolloServer(typeDefs, resolvers);
