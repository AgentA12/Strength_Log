const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type exercise {
    name: String
  }

  type user {
    name: String
    email: String
    password: String
  }

  type Query {
    exercise: [exercise]
    user: [user]
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): user
  }
`;

module.exports = typeDefs;
