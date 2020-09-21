import { gql } from "apollo-server";

export default gql`
  extend type Query {
    getCategories: [Category]!
    getOneCategory(categoryId: ID!): Category
  }

  type Category {
    id: ID!
    name: String!
  }

  extend type Mutation {
    createCategory(name: String!): Category
    updateCategory(categoryId: ID!, name: String!): Category
    deleteCategory(categoryId: ID!): String
  }
`;
