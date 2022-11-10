import { gql } from "@apollo/client";

export const GET_EXERCISE = gql`
  query {
    getExercise {
      name
      reps
      sets
      _id
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
      }
    }
  }
`;

export const GET_TEMPLATES_PROGRESS = gql`
  query ($userId: ID!) {
    getTemplateProgressForUser(userId: $userId) {
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
