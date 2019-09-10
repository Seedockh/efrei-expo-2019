import Expo from 'expo-server-sdk';
import Users from '../../data/models/users';
import Posts from '../../data/models/posts';
import Categories from '../../data/models/categories';

let expo = new Expo();

const resolvers = {
  Query: {
    posts: (obj, args, ctx, info) => Posts.findAll(),
    post: async (obj, args, ctx, info) => {
      const post = await Posts.findByPk(args.id);
      post.user = await Users.findByPk(post.UserId);
      post.category = await Categories.findByPk(post.CategoryId)
      return post;
    },
    postsByCategory: (obj, args, ctx, info) => Posts.findAll({
      where: {
        CategoryId: args.CategoryId
      }
    })
  },
  Mutation: {
    createPost: async (obj, args, ctx, info) => {
      const post = new Posts({
        title: args.data.title,
        price: args.data.price,
        image: args.data.image,
        CategoryId: args.data.CategoryId,
        UserId: args.data.UserId,
      });
      await post.save();
      return post;
    },

    editPost: async (obj, args, ctx, info) => {
      await Posts.update({
        title: args.data.title,
        price: args.data.price,
        image: args.data.image,
        CategoryId: args.data.CategoryId,
      }, {
        where: { id: args.id },
      });
      return Posts.findByPk(args.id);
    },

    deletePost:  async (obj, args, ctx, info) => {
      await Posts.destroy({ where: { id: args.id } })
      return {
        success: "Post deleted successfully !",
        error: null,
      };
    }
  }
}

export default resolvers
