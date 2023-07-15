import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const {DataTypes} = Sequelize;

const Discounts = db.define('x941discounts', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    }
    // userId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     validate: {
    //         notEmpty: true
    //     }
    // }
}, {
    freezeTableName: true
});

// Users.hasMany(Discounts);
// Discounts.belongsTo(Users, {foreignKey: 'userId'});

Discounts.belongsTo(Users, {
    as: "user",
    foreignKey: {
      allowNull: false
    }
  });

export default Discounts;