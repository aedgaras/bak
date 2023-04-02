import { Classification, Role } from "../Models";

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

export interface UserModel {
  id: string;
  username: string;
  password: string;
  role: Role;
  classification: Classification;
}
