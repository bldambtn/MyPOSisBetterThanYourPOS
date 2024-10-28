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
    $salePrice: Float
    $inStock: Int
  ) {
    addInventory(
      upc: $upc
      plu: $plu
      productName: $productName
      salePrice: $salePrice
      inStock: $inStock
    ) {
      _id
      productName
      salePrice
      inStock
      upc
      plu
    }
  }
`;

export const UPDATE_INVENTORY = gql`
  mutation updateInventory(
    $id: ID
    $upc: String
    $plu: String
    $productName: String
    $salePrice: Float
    $inStock: Int
  ) {
    updateInventory(
      id: $id
      upc: $upc
      plu: $plu
      productName: $productName
      salePrice: $salePrice
      inStock: $inStock
    ) {
      _id
      productName
      salePrice
      inStock
      upc
      plu
    }
  }
`;

export const DELETE_INVENTORY = gql`
  mutation deleteInventory($id: ID!) {
    deleteInventory(id: $id) {
      _id
    }
  }
`;
