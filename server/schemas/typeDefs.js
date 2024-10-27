// schemas/typeDefs.js
const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    hello: String
    user: User
    getInventory: [Inventory]
    SearchProduct(plu: String!): Inventory
    usersInOrganization(organization: String!): [User]
    getSalesReports(
      dateRange: String
      product: String
      category: String
    ): [SalesReport]
  }

  type Inventory {
    _id: ID
    upc: String
    plu: String
    productName: String
    weightPerItem: Float
    salePrice: Float
    vendorPrice: Float
    inStock: Int
    coo: String
    company: String
  }
    

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    username: String!
    organization: String!
    unixId: Int!
    email: String!
  }

  type SalesReport {
    date: String!
    product: String!
    category: String!
    quantitySold: Int!
    totalRevenue: Float!
  }

  type Auth {
    token: String!
    user: User!
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      username: String!
      organization: String!
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

    addInventory(
      upc: String
      plu: String!
      productName: String!
      weightPerItem: Float
      salePrice: Float
      vendorPrice: Float
      inStock: Int
      coo: String
      companyOfOrigin: String
    ): Inventory

    updateInventory(
      id: ID!
      upc: String
      plu: String
      productName: String
      weightPerItem: Float
      salePrice: Float
      vendorPrice: Float
      inStock: Int
      coo: String
      companyOfOrigin: String
    ): Inventory

    deleteInventory(id: ID!): Inventory
  }
`;

module.exports = typeDefs;
