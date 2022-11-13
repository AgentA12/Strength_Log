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
    type: String
  }

  input exerciseInput {
    exerciseName: String
    sets: String
    reps: String
    weight: String
    type: String
  }

  input editExerciseInput {
    _id: ID
    exerciseName: String
    sets: String
    reps: String
    weight: String
    type: String
  }

  type Template {
    _id: ID
    templateName: String
    templateNotes: String
    exercises: [Exercise]
  }

  type Routine {
    _id: ID
    templates: [Template]
  }

  type Progress {
    _id: ID
    template: [Template]
    createdAt: String
    timeToComplete: String
    totalWeight: String
  }

  type isDeleted {
    acknowledged: Boolean
    deleteCount: Int
  }

  type Query {
    getExercise: [Exercise]
    getUserById(_id: ID!): User
    getTemplatesForUser(userId: ID!): [Template]
    getProgress(id: ID!): [Progress]
    getAllUsers: [User]
    getAllTemplates: [Template]
    getAllExercises: [Exercise]
    getTemplateProgressForUser: [Template]
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    createUser(username: String!, password: String!): Auth
    createTemplate(
      userId: ID!
      templateName: String!
      templateNotes: String
      exercises: [exerciseInput!]
    ): [Template]
    editTemplate(
      _id: ID!
      templateName: String!
      templateNotes: String
      exercises: [editExerciseInput!]
    ): Template
    createExercise(name: String!, sets: Int!, reps: Int!): Exercise
    deleteTemplate(templateId: ID!): isDeleted
    saveWorkout(templateId: ID!, userID: ID!): User
  }
`;

module.exports = typeDefs;
