import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $username: String!
    $organization: String
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
      }
    }
  }
`;
