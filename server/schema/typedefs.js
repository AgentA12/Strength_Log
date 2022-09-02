const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Exercise {
    _id: ID
    name: String
    pounds: Int
    reps: Int
  }

  type User {
    _id: ID
    createdAt: String
    username: String
    password: String
    templates: [Template]
  }

  type Template {
    name: String
    exercises: [Exercise]
  }

  type Query {
    getExercise: [Exercise]
    getUser: User
    getTemplate: Template
  }

  type Mutation {
    createUser(username: String!, password: String!): User
    createTemplate(name: String!, exercises: ID!): Template
    createExercise(name: String!, pounds: Int!, reps: Int!): Exercise
  }
`;

module.exports = typeDefs;
