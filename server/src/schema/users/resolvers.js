import Expo from 'expo-server-sdk';
import Users from '../../data/models/users';
import Posts from '../../data/models/posts'
import Categories from '../../data/models/categories';

let expo = new Expo();

const resolvers = {
  Query: {
    users: (obj, args, ctx, info) => {
      const users = await Users.findAll();
      users.map( user => {
        user.posts = await Posts.findAll({ where: {UserId: user.id}, raw: true });
        user.posts.map( post => post.category = Categories.findByPk(post.CategoryId) )
        return user;
      });
      return users;
    },
    user: async (obj, args, ctx, info) => {
      const user = await Users.findByPk(args.id, {raw: true});
      user.posts = await Posts.findAll({ where: {UserId: args.id}, raw: true });
      user.posts.map( post => post.category = Categories.findByPk(post.CategoryId) )
      return user;
    },
    login: (obj, args, ctx, info) => Users.findOne({
      where: { firstname: args.data.firstname, lastname: args.data.lastname }
    }),
  },
  Mutation: {
    createUser: async (obj, args, ctx, info) => {
      const user = new Users({
        firstname: args.data.firstname,
        lastname: args.data.lastname,
        city: args.data.city,
      });
      await user.save();
      return user;
    },

    editUser: async (obj, args, ctx, info) => {
      await Users.update({
        firstname: args.data.firstname,
        lastname: args.data.lastname,
        city: args.data.city,
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
