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
    type: String
    dif: Int
  }

  input exerciseInput {
    _id: ID
    exerciseName: String
    sets: Int
    reps: Int
    weight: Int
    type: String
  }

  input editExerciseInput {
    _id: ID
    exerciseName: String
    sets: Int
    reps: Int
    weight: Int
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
    templateName: String
    templateId: String
    exercises: [Exercise]
    timeToComplete: String
    totalWeight: Int
    dateCompleted: String
  }

  type isDeleted {
    acknowledged: Boolean
    deleteCount: Int
    templateName: String
  }

  type Confirm {
    confirm: Boolean
  }

  type Chart {
    labels: [String]
    totalWeights: [Int]
  }

  type ExerciseProgress {
    dataSets: [DataSet]
    labels: [String]
  }

  type DataSet {
    label: String
    data: [Int]
  }

  type dateType {
    date: String
    templateId: ID
  }

  type CalendarDates {
    dates: [dateType]
  }

  type RecentCarousel {
    templateName: String
    dateCompleted: String
    date: String
    totalVolume: Int
    diff: Int
    prs: [PersonalRecords]
  }

  type PersonalRecords {
    sets: Int
    weight: Int
    reps: Int
  }

  type Query {
    getTemplates(userId: ID!, offset: Int, limit: Int): [Template]
    getTemplateDataForProgressPage(
      templateId: ID
      userId: ID!
      range: String
      metric: String
      exercise: String
    ): [Progress]
    getExerciseProgress(templateID: ID!, userID: ID!): ExerciseProgress
    getTemplateModalProgress(templateId: ID, userId: ID): [ExerciseProgress]
    getSummary(templateId: ID!, userId: ID!, progressId: ID!): [Progress]
    getProgressTimeStamps(userId: ID!): CalendarDates
    getMostRecentlySavedTemplateData(templateId: ID, userId: ID!): ModalProgress
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
    saveWorkout(
      templateId: ID!
      userID: ID!
      exerciseInput: [exerciseInput!]
    ): User
    deleteAccount(userID: ID!): Confirm
  }
`;

module.exports = typeDefs;
