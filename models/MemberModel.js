import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
import Branches from "./BranchModel.js";

const {DataTypes} = Sequelize;

const Members = db.define('x941members', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    membercode: {
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
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    placebirth: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: false,
        }
    },
    datebirth: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: false,
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    }
    // customerId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     validate: {
    //         notEmpty: true
    //     }
    // },
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


// Users.hasMany(Members);
// Members.belongsTo(Users, {foreignKey: 'userId'});
Members.belongsTo(Branches, {
    as: "branch",
    foreignKey: {
      allowNull: false
    }
});

Members.belongsTo(Users, {
    as: "user",
    foreignKey: {
      allowNull: false
    }
});

// Customers.hasOne(Members);
// Members.belongsTo(Customers, {foreignKey: 'costumerId'});

export default Members;