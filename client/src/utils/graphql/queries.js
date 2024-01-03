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
  query ($userID: ID!, $workoutID: ID) {
    getProgressByDate(userID: $userID, workoutID: $workoutID) {
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

export const GET_STAT_SUMMARY = gql`
  query ($userID: ID!) {
    getDataSummary(userID: $userID) {
      label
      stat
    }
  }
`;

export const COMPARE_WORKOUTS = gql`
  query ($userID: ID!, $workoutID: ID!) {
    compareWorkouts(userID: $userID, workoutID: $workoutID) {
      originalTemplate {
        _id
        templateName
        exercises {
          restTime
          exercise {
            _id
            exerciseName
            equipment
            isUserCreated
          }
          sets {
            weight
            reps
          }
        }
      }
      formerWorkout {
        createdAt
        template {
          _id
          belongsTo
          templateName
          templateNotes
        }
        _id
        exercises {
          restTime
          exercise {
            _id
            exerciseName
            equipment
            isUserCreated
          }
          sets {
            weight
            reps
          }
        }
      }
      latterWorkout {
        createdAt
        _id
        template {
          _id
        }
        exercises {
          _id
          restTime
          exercise {
            _id
            exerciseName
            equipment
            isUserCreated
          }
          sets {
            weight
            reps
          }
        }
      }
      hasLatterWorkout
    }
  }
`;

export const GET_ONE_REP_MAX = gql`
  query ($exerciseName: String, $userID: ID!) {
    getOneRepMax(exerciseName: $exerciseName, userID: $userID)
  }
`;
