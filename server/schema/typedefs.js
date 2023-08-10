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
    name: String
    equipment: String
  }

  input exerciseInput {
    name: String
  }

  input saveWorkoutExerciseInput {
    exercise: exerciseInput
    weight: Int
    reps: Int
    sets: Int
  }

  input createTemplateExerciseInput {
    name: String
    sets: Int
    reps: Int
    weight: Int
  }

  input editExerciseInput {
    _id: ID
    name: String
    sets: Int
    reps: Int
    weight: Int
    type: String
  }

  type Template {
    _id: ID
    templateName: String
    templateNotes: String
    exercises: [TemplateExercises]
  }

  type TemplateExercises {
    exercise: Exercise
    sets: Int
    reps: Int
    weight: Int
  }

  type Routine {
    _id: ID
    templates: [Template]
  }

  type Progress {
    _id: ID
    templateName: String
    templateId: String
    exercises: [ExerciseProgress]
  }

  type ExerciseProgress {
    exercise: Exercise
    weight: Int
    sets: Int
    reps: Int
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
    getExercises: [Exercise]
    getTemplates(userId: ID!): [Template]
    getTemplateDataForProgressPage(
      templateId: ID
      userId: ID!
      range: String
      metric: String
      exercise: String
    ): [Progress]
    getExerciseProgress(templateID: ID!, userID: ID!): ExerciseProgress
    getTemplateModalProgress(templateId: ID, userId: ID): [ExerciseProgress]
    getProgressTimeStamps(userId: ID!): CalendarDates
    getMostRecentlySavedTemplateData(templateId: ID, userId: ID!): Progress
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    createUser(username: String!, password: String!): Auth
    createTemplate(
      userId: ID!
      templateName: String!
      templateNotes: String
      exercises: [createTemplateExerciseInput!]
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
      exercises: [saveWorkoutExerciseInput!]
    ): User
    deleteAccount(userID: ID!): Confirm
  }
`;

module.exports = typeDefs;
