export interface UpdateAnimalDto {
    name: string;
    type: number;
}

export interface AnimalDto {
    id: string;
    name: string;
    type: number;
    userId?: number;
}

export interface CreateAnimalDto {
    name: string;
    type: number;
    userId: number;
}
