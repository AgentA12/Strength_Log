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
    getTemplates(userId: $userId) {
      username
      templates {
        _id
        templateName
        exercises {
          _id
          exerciseName
          reps
          sets
          weight
        }
      }
    }
  }
`;
