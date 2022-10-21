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
    sets: String
    reps: String
    weight: String
  }

  input exerciseInput {
    _id: ID
    exerciseName: String
    sets: String
    reps: String
    weight: String
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
    getTemplatesForUser(userId: ID!): User
    getAllUsers: [User]
    getAllTemplates: [Template]
    getAllExercises: [Exercise]
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    createUser(username: String!, password: String!): Auth
    createTemplate(
      userId: ID!
      templateName: String!
      exercises: [exerciseInput!]
    ): [Template]
    editTemplate(
      _id: ID!
      templateName: String!
      exercises: [exerciseInput!]
    ): Template
    createExercise(name: String!, sets: Int!, reps: Int!): Exercise
    deleteTemplate(templateId: ID!): Template
    saveWorkout(templateId: ID!): Template
  }
`;

module.exports = typeDefs;
