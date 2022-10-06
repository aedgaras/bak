import { Request, Response } from "express";
import { User } from "../models/User"

export const getUsers = (async (req: Request, res: Response) => {
    const users = await User.findAll();

    res.send(users);
});

export const getUser = (async (req: Request, res: Response) => {
    const id = Number(req.params.userId);

    const user = await User.findByPk(id);

    if(!user){
        res.status(404).send('User not found!');
    }

    res.send(user);
});