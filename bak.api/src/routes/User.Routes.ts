import express from 'express';
import {
    createUser,
    deleteUser,
    getUser,
    getUsers,
    updateUser,
} from '../controllers/User.Controller';
import { authenticateToken } from '../middleware/Auth.Middleware';

export const userRouter = express.Router();

userRouter.get('/', authenticateToken, getUsers);

userRouter.get('/:userId', getUser);

userRouter.post('/', createUser);

userRouter.put('/:userId', updateUser);

userRouter.put('/:userId', deleteUser);
