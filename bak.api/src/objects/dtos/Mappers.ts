import { OrganizationDto, UserDto } from '.';
import { Organization } from '../../configuration/db/models/Organization';
import { User } from '../../configuration/db/models/User';

export function MapOrganizations(entities: Organization[]): OrganizationDto[] {
    const dtos: OrganizationDto[] = [];

    entities.forEach((x) => {
        dtos.push({
            id: x.getDataValue('id'),
            name: x.getDataValue('name'),
        });
    });

    return dtos;
}

export function MapOrganization(entity: Organization): OrganizationDto {
    return {
        id: entity.getDataValue('id'),
        name: entity.getDataValue('name'),
    };
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
