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
    $exercises: [exerciseInput!]
  ) {
    createTemplate(
      userId: $userId
      templateName: $templateName
      exercises: $exercises
    ) {
      templateName
      _id
      exercises {
        exerciseName
        reps
        sets
        weight
      }
    }
  }
`;

export const ADD_EXERCISE = gql`
  mutation ($templateName: String!, $reps: Int!, $sets: Int!, $userId: ID!) {
    createExercise(
      templateName: $templateName
      reps: $reps
      sets: $sets
      userId: $userId
    ) {
      _id
      name
      reps
      sets
    }
  }
`;

export const DELETE_TEMPLATE = gql`
  mutation ($templateId: ID!) {
    deleteTemplate(templateId: $templateId) {
      templateName
    }
  }
`;

export const EDIT_TEMPLATE = gql`
  mutation ($_id: ID!, $templateName: String!, $exercises: [exerciseInput!]) {
    editTemplate(
      _id: $_id
      templateName: $templateName
      exercises: $exercises
    ) {
      templateName
      _id
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
