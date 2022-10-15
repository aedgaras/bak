import { DataTypes, Model } from 'sequelize';
import { db } from '../db/Config';
import { UserEntityName } from '../utils/constants';
import { Organization } from './Organization';

export class User extends Model {}

User.init(
    {
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
        name: {
            type: DataTypes.STRING,
        },
        lastname: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true,
            },
        },
        avatar: {
            type: DataTypes.TEXT,
        },
    },
    {
        sequelize: db,
        modelName: UserEntityName,
    }
);

User.hasOne(Organization);
