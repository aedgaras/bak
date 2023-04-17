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
    description: string;
    entryDate: string;
}

export interface CaseDto {
    id: string;
    status: number;
    urgency: number;
    entryDate: string;
    HealthRecordId: string;
    healthRecord?: {
        heartRate: number;
        description: string;
        entryDate: string;
        animalId: number;
        id: number;
    };
}

export interface DiagnosisDto {
    id: number;
    userId: number;
    caseId: number;
    case?: CaseDto;
    caseType: number;
    diagnosis: string;
    description: string;
}

export interface ResultDto {
    id: number;
    userId: number;
    caseDiagnosisId: number;
    caseType: number;
    caseDiagnosis?: DiagnosisDto;
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

export interface CreateAnimalDto {
    name: string;
    type: number;
    userId: number;
}

export interface CreateHealthRecordDto {
    heartRate: number;
    description: string;
    animalId: number;
}

export interface CreateCaseDto {
    status: number;
    urgency: number;
    healthRecordId: number;
}

export interface CreateDiagnosisDto {
    userId: number;
    caseId: number;
    caseType: number;
    diagnosis: string;
    description: string;
}

export interface CreateResultDto {
    userId: number;
    caseDiagnosisId: number;
    caseType: number;
    result: string;
    description: string;
}

export interface CreateRecipeDto {
    userId: number;
    caseId: number;
    title: string;
    count: number;
    description: string;
    expiryTime: string;
    entryDate: string;
}

export interface UpdateAnimalDto {
    name: string;
    type: number;
}

export interface UpdateHealthRecordDto {
    heartRate: number;
    picture: string;
    description: string;
}

export interface UpdateCaseDto {
    status: number;
    urgency: number;
}
