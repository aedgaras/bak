import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { env } from '../utils/constants';

export const db = new Sequelize({
    database: env.DB_NAME,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    host: env.DB_HOST,
    dialect: 'postgres',
    logging: false,
});
