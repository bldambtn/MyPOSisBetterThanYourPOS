// client/src/utils/queries.js

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

// New query for inventory
export const QUERY_INVENTORY = gql`
  query getInventory {
    inventory {
      _id
      upc
      productName
      inStock
      salePrice
    }
  }
`;

// POS search for item
export const SEARCH_PRODUCT_QUERY = gql`
  query SearchProduct($plu: String!) {
    inventory(plu: $plu) {
      id
      productName
      salePrice
    }
  }
`;