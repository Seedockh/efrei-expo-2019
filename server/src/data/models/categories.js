import Sequelize, { Model } from "sequelize";

export default class Categories extends Model {
  static init(database){

    return super.init({

      name: {
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
      tableName: "categories",
      sequelize: database,

      indexes: [
        {
          unique: false,
          fields: ["name"]
        }
      ],
    })

  };

  toJSON() {
    return Object.assign({}, this.get());
  }
}
