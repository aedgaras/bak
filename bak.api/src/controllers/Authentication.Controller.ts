import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { UserLoginDto, UserRegisterDto } from '../dto/User';
import { User } from '../models/User';
import { generateAccessToken } from '../utils/token/generator';
import { bearerToken } from '../utils/token/payload';
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
