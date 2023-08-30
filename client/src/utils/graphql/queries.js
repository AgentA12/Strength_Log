import { gql } from "@apollo/client";

export const GET_TEMPLATES = gql`
  query ($userId: ID!) {
    getTemplates(userId: $userId) {
      _id
      templateName
      templateNotes
      exercises {
        exercise {
          exerciseName
          _id
          equipment
        }
        sets {
          weight
          reps
        }
      }
    }
  }
`;

export const GET_ALL_EXERCISES = gql`
  query {
    getAllExercises {
      _id
      exerciseName
      equipment
      isUserCreated
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

export const GET_PROGRESS_BY_DATE = gql`
  query ($userID: ID!) {
    getProgressByDate(userID: $userID) {
      createdAt
      template {
        templateName
      }
      exercises {
        exercise {
          exerciseName
        }
        sets {
          weight
          reps
        }
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
