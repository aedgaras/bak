export interface RecipeDto {
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

export interface UpdateRecipeDto {
    userId: number;
    caseId: number;
    title: string;
    count: number;
    description: string;
    expiryTime?: string;
    entryDate?: string;
}
