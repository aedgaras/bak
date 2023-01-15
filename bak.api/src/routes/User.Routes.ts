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
import {
    validateParamsId,
    validateSchema,
} from '../middleware/Validation.Middleware';
import { userSchema } from '../objects/dtos';
import { deleteFormSchema, userLoginFormSchema } from '../objects/Schema';

export const userRouter = express.Router();

userRouter.get('/', [authenticateToken], getUsers);

userRouter.get(
    '/:userId',
    [authenticateToken, validateParamsId('userId')],
    getUser
);

userRouter.get('/getByUsername/:username', [authenticateToken], getByUsername);

userRouter.post(
    '/',
    [
        authenticateToken,
        authenticateRole(['admin']),
        validateSchema(userLoginFormSchema),
    ],
    createUser
);

userRouter.put(
    '/:userId',
    [authenticateToken, validateParamsId('userId'), validateSchema(userSchema)],
    updateUser
);

userRouter.delete(
    '/',
    [
        authenticateToken,
        authenticateRole(['admin']),
        validateSchema(deleteFormSchema),
    ],
    deleteUser
);
