import express from 'express';
import {
    changePassword,
    login,
    refresh,
    register,
} from '../controllers/Authentication.Controller';
import { validateSchema } from '../middleware/Validation.Middleware';
import { userDataSchema, userLoginFormSchema } from '../objects/Schema';

export const authRouter = express.Router();

authRouter.post('/login', [validateSchema(userLoginFormSchema)], login);

authRouter.post('/register', [validateSchema(userDataSchema)], register);

authRouter.post('/refresh', refresh);

authRouter.post('/changePassword', changePassword);
