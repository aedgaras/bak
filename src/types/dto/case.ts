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

export interface CreateCaseDto {
    status: number;
    urgency: number;
    healthRecordId: number;
}

export interface UpdateCaseDto {
    status: number;
    urgency: number;
}
