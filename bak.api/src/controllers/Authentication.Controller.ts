import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { User } from '../configuration/db/models/User';
import { Role } from '../objects/Roles';
import { UserLoginDto, UserRegisterDto } from '../objects/User';
import { REFRESH_SECRET, UserEntityName } from '../utils/constants';
import {
    BadRequest,
    ENTITY_NOT_FOUND,
    Forbiden,
    NotAcceptable,
    NotFound,
    Ok,
    returnMessage,
} from '../utils/response';
import {
    accessRefreshTokens,
    bearerToken,
    generateAccessToken,
    generateRefreshToken,
} from '../utils/token/utils';
import { hashedPassword } from '../utils/utils';

export const login = async (req: Request, res: Response) => {
    const userToLogin: UserLoginDto = {
        username: req.body.username as string,
        password: req.body.password as string,
    };

    const user = await User.findOne({
        where: { username: userToLogin.username },
    });

    if (!user) {
        return NotFound(res, returnMessage("Such user doesn't exist"));
    } else {
        const hashedPass = user.getDataValue('password');
        const match = bcrypt.compareSync(userToLogin.password, hashedPass);
        if (!match) {
            return BadRequest(res, returnMessage('Password is incorrect.'));
        } else {
            return Ok(
                res,
                accessRefreshTokens(
                    generateAccessToken({
                        username: user.getDataValue('username'),
                        role: user.getDataValue('role'),
                    }),
                    generateRefreshToken({
                        username: user.getDataValue('username'),
                    })
                )
            );
        }
    }
};

export const register = async (req: Request, res: Response) => {
    const userToRegister: UserRegisterDto = {
        username: req.body.username as string,
        password: hashedPassword(req.body.password as string),
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
    };

    const user = await User.findOne({
        where: { username: userToRegister.username },
    });

    if (user) {
        return Forbiden(res, returnMessage('Such user already exists.'));
    } else {
        const newUser = await User.create(userToRegister);

        await newUser.save();

        return Ok(
            res,
            accessRefreshTokens(
                generateAccessToken({
                    username: newUser.getDataValue('username'),
                    role: newUser.getDataValue('role'),
                }),
                generateRefreshToken({
                    username: newUser.getDataValue('username'),
                })
            )
        );
    }
};

export const refresh = async (req: Request, res: Response) => {
    const payload = {
        username: req.body.username as string,
        role: req.body.role as Role,
    };

    // Destructuring refreshToken from cookie
    const refreshToken: string | undefined = req.headers['jwt'] as string;

    if (refreshToken === undefined) {
        return NotAcceptable(res, 'Bad token');
    } else {
        verify(refreshToken, REFRESH_SECRET, (err: any, decoded: any) => {
            if (err) {
                // Wrong Refesh Token
                return NotAcceptable(res, err);
            } else {
                // Correct token we send a new access token
                return res.json(
                    bearerToken(
                        generateAccessToken({
                            username: payload.username,
                            role: payload.role,
                        })
                    )
                );
            }
        });
    }
};

export const changePassword = async (req: Request, res: Response) => {
    const payload: { userId: number; password: string } = { ...req.body };

    const user = await User.findByPk(payload.userId);

    if (!user) {
        return NotFound(res, ENTITY_NOT_FOUND(UserEntityName));
    } else {
        const pass = hashedPassword(payload.password);
        await user.update({ password: pass });
        await user.save();

        return Ok(res);
    }
};
