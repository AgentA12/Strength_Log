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
  query ($_id: ID!) {
    getTemplates(_id: $_id) {
      name
      exercises {
        _id
        name
        reps
        sets
      }
    }
  }
`;
