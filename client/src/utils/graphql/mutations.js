import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation ($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password) {
      _id
      name
    }
  }
`;

export const LOGIN_USER = gql`
  mutation ($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      _id
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
