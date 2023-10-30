const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schema/index");
const db = require("./config/connection");
const express = require("express");
const { authMiddleWare } = require("./utils/auth");
const path = require("path");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleWare,
  cache: "bounded",
  formatError: (error) => {
    console.log(error);
    if (
      error.message ===
      "User validation failed: username: Path `username` is required., password: Path `password` is required."
    ) {
      return new Error("Username and password is required.");
    }

    if (
      error.message ===
      "User validation failed: password: Path `password` is required."
    ) {
      return new Error("Password is required");
    }

    if (
      error.message ===
      'Expected Iterable, but did not find one for field "Mutation.createTemplate".'
    ) {
      return new Error("You must fill out all fields.");
    }

    if (error.message.startsWith("Exercise")) {
      return new Error("You must fill in all Exercise fields");
    }

    if (error.message.startsWith("Template")) {
      return new Error("You must add a template name");
    }

    return new Error(error.message.toString());
  },
});

function startApolloServer() {
  db.once("open", async () => {
    await server.start();
    server.applyMiddleware({ app });
    app.listen(PORT, () => {});
  });
}

startApolloServer();
