const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    hello: String
    getItems: [Item]
    user: User # 'user' query
     getInventories: [Inventory] # Query to fetch all inventories
    getInventory(id: ID!): Inventory # Query to fetch a specific inventory by ID
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

    type Inventory {
    _id: ID
    upc: String
    plu: String!
    productName: String!
    weightPerItem: Float
    salePrice: Float
    vendorPrice: Float
    inStock: Int
    coo: String
    companyOfOrigin: String
    company: User
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
    addInventory(
      upc: String
      plu: String!
      productName: String!
      weightPerItem: Float
      salePrice: Float
      vendorPrice: Float
      inStock: Int
      coo: String!
      company: ID!
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
