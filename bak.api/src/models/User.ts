import { DataTypes, Model } from 'sequelize';
import { db } from '../configuration/db/Config';
import { UserEntityName } from '../utils/constants';

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
            type: DataTypes.BLOB,
        },
    },
    {
        sequelize: db,
        modelName: UserEntityName,
    }
);
