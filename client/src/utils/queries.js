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

export const QUERY_INVENTORY = gql`
  query getInventory {
    inventory {
      _id
      upc
      plu
      productName
      inStock
      salePrice
      vendorPrice
      companyOfOrigin
    }
  }
`;

export const SEARCH_PRODUCT_QUERY = gql`
  query SearchProduct($plu: String!) {
    product(plu: $plu) {
      _id
      productName
      salePrice
      vendorPrice
      inStock
    }
  }
`;
