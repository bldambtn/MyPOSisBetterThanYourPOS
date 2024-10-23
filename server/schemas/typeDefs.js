const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    hello: String
    user: User
    getInventories: [Inventory] # Query to fetch all inventories
    getInventory(id: ID!): Inventory # Query to fetch a specific inventory by ID
    SearchProduct(plu: String!): Inventory # Query to search product by PLU
    getSalesReports(dateRange: String, product: String, category: String): [SalesReport]
  }


  type Inventory {
    _id: ID!
    upc: String
    plu: String!
    productName: String!
    weightPerItem: Float
    salePrice: Float
    vendorPrice: Float
    inStock: Int
    coo: String
    companyOfOrigin: String
    company: Company
  }

  type Company {
    _id: ID!
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
   
    addInventory(
      upc: String
      plu: String!
      productName: String!
      weightPerItem: Float
      salePrice: Float
      vendorPrice: Float
      inStock: Int
      coo: String
      
    updateInventory(
      companyOfOrigin: String  # Updated field to match your schema
      company: ID!
    ): Inventory  

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
