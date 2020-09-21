import { gql } from 'apollo-server';

import UserSchema from './user'
import RecipeSchema from './recipe';
import CategorySchema from "./category";

export default [
  gql`
    type Query {
      _: String
    }
    type Mutation {
      _: String
    }
  `,
  UserSchema,
  RecipeSchema,
  CategorySchema,
];
