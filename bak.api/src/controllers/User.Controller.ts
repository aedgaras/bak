import { Request, Response } from 'express';
import { User, UserEntityName, UserModel } from '../models/User';
import { where } from 'sequelize';
import { ENTITY_ALREADY_EXIST, ENTITY_DOESNT_EXIST, ENTITY_NOT_FOUND } from '../utils/ResponseUtils';

export const getUsers = async (req: Request, res: Response) => {
    const users = await User.findAll();

    res.send(users);
};

export const getUser = async (req: Request, res: Response) => {
    const id = Number(req.params.userId);

    const user = await User.findByPk(id);

    if (!user) {
        res.status(404).send(ENTITY_NOT_FOUND(UserEntityName));
    }

    res.send(user);
};

export const createUser = async (req: Request, res: Response) => {
    const newUser: UserModel = {
        username: req.body.username,
        password: req.body.password,
    };

    const existingUser = await User.findAll({
        where: {
            username: newUser.username,
        },
    });

    if (existingUser.length > 0) {
        res.status(400).send(ENTITY_ALREADY_EXIST(UserEntityName));
    } else {
        const createdUser = await User.create({ ...newUser });

        await createdUser.save();

        res.status(201);
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const userId = Number(req.params.userId);

    const existingUser = await User.findByPk(userId);

    if (existingUser) {
        const updatedUser: UserModel = {
            username: req.body.username,
            password: req.body.password,
        };

        existingUser.set({ ...updatedUser });

        await existingUser.save();

        res.status(200);
    } else {
        res.status(401).send(ENTITY_DOESNT_EXIST(UserEntityName));
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const userId = Number(req.params.userId);

    const user = await User.findByPk(userId);

    if (!user) {
        res.status(404).send(ENTITY_NOT_FOUND(UserEntityName));
    } else {
        await user.destroy();

        await user.save();

        res.status(200);
    }
};
