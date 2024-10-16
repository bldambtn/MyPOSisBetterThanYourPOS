const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    hello: String
    getItems: [Item]
  }

  type Item {
    id: ID!
    name: String!
    quantity: Int!
  }
`;

module.exports = typeDefs;