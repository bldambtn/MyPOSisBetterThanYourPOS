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
