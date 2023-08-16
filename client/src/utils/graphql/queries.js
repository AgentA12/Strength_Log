import { gql } from "@apollo/client";

export const GET_TEMPLATE_BY_ID = gql`
  query ($id: ID!) {
    getTemplateById(id: $id) {
      _id
      templateName
      templateNotes
      exercises {
        _id
        name
        reps
        sets
        weight
      }
    }
  }
`;

export const GET_TEMPLATES = gql`
  query ($userId: ID!) {
    getTemplates(userId: $userId) {
      _id
      templateName
      templateNotes
      exercises {
        exerciseName
        sets
        reps
        weight
      }
    }
  }
`;

export const GET_MOST_RECENT_SAVED_TEMPLATE = gql`
  query ($templateId: ID!, $userId: ID!) {
    getMostRecentlySavedTemplateData(templateId: $templateId, userId: $userId) {
      _id
      templateName
      exercises {
        exercise {
          name
        }
        _id
        reps
        sets
        weight
      }
    }
  }
`;

export const GET_CHART_PROGRESS_BY_TEMPLATE = gql`
  query (
    $templateName: String
    $userId: ID!
    $range: String
    $metric: String
    $exercise: String
  ) {
    getChartDataForTemplates(
      templateName: $templateName
      userId: $userId
      range: $range
      metric: $metric
      exercise: $exercise
    ) {
      belongsTo
      label
      data {
        x
        y
      }
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

export const GET_CALENDAR_DATA = gql`
  query ($userId: ID!) {
    getProgressTimeStamps(userId: $userId) {
      dates {
        date
        templateId
      }
    }
  }
`;

export const GET_EXERCISES = gql`
  query {
    getExercises {
      name
    }
  }
`;
