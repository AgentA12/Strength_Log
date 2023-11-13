import { gql } from "@apollo/client";

export const GET_TEMPLATES = gql`
  query ($userId: ID!) {
    getTemplates(userId: $userId) {
      _id
      templateName
      templateNotes
      exercises {
        restTime
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

export const GET_EXERCISES = gql`
  query {
    getAllExercises {
      _id
      exerciseName
      equipment
      isUserCreated
    }
  }
`;

export const GET_CHART_PROGRESS = gql`
  query (
    $templateName: String
    $userId: ID!
    $range: String
    $metric: String
    $exercise: String
    $shouldSortByTemplate: Boolean
  ) {
    getChartData(
      templateName: $templateName
      userId: $userId
      range: $range
      metric: $metric
      exercise: $exercise
      shouldSortByTemplate: $shouldSortByTemplate
    ) {
      belongsTo
      label
      data {
        x
        y
      }
      findFirstAndLastDate
    }
  }
`;

export const GET_TEMPLATE_PROGRESS = gql`
  query ($userID: ID!, $templateID: ID!) {
    getTemplateProgress(userID: $userID, templateID: $templateID) {
      timeToComplete
      template {
        _id
        templateName
        templateNotes
        exercises {
          exercise {
            exerciseName
          }
          restTime
          sets {
            weight
            reps
          }
        }
      }
      createdAt
    }
  }
`;

export const GET_PROGRESS_BY_DATE = gql`
  query ($userID: ID!) {
    getProgressByDate(userID: $userID) {
      createdAt
      _id
      template {
        templateName
        _id
      }
      exercises {
        exercise {
          _id
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

export const CALENDAR_TIMESTAMPS = gql`
  query ($userId: ID!) {
    calendarTimeStamps(userId: $userId) {
      _id
      createdAt
    }
  }
`;
