import { DataTypes } from 'sequelize';
import { db } from '../db/Config';

export const UserEntityName = 'User';

export interface UserModel {
    username: string;
    password: string;
}

export const User = db.define(
    UserEntityName,
    {
        // Model attributes are defined here
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('admin', 'user'),
            allowNull: false,
            defaultValue: 'user',
        },
    },
    {
        // Other model options go here
    }
);