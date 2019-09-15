import Sequelize, { Model } from "sequelize";

export default class UserInterestedInPost extends Model {
  static init(database){
    return super.init({
      notificationSent: {
        type: Sequelize.BOOLEAN, defaultValue: false
      },

      createdAt: {
        type: Sequelize.DATE(3),
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)')
      },

      updatedAt: {
        type: Sequelize.DATE(3),
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)')
      }

    }, {
      tableName: "userInterestedInPost",
      sequelize: database,

      indexes: [
        {
          unique: false,
          fields: ['notificationSent']
        }
      ],
    })
  };
}
