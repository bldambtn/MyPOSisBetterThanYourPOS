const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    hello: String
    getItems: [Item]
    user: User # 'user' query
  }

  type Item {
    id: ID!
    name: String!
    quantity: Int!
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
    ): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
