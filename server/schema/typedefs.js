const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Exercise {
    _id: ID
    name: String
    sets: Int
    reps: Int
  }

  type User {
    _id: ID
    username: String
    createdAt: String
    templates: [Template]
  }

  type Auth {
    token: ID
    user: User
  }

  type Template {
    name: String
    exercises: [Exercise]
  }

  type Query {
    getExercise: [Exercise]
    getUser(_id: ID!): User
    getTemplate(_id: ID!): Template
    getAllUsers: [User]
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    createUser(username: String!, password: String!): Auth
    createTemplate(_id: ID!, name: String!, exercises: ID!): User
    createExercise(name: String!, sets: Int!, reps: Int!): Exercise
  }
`;

module.exports = typeDefs;
