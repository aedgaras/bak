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

userRouter.get('/:userId', authenticateToken, getUser);

userRouter.post('/', authenticateToken, createUser);

userRouter.put('/:userId', authenticateToken, updateUser);

userRouter.put('/:userId', authenticateToken, deleteUser);
