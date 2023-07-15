import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Branches from "./BranchModel.js";
import Users from "./UserModel.js";

const {DataTypes} = Sequelize;

const Employees = db.define('x941employees', {
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
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    }
    // userId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     validate: {
    //         notEmpty: true
    //     }
    // },
    // branchId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     validate: {
    //         notEmpty: true
    //     }
    // }
}, {
    freezeTableName: true
});

// Branches.hasMany(Employees);
// Employees.belongsTo(Branches, {foreignKey: 'branchId'});
Employees.belongsTo(Branches, {
    as: "branch",
    foreignKey: {
      allowNull: false
    }
});

// Users.hasMany(Employees);
// Employees.belongsTo(Users, {foreignKey: 'userId'});
Employees.belongsTo(Users, {
    as: "user",
    foreignKey: {
      allowNull: false
    }
});

export default Employees;