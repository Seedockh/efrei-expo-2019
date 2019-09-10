import Expo from 'expo-server-sdk';
import Posts from '../../data/models/posts';

let expo = new Expo();

const resolvers = {
  Query: {
    posts: (obj, args, ctx, info) => Posts.findAll(),
    post: (obj, args, ctx, info) => Posts.findByPk(args.id),
  },
  Mutation: {
    createPost: async (obj, args, ctx, info) => {
      const post = new Posts({
        title: args.data.title,
        price: args.data.price,
        image: args.data.image,
      });
      await post.save();
      return post;
    },

    editPost: async (obj, args, ctx, info) => {
      await Posts.update({
        title: args.data.title,
        price: args.data.price,
        image: args.data.image,
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
