import { Classification, Role } from '../Models';

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
};

export interface UserDto {
    id: string;
    username: string;
    password: string;
    role: Role;
    classification: Classification;
}

export interface AnimalDto {
    id: string;
    name: string;
    type: 'Dog' | 'Cat';
}

export interface HealthRecordDto {
    id: string;
    heartRate: string;
}

export interface CaseDto {
    id: string;
    status: string;
}
