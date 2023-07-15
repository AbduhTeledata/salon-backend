import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
import Companies from "./CompanyModel.js";

const {DataTypes} = Sequelize;

const Branches = db.define('x941branches', {
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
    }
    // companyId: {
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

// Users.hasMany(Branches);
// Branches.belongsTo(Users, {foreignKey: 'userId'});
Branches.belongsTo(Companies, {
    as: "company",
    foreignKey: {
      allowNull: false
    }
});

// Branches.belongsTo(Users, {
//     as: "user",
//     foreignKey: {
//       allowNull: false
//     }
// });

// Companies.hasMany(Branches);
//Branches.belongsTo(Companies, {foreignKey: 'companyId'});

export default Branches;