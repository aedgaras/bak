import { AnimalDto } from './animal';

export interface UpdateHealthRecordDto {
    heartRate: number;
    picture: string;
    description: string;
}

export interface HealthRecordDto {
    id: string;
    heartRate: string;
    description: string;
    entryDate: string;
    animal?: AnimalDto;
}

export interface CreateHealthRecordDto {
    heartRate: number;
    description: string;
    animalId: number;
}
