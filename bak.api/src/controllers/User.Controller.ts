import { Request, Response } from 'express';
import { User } from '../configuration/db/models/User';
import { MapUser, MapUsers } from '../objects/dtos/Mappers';
import { parseSchema, uploadAvatarSchema } from '../objects/Schema';
import { UserRegisterDto } from '../objects/User';
import { UserEntityName } from '../utils/constants';
import {
    ENTITY_ALREADY_EXIST,
    ENTITY_DELETED,
    ENTITY_NOT_FOUND,
    ENTITY_UPDATED,
    Forbiden,
    ListResponse,
    NotFound,
    Ok,
    pagingQueryExists,
    RequestQueryPagination,
} from '../utils/response';
import { entityIdFromParameter, hashedPassword } from '../utils/utils';

export const getUsers = async (req: Request, res: Response) => {
    const paging: RequestQueryPagination = {
        limit: Number(req.query.limit),
        offset: Number(req.query.offset),
    };

    const userEntities = await User.findAndCountAll(
        pagingQueryExists(paging) ? { ...paging } : {}
    );

    return res.json(
        ListResponse(paging, userEntities.count, MapUsers(userEntities.rows))
    );
};

export const getUser = async (req: Request, res: Response) => {
    const userId = entityIdFromParameter(req, 'userId');

    const userEntity = await User.findByPk(userId);

    if (!userEntity) {
        return NotFound(res, ENTITY_NOT_FOUND(UserEntityName));
    } else {
        return Ok(res, MapUser(userEntity));
    }
};

export const getByUsername = async (req: Request, res: Response) => {
    const paramUsername = req.params.username;

    const userEntity = await User.findOne({
        where: {
            username: paramUsername,
        },
    });

    if (!userEntity) {
        return NotFound(res, ENTITY_NOT_FOUND(UserEntityName));
    } else {
        return Ok(res, MapUser(userEntity));
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
        return Forbiden(res, ENTITY_ALREADY_EXIST(UserEntityName));
    } else {
        const createdUser = await User.create({ ...newUser });

        await createdUser.save();

        return Ok(res);
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const userId = entityIdFromParameter(req, 'userId');

    const existingUser = await User.findByPk(userId);

    if (existingUser) {
        const updatedUser = {
            ...req.body,
        };

        existingUser.update({ ...updatedUser });

        await existingUser.save();

        return Ok(res, MapUser(existingUser));
    } else {
        return NotFound(res, ENTITY_NOT_FOUND(UserEntityName));
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const userReq: { id: number } = { ...req.body };

    const user = await User.findByPk(userReq.id);

    if (!user) {
        return NotFound(res, ENTITY_NOT_FOUND(UserEntityName));
    } else {
        await user.destroy();

        await user.save();

        return Ok(res, ENTITY_DELETED(UserEntityName, userReq.id));
    }
};

export const uploadUserAvatar = async (req: Request, res: Response) => {
    const errors = await parseSchema({
        schema: uploadAvatarSchema,
        objToValidate: req.body,
    });

    if (errors) {
        return res.status(400).json(errors);
    }

    const userReq: { id: number } = { ...req.body };

    const user = await User.findByPk(userReq.id);

    if (!user) {
        return NotFound(res, ENTITY_NOT_FOUND(UserEntityName));
    } else {
        const updatedUser = {
            avatar: req.body.avatar,
        };

        user.update({ ...updatedUser });

        await user.save();

        return Ok(res, ENTITY_UPDATED(UserEntityName, userReq.id));
    }
};
