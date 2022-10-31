import express from 'express';
import {
    changePassword,
    login,
    refresh,
    register,
} from '../controllers/Authentication.Controller';

export const authRouter = express.Router();

authRouter.post('/login', login);

authRouter.post('/register', register);

authRouter.post('/refresh', refresh);

authRouter.post('/changePassword/:userId', changePassword);
