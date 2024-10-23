import { gql } from '@apollo/client';

export const GET_SALES_REPORTS = gql`
  query getSalesReports($dateRange: String, $product: String, $category: String) {
    getSalesReports(dateRange: $dateRange, product: $product, category: $category) {
      date
      product
      category
      quantitySold
      totalRevenue
    }
  }
`;

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
    product(plu: $plu) {
      id
      productName
      salePrice
    }
  }
`;