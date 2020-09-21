
import { Recipe } from '../../entity/Recipe';
import { Category } from '../../entity/Category';
import { getRepository, getConnection , getManager} from 'typeorm';
import { AuthenticationError } from "apollo-server";

export default {
  Query: {
    getCategories: async (_: any, __: any, { id }: { id: number }) => {
      try {
        if (!id) {
          throw new AuthenticationError("User not authenticated.");
        } else {
          const categoryRepository = getRepository(Category);
          const categories = await categoryRepository.find();
          return categories;
        }
      } catch (error) {
        throw error;
      }
    },

    getOneCategory: async (
      _: any,
      { categoryId }: { categoryId: number },
      { id }: { id: number }
    ) => {
      try {
        if (!id) {
          throw new AuthenticationError("User not authenticated.");
        } else {
          const category = await getRepository(Category).findOne(categoryId);
          return category;
        }
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    createCategory: async (
      _: any,
      { name }: { name: string },
      { id }: { id: number }
    ) => {
      try {
        if (!id) {
          throw new AuthenticationError("User not authenticated.");
        } else {
          const categoryRepository = getRepository(Category);
          let category = await categoryRepository.findOne({
            where: { name },
          });
          if (category) throw new Error("This category was already created.");
          category = new Category();
          category.name = name;
          return getManager().save(category);
        }
      } catch (error) {
        throw error;
      }
    },

    updateCategory: async (
      _: any,
      { categoryId, name }: { categoryId: number; name: string },
      { id }: { id: number }
    ) => {
      try {
        if (!id) {
          throw new AuthenticationError("User not authenticated.");
        } else {
          const categoryRepository = getRepository(Category);
          const category = await categoryRepository.findOne(categoryId);
          if (!category) throw new Error("category not found");
          const categoryToUpdate = { ...category, name };
          await categoryRepository.save(categoryToUpdate);
          return categoryToUpdate;
        }
      } catch (error) {
        throw error;
      }
    },

    deleteCategory: async (
      _: any,
      { categoryId }: { categoryId: number },
      { id }: { id: number }
    ) => {
      try {
        if (!id) {
          throw new AuthenticationError("User not authenticated.");
        } else {
          const category = await getRepository(Category).findOne(categoryId);
          const recipe = await getRepository(Recipe).findOne({
            where: { category : categoryId },
          });
          if (!category) throw new Error("Category not found.");
          if (recipe)
            throw new Error("The category is being used by a recipe.");
          await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Category)
            .where("id = :id", { id: categoryId })
            .execute();
          return true;
        }
      } catch (error) {
        throw error;
      }
    },
  },
};
