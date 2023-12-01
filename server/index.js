import cors from "cors";
import db from "./config/connection.js";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema/index.js";
import { authMiddleWare } from "./utils/auth.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../dist/build")));
}

app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
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
    server.applyMiddleware({ path: "/graphql", app });
    app.listen(PORT, () => {});
  });
}

startApolloServer();
