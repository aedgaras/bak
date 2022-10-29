import { Request, Response } from 'express';
import { UserRegisterDto } from '../dto/User';
import { User } from '../models/User';
import { UserEntityName } from '../utils/constants';
import {
    ENTITY_ALREADY_EXIST,
    ENTITY_DELETED,
    ENTITY_DOESNT_EXIST,
    ENTITY_NOT_FOUND,
    ENTITY_UPDATED,
} from '../utils/response/ResponseTexts';
import { returnMessage } from '../utils/response/ResponseUtils';
import { hashedPassword } from '../utils/utils';

export const getUsers = async (req: Request, res: Response) => {
    const users = await User.findAll();

    return res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
    const id = Number(req.params.userId);

    const user = await User.findByPk(id);

    if (!user) {
        return res.json(returnMessage(ENTITY_NOT_FOUND(UserEntityName)));
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
        return res.json(returnMessage(ENTITY_NOT_FOUND(UserEntityName)));
    } else {
        return res.json(user);
    }
};

export const createUser = async (req: Request, res: Response) => {
    const newUser: UserRegisterDto = {
        username: req.body.username as string,
        password: hashedPassword(req.body.username as string),
    };

    const existingUser = await User.findOne({
        where: {
            username: newUser.username,
        },
    });

    if (!existingUser) {
        return res.send(ENTITY_ALREADY_EXIST(UserEntityName));
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
        const updatedUser: UserRegisterDto = {
            username: req.body.username,
            password: req.body.password,
        };

        existingUser.update({ ...updatedUser });

        await existingUser.save();

        return res
            .status(200)
            .json(returnMessage(ENTITY_UPDATED(UserEntityName, userId)));
    } else {
        return res.json(returnMessage(ENTITY_DOESNT_EXIST(UserEntityName)));
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const userId = Number(req.params.userId);

    const user = await User.findByPk(userId);

    if (!user) {
        return res.json(returnMessage(ENTITY_NOT_FOUND(UserEntityName)));
    } else {
        await user.destroy();

        await user.save();

        return res
            .status(200)
            .json(returnMessage(ENTITY_DELETED(UserEntityName, userId)));
    }
};
