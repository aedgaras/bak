import express from "express";
import { getUser, getUsers } from "../controllers/User.Controller";

export const userRouter = express.Router();


userRouter.get('/', getUsers);

userRouter.get(':/userId', getUser);
