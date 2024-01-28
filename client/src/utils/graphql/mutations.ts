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

export const EDIT_TEMPLATE = gql`
  mutation (
    $templateId: ID!
    $templateName: String!
    $templateNotes: String
    $exercises: [createTemplateExerciseInput!]
  ) {
    editTemplate(
      templateId: $templateId
      templateName: $templateName
      templateNotes: $templateNotes
      exercises: $exercises
    ) {
      templateName
    }
  }
`;

export const DELETE_TEMPLATE = gql`
  mutation ($templateId: ID!) {
    deleteTemplate(templateId: $templateId) {
      confirm
    }
  }
`;

export const SAVE_WORKOUT = gql`
  mutation (
    $templateId: ID!
    $userID: ID!
    $exercises: [saveWorkoutExerciseInput!]
  ) {
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
