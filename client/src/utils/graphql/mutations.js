import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation ($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      token
      user {
        _id
        username
        createdAt
        templates {
          name
          exercises {
            name
            reps
            sets
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
        templates {
          name
        }
      }
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
