import { Role } from "../Models/Models";

export type UserLoginDto = {
    username: string;
    password: string;
};

export type UserRegisterDto = {
    username: string;
    password: string;
    role?: Role;
    name?: string;
    lastname?: string;
    email?: string;
};