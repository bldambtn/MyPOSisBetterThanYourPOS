const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    hello: String
    getInventory: [Inventory] 
    user: User
    getInventoryItem(id: ID!): Inventory 
    getSalesReports(dateRange: String, product: String, category: String): [SalesReport]
  }

  type Inventory { 
    id: ID!
    upc: String
    plu: String!
    productName: String!
    weightPerItem: Float
    salePrice: Float
    vendorPrice: Float
    inStock: Int
    coo: String
    companyOfOrigin: String  # Updated field to match your schema
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

    addInventoryItem( 
      upc: String
      plu: String!
      productName: String!
      weightPerItem: Float
      salePrice: Float
      vendorPrice: Float
      inStock: Int
      coo: String
      companyOfOrigin: String  # Updated field to match your schema
      company: ID!
    ): Inventory  

    updateInventoryItem( 
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

    deleteInventoryItem(id: ID!): Inventory 
  }
`;

module.exports = typeDefs;
