const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    hello: String
    getItems: [Item]
    user: User
    getItem(id: ID!): Item
    getSalesReports(dateRange: String, product: String, category: String): [SalesReport]
  }

  type Item {
    id: ID!
    upc: String
    plu: String!
    productName: String!
    weightPerItem: Float
    salePrice: Float
    vendorPrice: Float
    inStock: Int
    coo: String!
    company: Company!
  }

  type Company {
    id: ID!
    name: String!
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    username: String
    organization: String
    email: String
  }

  type SalesReport {
    date: String
    product: String
    category: String
    quantitySold: Int
    totalRevenue: Float
  }

  type Auth {
    token: ID
    user: User
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      username: String!
      organization: String
      email: String!
      password: String!
    ): Auth
    updateUser(
      firstName: String
      lastName: String
      username: String
      organization: String
      email: String
      password: String
    ): User
    login(email: String!, password: String!): Auth
    
    addItem(
      upc: String
      plu: String!
      productName: String!
      weightPerItem: Float
      salePrice: Float
      vendorPrice: Float
      inStock: Int
      coo: String!
      company: ID!
    ): Item

    updateItem(
      id: ID!
      upc: String
      plu: String
      productName: String
      weightPerItem: Float
      salePrice: Float
      vendorPrice: Float
      inStock: Int
      coo: String
    ): Item

    deleteItem(id: ID!): Item
  }
`;

module.exports = typeDefs;
