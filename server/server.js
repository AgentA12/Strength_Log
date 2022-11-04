const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schema/index");
const db = require("./config/connection");
const express = require("express");
const { authMiddleWare } = require("./utils/auth");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleWare,
  formatError: (error) => {
    console.log(error.message);
    if (error.message.startsWith("Exercise")) {
      return new Error("You must fill in all Exercise fields");
    }

    if (error.message.startsWith("Template")) {
      return new Error("You must add a template name");
    }
  },
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
