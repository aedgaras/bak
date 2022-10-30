export interface UserModel {
    id: string;
    username: string;
    password: string;
    role: Role;
    createdAt: string;
    updatedAt: string;
}

export type Role = 'admin' | 'user';

export interface ListResponse<T> {
    count: number;
    rows: T;
}
