import { Sequelize } from "sequelize";
import db from "../config/Database.js";
// import Users from "./UserModel.js";
import Categories from "./CategoryModel.js";

const {DataTypes} = Sequelize;

const ProductSalon = db.define('x941productsalon', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    kode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
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
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    is_ready: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    gambar: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    }
}, {
    freezeTableName: true
});

ProductSalon.belongsTo(Categories, {
    as: "category",
    foreignKey: {
      allowNull: false
    }
});


export default ProductSalon;