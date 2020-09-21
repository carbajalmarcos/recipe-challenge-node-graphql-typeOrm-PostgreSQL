
import { Recipe } from '../../entity/Recipe';
import { User } from '../../entity/User';
import { Category } from '../../entity/Category';
import { getRepository, getManager ,getConnection} from 'typeorm';
import { AuthenticationError } from "apollo-server";

export default {
  Query: {
    getRecipes: async (_: any, __: any, { id }: { id: number }) => {
      try {
        if (!id) {
          throw new AuthenticationError("User not authenticated.");
        } else {
          const recipeRepository = getRepository(Recipe);
          const recipes = await recipeRepository.find({
            relations: ["category", "user"],
          });
          return recipes;
        }
      } catch (error) {
        throw error;
      }
    },
    getOneRecipe: async (
      _: any,
      { recipeId }: { recipeId: number },
      { id }: { id: number }
    ) => {
      try {
        if (!id) {
          throw new AuthenticationError("User not authenticated.");
        } else {
          const recipe = await getRepository(Recipe).findOne(recipeId, {
            relations: ["category", "user"],
          });
          return recipe;
        }
      } catch (error) {
        throw error;
      }
    },
    getMyRecipes: async (_: any, __: any, { id }: { id: number }) => {
      try {
        if (!id) {
          throw new AuthenticationError("User not not authenticated.");
        } else {
          const recipeRepository =  getRepository(Recipe);
          const recipes = await recipeRepository.find({
            where: { user: id },
            relations: ["category", "user"],
          });
          return recipes;
        }
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    createRecipe: async (
      _: any,
      {
        input,
      }: {
        input: {
          name: string;
          description: string;
          ingredients: string;
          category: number;
        };
      },
      { id }: { id: number }
    ) => {
      try {
        if (!id) {
          throw new AuthenticationError("User not not authenticated.");
        } else {
          const recipe = new Recipe();
          recipe.name = input.name;
          recipe.ingredients = input.ingredients;
          recipe.description = input.description;

          const categoryFound = (await getRepository(Category).findOne(
            input.category
          )) as Category;
          const userFound = (await getRepository(User).findOne(id)) as User;

          if (!categoryFound) throw new Error("Category not found");

          recipe.category = categoryFound;
          recipe.user = userFound;
          const savedRecipe = await getManager().save(recipe);
          return savedRecipe;
        }
      } catch (error) {
        throw error;
      }
    },

    updateRecipe: async (
      _: any,
      {
        recipeId,
        input,
      }: {
        recipeId: number;
        input: {
          name: string;
          description: string;
          ingredients: string;
          category: Category;
        };
      },
      { id }: { id: number }
    ) => {
      try {
        if (!id) {
          throw new AuthenticationError("User not authenticated.");
        } else {
          const recipeRepository = getRepository(Recipe);
          const recipe = recipeRepository.findOne(recipeId);
          if (!recipe) throw new Error("recipe not found");
          const recipeToUpdate = { ...recipe, ...input };
          const category = (await getRepository(Category).findOne(
            input.category
          )) as Category;
          if (!category) throw new Error("Category not found");
          recipeToUpdate.category = category;
          recipeRepository.save(recipeToUpdate);
          return recipeToUpdate;
        }
      } catch (error) {
        throw error;
      }
    },
    deleteRecipe: async (
      _: any,
      { recipeId }: { recipeId: number },
      { id }: { id: number }
    ) => {
      try {
        if (!id) {
          throw new AuthenticationError("User not authenticated.");
        } else {
          const recipe = await getRepository(Recipe).findOne(recipeId, {
            relations: ["category", "user"],
          });
          if (!recipe)
            throw new Error("Recipe not found.");
          const user = recipe.user;
          if (user.id != id)
            throw new Error(`Denegate access`);
          await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Recipe)
            .where("id = :id", { id: recipeId })
            .execute();
          return true;
        }
      } catch (error) {
        throw error;
      }
    },
  },
};
