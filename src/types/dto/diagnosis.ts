import { CaseDto } from './case';

export interface CreateDiagnosisDto {
    userId: number;
    caseId: number;
    caseType: number;
    diagnosis: string;
    description: string;
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

export interface UpdateDiagnosisDto {
    caseType: number;
    diagnosis: string;
    description: string;
}
