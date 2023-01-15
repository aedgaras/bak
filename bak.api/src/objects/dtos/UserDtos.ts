import { BaseDto } from '.';
import { User } from '../../configuration/db/models/User';
import { Role } from '../Roles';



export interface UserDto extends BaseDto {
    username: string;
    role: Role;
    name: string | undefined;
    lastname: string | undefined;
    email: string | undefined;
    avatar: string | undefined;
    organizationId: number;
}

export function MapUsers(userEntities: User[]): UserDto[] {
    const userDtos: UserDto[] = [];

    userEntities.forEach((x) => {
        userDtos.push({
            id: x.getDataValue('id'),
            username: x.getDataValue('username'),
            role: x.getDataValue('role'),
            name: x.getDataValue('name'),
            lastname: x.getDataValue('lastname'),
            email: x.getDataValue('email'),
            avatar: x.getDataValue('avatar'),
            organizationId: x.getDataValue('organizationId'),
        });
    });

    return userDtos;
}

export function MapUser(entity: User): UserDto {
    return {
        id: entity.getDataValue('id'),
        username: entity.getDataValue('username'),
        role: entity.getDataValue('role'),
        name: entity.getDataValue('name'),
        lastname: entity.getDataValue('lastname'),
        email: entity.getDataValue('email'),
        avatar: entity.getDataValue('avatar'),
        organizationId: entity.getDataValue('organizationId'),
    };
}
