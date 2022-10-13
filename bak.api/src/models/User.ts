import { DataTypes, Model, where } from 'sequelize';
import { db } from '../db/Config';
import { hashedPassword } from '../utils/utils';

export const UserEntityName = 'User';

export interface UserModel {
    username: string;
    password: string;
}

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
    },
    {
        sequelize: db,
        modelName: UserEntityName,
    }
);

const seedInitialAdmin = async () => {
    const users = await User.findAndCountAll({
        where: {
            username: 'admin',
        },
    });

    if (users.count > 0) {
        return;
    }

    const initialAdmin = await User.create({
        username: 'admin',
        password: hashedPassword('admin'),
        role: 'admin',
    });

    initialAdmin.save();
};

const seedInitialUser = async () => {
    const users = await User.findAndCountAll({
        where: {
            username: 'user',
        },
    });

    if (users.count > 0) {
        return;
    }

    const initialUser = await User.create({
        username: 'user',
        password: hashedPassword('user'),
        role: 'user',
    });

    initialUser.save();
};

export const seedInitialUsers = async () =>{
    seedInitialAdmin();
    seedInitialUser();
}