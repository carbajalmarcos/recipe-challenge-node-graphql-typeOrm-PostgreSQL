import { User } from '../../entity/User';
import { getRepository, getManager } from "typeorm";
import * as bcrypt from "bcryptjs";
import { AuthenticationError } from "apollo-server";
import { getToken } from "../../utils/authUtils";

export default {
  Mutation: {
    signUp: async (
      _: any,
      { input }: { input: { name: string; email: string; password: string } }
    ) => {
      try {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne({
          where: { email: input.email },
        });

        if (user) throw new Error("Email is already in use.");

        if (!input.password) throw new Error("Missing password.");

        const newUser = new User();

        newUser.name = input.name;
        newUser.email = input.email;
        newUser.password = await bcrypt.hash(input.password, 10);
        const savedUser = await getManager().save(newUser);
        return savedUser as User;
      } catch (error) {
        throw error;
      }
    },

    login: async (
      _: any,
      { input }: { input: { email: string; password: string } }
    ) => {
      try {
        const user = await getRepository(User).findOne({
          where: { email: input.email },
        });

        if (!user) throw new AuthenticationError("User not found.");

        const match = bcrypt.compare(input.password, user.password);
        if (!match) throw new AuthenticationError("Incorrect password.");
        const token = getToken(user.id);
        return { token };
      } catch (error) {
        throw error;
      }
    },
  },
};
