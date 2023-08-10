import { Sequelize } from "sequelize";

const db = new Sequelize('h941teledata_salon', 'root', 'abduh', {
    host: "127.0.0.1",
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