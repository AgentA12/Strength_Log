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
  cache: "bounded",
  formatError: (error) => {
    console.log(error)
    if (error.message.startsWith("Exercise")) {
      return new Error("You must fill in all Exercise fields");
    }

    if (error.message.startsWith("Template")) {
      return new Error("You must add a template name");
    }

    return new Error(error.message.toString());
  },
});

function startApolloServer(typeDefs, resolvers) {
  db.once("open", async () => {
    await server.start();
    server.applyMiddleware({ app });
    app.listen(PORT, () => {});
  });
}

startApolloServer(typeDefs, resolvers);
