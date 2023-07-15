import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
import Products from "./ProductModel.js";
import Discounts from "./DiscountModel.js";
import Orders from "./OrderModel.js";


const {DataTypes} = Sequelize;

const OrderDetails = db.define('x941orderdetails', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    sub_total: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    total_disc: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: false
        }
    },
    total_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: false
        }
    }
    // userId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     validate: {
    //         notEmpty: true
    //     }
    // },
    // productId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     validate: {
    //         notEmpty: true
    //     }
    // }
}, {
    freezeTableName: true
});

// Users.hasMany(Orders);
// Orders.belongsTo(Users, {foreignKey: 'userId'});
OrderDetails.belongsTo(Products, {
    as: "product",
    foreignKey: {
      allowNull: false
    }
  });

OrderDetails.belongsTo(Discounts, {
    as: "discount",
    foreignKey: {
      allowNull: true
    }
});

OrderDetails.belongsTo(Orders, {
    as: "order",
    foreignKey: {
      allowNull: false
    }
});

OrderDetails.belongsTo(Users, {
    as: "user",
    foreignKey: {
      allowNull: false
    }
});

// Products.hasMany(Orders);
// Orders.belongsTo(Products, {foreignKey: 'productId'});

export default OrderDetails
