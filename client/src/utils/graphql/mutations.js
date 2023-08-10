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
            name
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
    $templateNotes: String
    $exercises: [createTemplateExerciseInput!]
  ) {
    createTemplate(
      userId: $userId
      templateName: $templateName
      templateNotes: $templateNotes
      exercises: $exercises
    ) {
      templateName
    }
  }
`;

export const ADD_EXERCISE = gql`
  mutation (
    $templateName: String!
    $reps: Int!
    $sets: Int!
    $type: String
    $userId: ID!
  ) {
    createExercise(
      templateName: $templateName
      reps: $reps
      sets: $sets
      type: $type
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
      acknowledged
      deleteCount
      templateName
    }
  }
`;

export const EDIT_TEMPLATE = gql`
  mutation (
    $_id: ID!
    $templateName: String!
    $templateNotes: String
    $exercises: [editExerciseInput!]
  ) {
    editTemplate(
      _id: $_id
      templateName: $templateName
      templateNotes: $templateNotes
      exercises: $exercises
    ) {
      templateName
      templateNotes
      _id
      exercises {
        _id
        name
        sets
        reps
        weight
      }
    }
  }
`;

export const SAVE_WORKOUT = gql`
  mutation ($templateId: ID!, $userID: ID!, $exercises: [saveWorkoutExerciseInput!]) {
    saveWorkout(
      templateId: $templateId
      userID: $userID
      exercises: $exercises
    ) {
      username
    }
  }
`;

export const DELETE_ACCOUNT = gql`
  mutation ($userID: ID!) {
    deleteAccount(userID: $userID) {
      confirm
    }
  }
`;
