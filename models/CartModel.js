import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
// import Products from "./ProductModel.js";
import ProductSalon from "./ProductSalonModel.js";

const {DataTypes} = Sequelize;

const Carts = db.define('x941carts', {
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
    
}, {
    freezeTableName: true
});

// Users.hasMany(Orders);
// Orders.belongsTo(Users, {foreignKey: 'userId'});

Carts.belongsTo(ProductSalon, {
    as: "productsalon",
    foreignKey: {
      allowNull: false
    }
  });
Carts.belongsTo(Users, {
    as: "user",
    foreignKey: {
      allowNull: false
    }
});

// Products.hasMany(Orders);
// Orders.belongsTo(Products, {foreignKey: 'productId'});

export default Carts
