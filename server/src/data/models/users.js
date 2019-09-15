import Sequelize, { Model } from "sequelize";

export default class Users extends Model {
  static init(database){

    return super.init({

      firstname: {
        type: Sequelize.STRING,
      },

      lastname: {
        type: Sequelize.STRING,
      },

      city: {
        type: Sequelize.STRING,
      },

      image: {
        type: Sequelize.STRING,
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
      tableName: "users",
      sequelize: database,

      indexes: [
        {
          unique: true,
          fields: ["firstname", "lastname", "city"]
        }
      ],
    })

  };

  toJSON() {
    return Object.assign({}, this.get());
  }
}
