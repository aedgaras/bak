import { Role } from '../Models/Models';

export interface OrganizationDto {
    id: string;
    name: string;
}

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

export interface UserModel {
    id: string;
    username: string;
    password: string;
    role: Role;
    createdAt: string;
    updatedAt: string;
    avatar: string;
}
