import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $username: String!
    $organization: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      username: $username
      organization: $organization
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        unixId
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        email
        unixId
        organization
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($from: ID!, $to: ID!, $text: String!) {
    sendMessage(from: $from, to: $to, text: $text) {
      _id
      from {
        _id
      }
      to {
        _id
      }
      text
      timestamp
      isDelivered
    }
  }
`;