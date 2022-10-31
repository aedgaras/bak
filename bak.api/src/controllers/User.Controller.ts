import { Request, Response } from 'express';
import { UserRegisterDto } from '../dto/User';
import { User } from '../models/User';
import { UserEntityName } from '../utils/constants';
import {
    entityIdFromParameter,
    ListResponse,
    pagingQueryExists,
    RequestQueryPagination,
} from '../utils/request';
import {
    ENTITY_ALREADY_EXIST,
    ENTITY_DELETED,
    ENTITY_DOESNT_EXIST,
    ENTITY_NOT_FOUND,
} from '../utils/response/ResponseTexts';
import { returnMessage } from '../utils/response/ResponseUtils';
import { hashedPassword } from '../utils/utils';

export const getUsers = async (req: Request, res: Response) => {
    const paging: RequestQueryPagination = {
        limit: Number(req.query.limit),
        offset: Number(req.query.offset),
    };

    const users = await User.findAndCountAll(
        pagingQueryExists(paging) ? { ...paging } : {}
    );

    return res.json(ListResponse(paging, users.count, users.rows));
};

export const getUser = async (req: Request, res: Response) => {
    const userId = entityIdFromParameter(req, 'userId');

    const user = await User.findByPk(userId);

    if (!user) {
        return res
            .status(404)
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
            .status(404)
            .json(returnMessage(ENTITY_NOT_FOUND(UserEntityName)));
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

    if (existingUser) {
        return res
            .status(403)
            .send(returnMessage(ENTITY_ALREADY_EXIST(UserEntityName)));
    } else {
        const createdUser = await User.create({ ...newUser });

        await createdUser.save();

        return res.sendStatus(200);
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const userId = entityIdFromParameter(req, 'userId');

    const existingUser = await User.findByPk(userId);

    if (existingUser) {
        const updatedUser = {
            username: req.body.username,
        };

        existingUser.update({ ...updatedUser });

        await existingUser.save();

        return res.status(200).json(existingUser);
    } else {
        return res
            .status(404)
            .json(returnMessage(ENTITY_DOESNT_EXIST(UserEntityName)));
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const userId = entityIdFromParameter(req, 'userId');

    const user = await User.findByPk(userId);

    if (!user) {
        return res
            .status(404)
            .json(returnMessage(ENTITY_NOT_FOUND(UserEntityName)));
    } else {
        await user.destroy();

        await user.save();

        return res
            .status(200)
            .json(returnMessage(ENTITY_DELETED(UserEntityName, userId)));
    }
};
