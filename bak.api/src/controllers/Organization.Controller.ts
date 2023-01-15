import { Request, Response } from 'express';
import { Organization } from '../configuration/db/models/Organization';
import { User } from '../configuration/db/models/User';
import {
    MapOrganization,
    MapOrganizations,
    MapUsers,
} from '../objects/dtos/Mappers';
import { deleteFormSchema, parseSchema } from '../objects/Schema';
import { OrganizationEntityName } from '../utils/constants';
import {
    ENTITY_ALREADY_EXIST,
    ENTITY_DELETED,
    ENTITY_NOT_FOUND,
    ENTITY_UPDATED,
    Forbiden,
    ListResponse,
    NotFound,
    Ok,
    pagingQueryExists,
    RequestQueryPagination,
} from '../utils/response';
import { entityIdFromParameter } from '../utils/utils';

interface OrganizationDto {
    name: string;
}

export const getOrganizations = async (req: Request, res: Response) => {
    const paging: RequestQueryPagination = {
        limit: Number(req.query.limit),
        offset: Number(req.query.offset),
    };

    const organizations = await Organization.findAndCountAll(
        pagingQueryExists(paging) ? { ...paging } : {}
    );

    return Ok(
        res,
        ListResponse(
            paging,
            organizations.count,
            MapOrganizations(organizations.rows)
        )
    );
};

export const getOrganizationMembers = async (req: Request, res: Response) => {
    const orgId = entityIdFromParameter(req, 'orgId');

    const paging: RequestQueryPagination = {
        limit: Number(req.query.limit),
        offset: Number(req.query.offset),
    };

    const users = await User.findAndCountAll(
        pagingQueryExists(paging)
            ? {
                  where: {
                      OrganizationId: orgId,
                  },
                  ...paging,
              }
            : {
                  where: {
                      OrganizationId: orgId,
                  },
              }
    );

    return Ok(res, ListResponse(paging, users.count, MapUsers(users.rows)));
};

export const getOrganization = async (req: Request, res: Response) => {
    const orgId = entityIdFromParameter(req, 'orgId');

    const organization = await Organization.findByPk(orgId);

    if (!organization) {
        return NotFound(res, ENTITY_NOT_FOUND(OrganizationEntityName));
    } else {
        return Ok(res, MapOrganization(organization));
    }
};

export const getByOrgName = async (req: Request, res: Response) => {
    const paramOrgName = req.params['orgName'];

    const orgEntity = await Organization.findOne({
        where: {
            name: paramOrgName,
        },
    });

    if (!orgEntity) {
        return NotFound(res, ENTITY_NOT_FOUND(OrganizationEntityName));
    } else {
        return Ok(res, MapOrganization(orgEntity));
    }
};

export const createOrganization = async (req: Request, res: Response) => {
    const newOrganization: OrganizationDto = {
        name: req.body.name,
    };

    const existingOrganization = await Organization.findOne({
        where: {
            name: newOrganization.name,
        },
    });

    if (existingOrganization) {
        return Forbiden(res, ENTITY_ALREADY_EXIST(OrganizationEntityName));
    } else {
        const createdOrganization = await Organization.create({
            ...newOrganization,
        });

        await createdOrganization.save();

        return Ok(res);
    }
};

export const updateOrganization = async (req: Request, res: Response) => {
    const orgId = entityIdFromParameter(req, 'orgId');

    const existingOrg = await Organization.findByPk(orgId);

    if (existingOrg) {
        const updatedOrg: OrganizationDto = {
            name: req.body.name,
        };

        existingOrg.update({ ...updatedOrg });

        await existingOrg.save();

        return Ok(res, ENTITY_UPDATED(OrganizationEntityName, orgId));
    } else {
        return NotFound(res, ENTITY_NOT_FOUND(OrganizationEntityName));
    }
};

export const deleteOrganization = async (req: Request, res: Response) => {
    const org: { id: number } = { ...req.body };

    const organization = await Organization.findByPk(org.id);

    if (!organization) {
        return NotFound(res, ENTITY_NOT_FOUND(OrganizationEntityName));
    } else {
        await organization.destroy();

        await organization.save();

        return Ok(res, ENTITY_DELETED(OrganizationEntityName, org.id));
    }
};
