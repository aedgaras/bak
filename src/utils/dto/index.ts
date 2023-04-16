import { Role } from '../Models';

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
    phoneNumber: string;
    email: string;
    role: number;
    classification: number;
}

export interface AnimalDto {
    id: string;
    name: string;
    type: number;
}

export interface HealthRecordDto {
    id: string;
    heartRate: string;
}

export interface CaseDto {
    id: string;
    status: number;
    urgency: number;
    entryDate: string;
    HealthRecordId: string;
}

export interface DiagnosisDto {
    id: number;
    userId: number;
    caseId: number;
    caseType: number;
    diagnosis: string;
    description: string;
}

export interface ResultDto {
    id: number;
    userId: number;
    caseId: number;
    caseType: number;
    result: string;
    description: string;
    entryDate: string;
    closeDate: string;
}

export interface MedicineRecipeDto {
    id: number;
    userId: number;
    caseId: number;
    title: string;
    count: number;
    description: string;
    expiryTime: string;
    entryDate: string;
}
