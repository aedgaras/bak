import express from 'express';
import {
    createUser,
    deleteUser,
    getByUsername,
    getUser,
    getUsers,
    updateUser,
} from '../controllers/User.Controller';
import {
    authenticateRole,
    authenticateToken,
} from '../middleware/Auth.Middleware';

export const userRouter = express.Router();

userRouter.get('/', [authenticateToken], getUsers);

userRouter.get('/:userId', [authenticateToken], getUser);

userRouter.get('/getByUsername/:username', [authenticateToken], getByUsername);

userRouter.post(
    '/',
    [authenticateToken, authenticateRole(['admin'])],
    createUser
);

userRouter.put('/:userId', [authenticateToken], updateUser);

userRouter.delete(
    '/',
    [authenticateToken, authenticateRole(['admin'])],
    deleteUser
);
