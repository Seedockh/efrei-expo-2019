import Expo from 'expo-server-sdk';
import Users from '../../data/models/users';
import Posts from '../../data/models/posts'
import Categories from '../../data/models/categories';
import { AuthenticationError } from 'apollo-server';

let expo = new Expo();

const resolvers = {
  Query: {
    users: async (obj, args, ctx, info) => {
      const users = await Users.findAll();
      return await users.map( async user => {
        user.posts = await Posts.findAll({ where: {UserId: user.id}, raw: true });
        user.posts.map( post => post.category = Categories.findByPk(post.CategoryId) )
        return user;
      });
    },
    user: async (obj, args, ctx, info) => {
      const user = await Users.findByPk(args.id, {raw: true});
      user.posts = await Posts.findAll({ where: {UserId: args.id}, raw: true });
      user.posts.map( post => post.category = Categories.findByPk(post.CategoryId) )
      return user;
    },
    login: async (obj, args, ctx, info) => {
      const auth = await Users.findOne({ where: { firstname: args.data.firstname, lastname: args.data.lastname } });
      if (!auth) throw new AuthenticationError('Wrong credentials, please try again !');
      return auth;
    },
    userPosts: async (obj, args, ctx, info) => await Posts.findAll({ where: {UserId: args.id}, raw: true }),
  },
  Mutation: {
    createUser: async (obj, args, ctx, info) => {
      const user = new Users({
        firstname: args.data.firstname,
        lastname: args.data.lastname,
        city: args.data.city,
        image: args.data.image
      });
      await user.save();
      return user;
    },

    editUser: async (obj, args, ctx, info) => {
      await Users.update({
        firstname: args.data.firstname,
        lastname: args.data.lastname,
        city: args.data.city,
        image: args.data.image
      }, {
        where: { id: args.id },
      });
      return Users.findByPk(args.id);
    },

    deleteUser:  async (obj, args, ctx, info) => {
      await Users.destroy({ where: { id: args.id } })
      return {
        success: "User deleted successfully !",
        error: null,
      };
    }
  }
}

export default resolvers
