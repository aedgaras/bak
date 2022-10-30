import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { REFRESH_SECRET, TOKEN_SECRET } from '../configuration/Configuration';
import { UserLoginDto, UserRegisterDto } from '../dto/User';
import { User } from '../models/User';
import {
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
        return res.status(400).json("Such user doesn't exist");
    } else {
        const hashedPass = user.getDataValue('password');
        const match = bcrypt.compareSync(userToLogin.password, hashedPass);
        if (!match) {
            return res.status(300).send('Password is incorrect.');
        } else {
            res.cookie(
                'jwt',
                generateRefreshToken({
                    username: user.getDataValue('username'),
                }),
                {
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true,
                    maxAge: 24 * 60 * 60 * 1000,
                }
            );
            return res.status(200).json(
                bearerToken(
                    generateAccessToken({
                        username: user.getDataValue('username'),
                        role: user.getDataValue('role'),
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
        return res.status(400).send('Such user already exists.');
    } else {
        const newUser = await User.create({
            ...userToRegister,
        });

        await newUser.save();

        res.cookie(
            'jwt',
            generateRefreshToken({
                username: newUser.getDataValue('username'),
            }),
            {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                maxAge: 24 * 60 * 60 * 1000,
            }
        );

        return res.status(200).json(
            bearerToken(
                generateAccessToken({
                    username: newUser.getDataValue('username'),
                    role: newUser.getDataValue('role'),
                })
            )
        );
    }
};

export const refresh = async (req: Request, res: Response) => {
    if (req.cookies?.jwt) {
        // Destructuring refreshToken from cookie
        const refreshToken = req.cookies.jwt;

        // Verifying refresh token
        verify(refreshToken, REFRESH_SECRET, (err: any, decoded: any) => {
            if (err) {
                // Wrong Refesh Token
                return res.status(406).json({ message: 'Unauthorized' });
            } else {
                // Correct token we send a new access token
                const accessToken = sign(
                    {
                        username: req.body.username,
                        email: req.body.role,
                    },
                    TOKEN_SECRET,
                    {
                        expiresIn: '10m',
                    }
                );
                return res.json({ accessToken });
            }
        });
    } else {
        return res.status(406).json({ message: 'Unauthorized' });
    }
};
