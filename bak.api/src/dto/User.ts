import { Roles } from '../models/Roles';

export type UserLoginDto = {
    username: string;
    password: string;
};

export type UserRegisterDto = {
    username: string;
    password: string;
    role?: Roles;
    name?: string;
    lastname?: string;
    email?: string;
};
