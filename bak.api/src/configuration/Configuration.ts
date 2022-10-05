import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const env = process.env;

export const PORT_API = env.PORT || 3030;

export const dbConfig = {};

export const sequelize = new Sequelize({
    database: env.DB_NAME,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    host: env.DB_HOST,
    dialect: 'postgres',
    logging: console.log,
});
