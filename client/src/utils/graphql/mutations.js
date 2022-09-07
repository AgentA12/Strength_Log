import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation ($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      token
      user {
        _id
        username
        password
        createdAt
        templates {
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
    $userId: ID!
    $templateName: String!
    $exerciseName: String
    $reps: Int
    $sets: Int
    $weight: Int
  ) {
    createTemplate(
      userId: $userId
      templateName: $templateName
      exerciseName: $exerciseName
      reps: $reps
      sets: $sets
      weight: $weight
    ) {
      _id
      templateName
      exercises {
        _id
        exerciseName
        sets
        reps
        weight
      }
    }
  }
`;

export const ADD_EXERCISE = gql`
  mutation ($templateName: String!, $reps: Int!, $sets: Int! $userId: ID!) {
    createExercise(templateName: $templateName, reps: $reps, sets: $sets userId: $userId) {
      _id
      name
      reps
      sets
    }
  }
`;
