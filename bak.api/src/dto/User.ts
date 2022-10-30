import { Role } from '../models/Roles';

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

export interface UserDto {
    username: string;
    role?: Role;
    name?: string;
    lastname?: string;
    email?: string;
    avatar?: string;
    OrganizationId: number;
}
