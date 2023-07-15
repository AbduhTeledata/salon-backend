import { Sequelize } from "sequelize";

const db = new Sequelize('h941teledata_salon', 'root', '', {
    host: "localhost",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
        }
});
//h941teledata_salon
export default db;