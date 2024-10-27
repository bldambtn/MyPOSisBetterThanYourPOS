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
        firstName
        lastName
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

export const ADD_INVENTORY = gql`
  mutation addInventory(
    $upc: String
    $plu: String!
    $productName: String!
    $weightPerItem: Float
    $salePrice: Float
    $vendorPrice: Float
    $inStock: Int
    $coo: String
    $company: String
  ) {
    addInventory(
      upc: $upc
      plu: $plu
      productName: $productName
      weightPerItem: $weightPerItem
      salePrice: $salePrice
      vendorPrice: $vendorPrice
      inStock: $inStock
      coo: $coo
      company: $company
    ) {
      _id
      productName
      salePrice
      inStock
    }
  }
`;
