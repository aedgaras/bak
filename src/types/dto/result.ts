import { DiagnosisDto } from './diagnosis';

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

export interface CreateResultDto {
    userId: number;
    caseDiagnosisId: number;
    caseType: number;
    result: string;
    description: string;
}
