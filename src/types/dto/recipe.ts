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

export interface CreateRecipeDto {
    userId: number;
    caseId: number;
    title: string;
    count: number;
    description: string;
    expiryTime: string;
    entryDate: string;
}
