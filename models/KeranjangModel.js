import { Sequelize } from "sequelize";
import db from "../config/Database.js";
// import Users from "./UserModel.js";
// import Products from "./ProductModel.js";
import ProductSalon from "./ProductSalonModel.js";

const {DataTypes} = Sequelize;

const Keranjangs = db.define('x941keranjangs', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    jumlah: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    total_harga: {
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

Keranjangs.belongsTo(ProductSalon, {
    as: "productsalon",
    foreignKey: {
      allowNull: false
    }
  });

// Products.hasMany(Orders);
// Orders.belongsTo(Products, {foreignKey: 'productId'});

export default Keranjangs
