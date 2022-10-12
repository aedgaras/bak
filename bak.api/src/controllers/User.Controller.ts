import { Request, Response } from 'express';
import { User, UserEntityName, UserModel } from '../models/User';
import {
    ENTITY_ALREADY_EXIST,
    ENTITY_DOESNT_EXIST,
    ENTITY_NOT_FOUND,
    returnMessage,
} from '../utils/ResponseUtils';
import * as bcrypt from 'bcrypt';
import { hashedPassword } from '../utils/utils';

export const getUsers = async (req: Request, res: Response) => {
    const users = await User.findAll();

    return res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
    const id = Number(req.params.userId);

    const user = await User.findByPk(id);

    if (!user) {
        return res
            .sendStatus(404)
            .json(returnMessage(ENTITY_NOT_FOUND(UserEntityName)));
    } else {
        return res.json(user);
    }
};

export const getByUsername = async (req: Request, res: Response) => {
    const paramUsername = req.params.username;

    const user = await User.findOne({
        where: {
            username: paramUsername,
        },
    });

    if (!user) {
        return res
            .sendStatus(404)
            .json(returnMessage(ENTITY_NOT_FOUND(UserEntityName)));
    } else {
        return res.json(user);
    }
};

export const createUser = async (req: Request, res: Response) => {
    const newUser: UserModel = {
        username: req.body.username as string,
        password: hashedPassword(req.body.username as string),
    };

    const existingUser = await User.findOne({
        where: {
            username: newUser.username,
        },
    });

    if (!existingUser) {
        return res.status(400).send(ENTITY_ALREADY_EXIST(UserEntityName));
    } else {
        const createdUser = await User.create({ ...newUser });

        await createdUser.save();

        return res.sendStatus(200);
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

        return res.status(200);
    } else {
        return res
            .sendStatus(401)
            .json(returnMessage(ENTITY_DOESNT_EXIST(UserEntityName)));
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const userId = Number(req.params.userId);

    const user = await User.findByPk(userId);

    if (!user) {
        return res
            .sendStatus(404)
            .json(returnMessage(ENTITY_NOT_FOUND(UserEntityName)));
    } else {
        await user.destroy();

        await user.save();

        return res.status(200);
    }
};
