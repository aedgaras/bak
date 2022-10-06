import { Request, Response } from 'express';
import { User, UserModel } from '../models/User';
import { where } from "sequelize";

export const getUsers = async (req: Request, res: Response) => {
    const users = await User.findAll();

    res.send(users);
};

export const getUser = async (req: Request, res: Response) => {
    const id = Number(req.params.userId);

    const user = await User.findByPk(id);

    if (!user) {
        res.status(404).send('User not found!');
    }

    res.send(user);
};

export const createUser = async (req: Request, res: Response) => {
    const newUser: UserModel = {
        username: req.body.username,
        password: req.body.password,
    };

    const existingUser = await User.findAll({
        where: {
            username: newUser.username,
        },
    });

    if (existingUser.length > 0) {
        res.status(400).send('User already exists');
    } else {
        const createdUser = await User.create({ ...newUser });

        res.status(201).send(createdUser);
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const userId = Number(req.params.userId);

    const existingUser = await User.findByPk(userId);

    if(!existingUser){
        const updatedUser: UserModel = {
            username: req.body.username,
            password: req.body.password,
        };

        const updatedUserFromDb = await User.update({...updatedUser}, {where: {id: userId}});

        if(updatedUserFromDb.length > 0) {
            res.status(200).send('User updated successfully!')
        } else {
            res.status(200).send('User wasn\'t updated')
        }

    } else {
        res.status(401).send('No such user exist!');
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const userId = Number(req.params.userId);

    const user = await User.findByPk(userId);

    if (!user) {
        res.status(404).send('User not found!');
    } else {
        const deletedUser = await User.destroy({where: {id: userId}});

        if(deletedUser > 0){
            res.status(200).send('User deleted successfully!')

        } else {
            res.status(200).send('User wasn\'t deleted')
        }
    }
};
