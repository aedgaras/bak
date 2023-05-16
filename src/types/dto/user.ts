export type UserRegisterDto = {
    username: string;
    password: string;
    phoneNumber: string;
    email: string;
};

export interface UserCreateDto {
    username: string;
    password: string;
    phoneNumber: string;
    email: string;
    role: number;
    classification: number;
}

export interface UserDto {
    id: string;
    username: string;
    password: string;
    phoneNumber: string;
    email: string;
    role: number;
    classification: number;
}

export interface UpdateUserDto {
    username: string;
    phoneNumber: string;
    email: string;
    role: number;
    classification: number;
}

export interface UpdateProfileDto {
    username: string;
    phoneNumber: string;
    email: string;
}

export interface ChangePasswordDto {
    oldPassword: string;
    newPassword: string;
    newPasswordRepeated: string;
}
