const { gql } = require("apollo-server-express");

const typeDefs = gql`
  enum ResponseStatus {
    SUCCESS
    FAILURE
  }

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

  input exerciseInput {
    name: String
    _id: ID
  }

  input saveWorkoutExerciseInput {
    exerciseName: String
    weight: Int
    reps: Int
    sets: Int
  }

  input createTemplateExerciseInput {
    exerciseName: String
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
    belongsTo: ID
    templateName: String
    templateNotes: String
    exercises: [Exercise]
  }

  type Exercise {
    exerciseName: String
    sets: Int
    reps: Int
    weight: Int
    isBodyWeight: Boolean
  }

  type Routine {
    _id: ID
    templates: [Template]
  }

  type ChartData {
    x: String
    y: Int
  }

  type DataSet {
    belongsTo: String
    label: String
    data: [ChartData]
  }

  type TemplateChartData {
    belongsTo: String
    label: String
    data: [ChartData]
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
    getChartDataForTemplates(
      templateName: String
      userId: ID!
      range: String
      metric: String
      exercise: String
    ): [TemplateChartData]
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
    ): Template
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
