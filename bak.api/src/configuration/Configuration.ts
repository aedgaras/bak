import dotenv from 'dotenv';
import { sign } from 'jsonwebtoken';
import { Sequelize } from 'sequelize';

dotenv.config();

const env = process.env;

export const TOKEN_SECRET =  env.TOKEN_SECRET || '24432646294A404E635266556A586E3272357538782F4125442A472D4B615064'

export const PORT_API = env.PORT || 3030;

export const sequelize = new Sequelize({
    database: env.DB_NAME,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    host: env.DB_HOST,
    dialect: 'postgres',
});

export function generateAccessToken(payload: JwtTokenPayload) {
    return sign(payload, TOKEN_SECRET, {expiresIn: '1h'});
}

export interface JwtTokenPayload {
    username: string
}

export interface Status {
    message: string,
    code: number,
}