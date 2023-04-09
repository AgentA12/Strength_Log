import { gql } from "@apollo/client";

export const GET_TEMPLATE_BY_ID = gql`
  query ($id: ID!) {
    getTemplateById(id: $id) {
      _id
      templateName
      templateNotes
      exercises {
        _id
        exerciseName
        reps
        sets
        weight
      }
    }
  }
`;

export const GET_TEMPLATES = gql`
  query ($userId: ID!) {
    getTemplatesForUser(userId: $userId) {
      _id
      templateName
      templateNotes
      exercises {
        _id
        exerciseName
        reps
        sets
        weight
        type
      }
    }
  }
`;

export const GET_TEMPLATES_PROGRESS = gql`
  query ($templateName: String!, $userID: ID!) {
    getProgress(templateName: $templateName, userID: $userID) {
      _id
      templateName
      templateId
      exercises {
        _id
        exerciseName
        reps
        sets
        weight
        type
      }
      timeToComplete
      dateCompleted
      totalWeight
    }
  }
`;

export const GET_TEMPLATE_CHART_DATA = gql`
  query ($templateName: String!, $userId: ID!) {
    getChartData(templateName: $templateName, userId: $userId) {
      labels
      totalWeights
    }
  }
`;

export const GET_EXERCISE_PROGRESS = gql`
  query ($templateID: ID!, $userID: ID!) {
    getExerciseProgress(templateID: $templateID, userID: $userID) {
      labels
      dataSets {
        label
        data
      }
    }
  }
`;

export const GET_SUMMARY = gql`
  query ($templateId: ID!, $userId: ID!, $progressId: ID!) {
    getSummary(
      templateId: $templateId
      userId: $userId
      progressId: $progressId
    ) {
      _id
      templateName
      templateId
      exercises {
        _id
        exerciseName
        sets
        reps
        weight
        type
        dif
      }
      timeToComplete
      totalWeight
      dateCompleted
    }
  }
`;
