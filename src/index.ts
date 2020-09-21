import "reflect-metadata";
import {createConnection} from "typeorm";
import { ApolloServer } from "apollo-server";
import resolvers from './graphql/resolvers/index'
import typeDefs from "./graphql/schemas/index";
import { getUserId } from "./utils/authUtils";
require("dotenv").config();
(async () => {
  try {
    createConnection()
      .then(() => {
        console.log("DB connection successfully!");
      })
      .catch((error) => console.log(error));

    new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }: { req: { headers: { authorization: string } } }) => {
        const contextObj: { id?: number } = {};
        if (req.headers.authorization) {
          contextObj.id = getUserId(req);
        }
        return contextObj;
      },
      formatError: (error: Error) => {
        return {
          message: error.message,
        };
      },
      introspection: true,
      playground: true,
    })
      .listen({ port: process.env.PORT || 4000 }) //reading port and host from .env
      .then(({ url }: { url: string }) => {
        console.log(`Server ready at ${url}`);
      });
  } catch (error) {
    console.log(error.message);
  }
})();
