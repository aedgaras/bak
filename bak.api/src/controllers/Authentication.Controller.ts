import { Request, Response } from 'express';
import { Model } from 'sequelize';
import { generateAccessToken } from '../configuration/Configuration';
import { User } from '../models/User';
import { hashedPassword } from '../utils/utils';
import * as bcrypt from 'bcrypt';
export const login = async (req: Request, res: Response) => {
    const username = req.body.username as string;
    const password = req.body.password as string;

    const user = await User.findOne({
        where: { username: username},
    });


    if (!user) {
        res.status(400).json("Such user doesn't exist");
    } else {
        const hashedPass = user.getDataValue('password');
        const match = bcrypt.compareSync(password, hashedPass);
        if(!match){
            res.status(300).send('Password is incorrect.');
        } else {
            res.status(200).json(generateAccessToken({ username: username }));
        }
    }
};

export const register = async (req: Request, res: Response) => {
    const username = req.body.username as string;
    const password = hashedPassword(req.body.password as string);

    const user = await User.findOne({
        where: { username: username},
    });

    if (user) {
        res.status(400).send('Such user already exists.');
    } else {
        const newUser = await User.create({
            username: username,
            password: password,
        });

        await newUser.save();

        const token = generateAccessToken({ username: username });
        res.status(200).json(token);
    }
};
