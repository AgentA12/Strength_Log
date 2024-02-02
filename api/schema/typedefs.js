import { gql } from "apollo-server-express";

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

  input exerciseInput {
    exerciseName: String
    _id: ID
    equipment: String
  }

  input Set {
    weight: Int
    reps: Int
    _id: ID
  }

  type SetType {
    weight: Int
    reps: Int
    _id: ID
  }

  input saveWorkoutExerciseInput {
    exercise: exerciseInput
    restTime: Int
    sets: [Set]
  }

  input createTemplateExerciseInput {
    exerciseName: String
    restTime: Int
    _id: ID
    sets: [Set]
  }

  type ExerciseType {
    _id: ID
    exerciseName: String
    equipment: String
    isUserCreated: Boolean
  }

  type Template {
    _id: ID
    belongsTo: ID
    templateName: String
    templateNotes: String
    exercises: [Exercise]
  }

  type Exercise {
    _id: ID
    exercise: ExerciseType
    restTime: Int
    sets: [SetType]
    savedOn: String
    belongsTo: Template
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

  type Confirm {
    confirm: Boolean
  }

  type ExerciseProgress {
    dataSets: [DataSet]
    labels: [String]
  }

  type CalendarDates {
    createdAt: String
    _id: ID
    template: Template
  }

  type Exercises {
    _id: ID
    exerciseName: String
    equipment: String
    isUserCreated: String
  }

  type CompletedWorkout {
    createdAt: String
    template: Template
    _id: ID
    exercises: [Exercise]
  }

  type TotalData {
    label: String
    stat: Int
  }

  type WorkoutComparison {
    formerWorkout: CompletedWorkout
    latterWorkout: CompletedWorkout
    originalTemplate: Template
    hasLatterWorkout: Boolean
  }

  type Query {
    getAllExercises: [Exercises]
    getTemplates(userId: ID!): [Template]
    getChartData(
      templateName: String
      userId: ID!
      range: String
      metric: String
      exercise: String
      shouldSortByTemplate: Boolean
    ): [TemplateChartData]
    calendarTimeStamps(userId: ID!, templateName: String): [CalendarDates]
    getProgressByDate(userID: ID!, workoutID: ID): [CompletedWorkout]
    getPreviousWorkout(userID: ID!, templateID: ID!): Template
    getDataSummary(userID: ID!): [TotalData]
    getUserSettings(userID: ID!): User
    compareWorkouts(userID: ID!, workoutID: ID!): WorkoutComparison
    getOneRepMax(exerciseName: String, userID: ID!): Int
    isCorrectPass(userID: ID!, password: String): Boolean
    getAllCompletedExercises(userID: ID!): [Exercise]
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
      templateId: ID!
      templateName: String!
      templateNotes: String
      exercises: [createTemplateExerciseInput!]
    ): Template
    deleteTemplate(templateId: ID!): Confirm
    saveWorkout(
      templateId: ID!
      userID: ID!
      exercises: [saveWorkoutExerciseInput!]
    ): User
    deleteAccount(userID: ID!): Confirm
    changeUsername(userID: ID!, username: String!): Confirm
    updatePassword(userID: ID!, password: String!): Boolean
  }
`;

export { typeDefs };
