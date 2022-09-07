const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Auth {
    token: ID
    user: User
  }

  type User {
    _id: ID
    password: String
    username: String
    createdAt: String
    templates: [Template]
  }

  type Exercise {
    _id: ID
    exerciseName: String
    sets: Int
    reps: Int
    weight: Int
  }

  type Template {
    _id: ID
    templateName: String
    exercises: [Exercise]
  }

  type Routine {
    _id: ID
    templates: [Template]
  }

  type Query {
    getExercise: [Exercise]
    getUserById(_id: ID!): User
    getTemplates(userId: ID!): User
    getAllUsers: [User]
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    createUser(username: String!, password: String!): Auth
    createTemplate(
      userId: ID!
      templateName: String!
      exerciseName: String
      reps: Int
      sets: Int
      weight: Int
    ): Template
    createExercise(name: String!, sets: Int!, reps: Int!): Exercise
  }
`;

module.exports = typeDefs;
