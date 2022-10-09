import { Request, Response } from 'express';
import { generateAccessToken } from '../configuration/Configuration';
import { User } from '../models/User';

export const login = async (req: Request, res: Response) => {
    const username = req.body.username as string;
    const password = req.body.password as string;

    const user = await User.findOne({
        where: { username: username, password: password },
    });
    if (!user) {
        res.status(400).json("Such user doesn't exist");
    } else {
        res.status(200).json(generateAccessToken({ username: username }));
    }
};

export const register = async (req: Request, res: Response) => {
    const username = req.body.username as string;
    const password = req.body.password as string;

    const user = await User.findOne({
        where: { username: username, password: password },
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
