import Expo from 'expo-server-sdk';
import Categories from '../../data/models/categories';

let expo = new Expo();

const resolvers = {
  Query: {
    categories: (obj, args, ctx, info) => Categories.findAll(),
    category: (obj, args, ctx, info) => Categories.findByPk(args.id),
  },
  Mutation: {
    createCategory: async (obj, args, ctx, info) => {
      const category = new Categories({
        name: args.data.name,
      });
      await category.save();
      return category;
    },

    editCategory: async (obj, args, ctx, info) => {
      await Categories.update({
        name: args.data.name,
      }, {
        where: { id: args.id },
      });
      return Categories.findByPk(args.id);
    },

    deleteCategory:  async (obj, args, ctx, info) => {
      await Category.destroy({ where: { id: args.id } })
      return {
        success: "Category deleted successfully !",
        error: null,
      };
    }
  }
}

export default resolvers
