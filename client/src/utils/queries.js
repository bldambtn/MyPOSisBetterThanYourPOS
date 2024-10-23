import { gql } from '@apollo/client';

// Existing query for user
export const QUERY_USER = gql`
  {
    user {
      _id
      firstName
      lastName
      username
      organization
      email
    }
  }
`;


export const QUERY_ITEMS = gql`
  query getItems {
    items {
      id
      upc
      productName
      inStock
      salePrice
    }
  }
`;


export const SEARCH_PRODUCT_QUERY = gql`
  query SearchProduct($plu: String!) {
    inventory(plu: $plu) {
      id
      productName
      salePrice
    }
  }
`;
