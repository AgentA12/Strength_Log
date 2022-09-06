import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation ($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation ($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_TEMPLATE = gql`
  mutation (
    $_id: ID!
    $templateName: String!
    $exerciseName: String
    $reps: Int
    $sets: Int
  ) {
    createTemplate(
      _id: $_id
      templateName: $templateName
      exerciseName: $exerciseName
      reps: $reps
      sets: $sets
    ) {
      username
    }
  }
`;

export const ADD_EXERCISE = gql`
  mutation ($name: String!, $reps: Int!, $sets: Int!) {
    createExercise(name: $name, reps: $reps, sets: $sets) {
      _id
      name
      reps
      sets
    }
  }
`;
