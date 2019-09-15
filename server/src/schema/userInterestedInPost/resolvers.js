import Expo from 'expo-server-sdk';
import Users from '../../data/models/users';
import Posts from '../../data/models/posts';
import UserInterestedInPost from '../../data/models/userInterestedInPost';

let expo = new Expo();

const resolvers = {
  Query: {
    interests: (obj, args, ctx, info) => UserInterestedInPost.findAll(),
    interest: async (obj, args, ctx, info) => UserInterestedInPost.findByPk(args.id),
    interestsByUser: (obj, args, ctx, info) => UserInterestedInPost.findAll({
      where: {
        UserId: args.UserId
      }
    })
  },

  Mutation: {
    createInterest: async (obj, args, ctx, info) => {
      const interest = new UserInterestedInPost({
        notificationSent: args.data.notificationSent,
        UserId: args.data.UserId,
        PostId: args.data.PostId,
      });
      await interest.save();
      return interest;
    },

    editInterest: async (obj, args, ctx, info) => {
      await UserInterestedInPost.update({
        notificationSent: args.data.notificationSent,
      }, {
        where: { id: args.id },
      });
      return UserInterestedInPost.findByPk(args.id);
    },

    deleteInterest:  async (obj, args, ctx, info) => {
      await UserInterestedInPost.destroy({ where: { id: args.id } })
      return {
        success: "Interest deleted successfully !",
        error: null,
      };
    }
  }
}

export default resolvers
