import  { gql } from 'apollo-server';

export default gql`
	type User {
		id: ID!
		name: String!
		email: String!
		password: String!
		recipes: [Recipe]!
	}

	type Token {
		token: String!
	}

	extend type Mutation {
		signUp(input: signUpInput): User
		login(input: loginInput): Token
	}

	input signUpInput {
		name: String!
		email: String!
		password: String!
	}

	input loginInput {
		email: String!
		password: String!
	}
`;
