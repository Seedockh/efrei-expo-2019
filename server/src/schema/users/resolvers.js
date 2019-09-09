import Expo from 'expo-server-sdk';
import Users from '../../data/models/users';

let expo = new Expo();

const resolvers = {
  Query: {
    users: (obj, args, ctx, info) => Users.findAll(),
    user: (obj, args, ctx, info) => Users.findByPk(args.id),
  },
  Mutation: {
    createUser: async (obj, args, ctx, info) => {
      const user = new Users({
        firstname: args.data.firstname,
        lastname: args.data.lastname,
        city: args.data.city,
      });
      await user.save();
      return {
        success: "User created successfully !",
        error: null,
      };
    },

    editUser: async (obj, args, ctx, info) => {
      await Users.update({
        firstname: args.data.firstname,
        lastname: args.data.lastname,
        city: args.data.city,
      }, {
        where: { id: args.id },
      });
      return {
        success: "User updated successfully !",
        error: null,
      };;
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
