"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderDetail.belongsTo(models.Order, {
        foreignKey: "order_id",
        targetKey: "id",
        as: "orderIdData",
      });
    }
  }
  OrderDetail.init(
    {
      order_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      discount: DataTypes.INTEGER,
      amount: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "OrderDetail",
      paranoid: true,
    }
  );
  return OrderDetail;
};
