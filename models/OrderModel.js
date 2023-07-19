import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
// import Members from "./MemberModel.js";
// import Employees from "./EmployeeModel.js";
import Branches from "./BranchModel.js";
// import Products from "./ProductModel.js";
// import Discounts from "./DiscountModel.js";

const {DataTypes} = Sequelize;

const Orders = db.define('x941orders', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    inv_code: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    productname: {
        type: DataTypes.INTEGER,
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
    taxes: {
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
    },
    customer: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    iscard: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    note: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: false
        }
    },
    terapis: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
    
    
}, {
    freezeTableName: true
});


// Orders.belongsTo(Products, {
//     as: "product",
//     foreignKey: {
//       allowNull: false
//     }
//   });
Orders.belongsTo(Branches, {
    as: "branch",
    foreignKey: {
      allowNull: false
    }
});
Orders.belongsTo(Users, {
    as: "user",
    foreignKey: {
      allowNull: false
    }
});

// Products.hasMany(Orders);
// Orders.belongsTo(Products, {foreignKey: 'productId'});

export default Orders
