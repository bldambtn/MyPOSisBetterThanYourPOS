import { gql } from '@apollo/client';

// Query for getting sales reports
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

// Query for fetching the current user
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

// Query for fetching all inventories
export const QUERY_INVENTORIES = gql`
  query getInventories {
    getInventories {
      _id
      upc
      productName
      inStock
      salePrice
    }
  }
`;

// Query for searching a product by PLU
export const SEARCH_PRODUCT_QUERY = gql`
  query SearchProduct($plu: String!) {
    SearchProduct(plu: $plu) {
      _id
      productName
      salePrice
    }
  }
`;
