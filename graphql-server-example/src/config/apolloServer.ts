import { ApolloServer } from "@apollo/server";
import todoResolver from "../resolver/todoResolver.js";
import { readFileSync } from "node:fs";
import index from "../resolver/index.js";

const typeDefs = readFileSync("./schema.graphql", { encoding: "utf-8" });
const apolloServer = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: index,
});

export default apolloServer;
