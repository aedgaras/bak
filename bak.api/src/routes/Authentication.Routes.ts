import express from 'express';
import {
    changePassword,
    login,
    refresh,
    register,
} from '../controllers/Authentication.Controller';
import {
    validateBodySchema,
    validateHeaderSchema,
} from '../middleware/Validation.Middleware';
import {
    changePasswordFormSchema,
    refreshHeaderSchema,
    refreshTokenSchema,
    userDataSchema,
    userLoginFormSchema,
} from '../objects/Schema';

export const authRouter = express.Router();

authRouter.post('/login', [validateBodySchema(userLoginFormSchema)], login);

authRouter.post('/register', [validateBodySchema(userDataSchema)], register);

authRouter.post(
    '/refresh',
    [
        validateBodySchema(refreshTokenSchema),
        validateHeaderSchema(refreshHeaderSchema),
    ],
    refresh
);

authRouter.post(
    '/changePassword',
    [validateBodySchema(changePasswordFormSchema)],
    changePassword
);
