import Sequelize, { Model } from "sequelize";

export default class Posts extends Model {
  static init(database){

    return super.init({

      title: {
        type: Sequelize.STRING,
      },

      price: {
        type: Sequelize.DOUBLE,
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
      tableName: "posts",
      sequelize: database,

      indexes: [
        {
          unique: false,
          fields: ["title", "price", "image"]
        }
      ],
    })

  };

  toJSON() {
    return Object.assign({}, this.get());
  }
}
