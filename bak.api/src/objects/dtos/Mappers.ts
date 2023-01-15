import { OrganizationDto } from ".";
import { Organization } from "../../configuration/db/models/Organization";

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
