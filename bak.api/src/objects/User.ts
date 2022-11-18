import { Role } from './Roles';

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
    avatar?: string;
};
