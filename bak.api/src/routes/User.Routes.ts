import express from 'express';
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../controllers/User.Controller";

export const userRouter = express.Router();

userRouter.get('/', getUsers);

userRouter.get('/:userId', getUser);

userRouter.post('/', createUser);

userRouter.put('/:userId', updateUser);

userRouter.put('/:userId', deleteUser);
