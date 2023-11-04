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
    console.log(error.message);
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
