import { Request, Response } from 'express';
import { OrganizationDto } from '../dto/Organization';
import { Organization } from '../models/Organization';
import { User } from '../models/User';
import { OrganizationEntityName } from '../utils/constants';
import {
    entityIdFromParameter,
    ListResponse,
    pagingQueryExists,
    RequestQueryPagination,
} from '../utils/request';
import {
    ENTITY_ALREADY_EXIST,
    ENTITY_DELETED,
    ENTITY_DOESNT_EXIST,
    ENTITY_NOT_FOUND,
    ENTITY_UPDATED,
} from '../utils/response';

export const getOrganizations = async (req: Request, res: Response) => {
    const paging: RequestQueryPagination = {
        limit: Number(req.query.limit),
        offset: Number(req.query.offset),
    };

    const organizations = await Organization.findAndCountAll(
        pagingQueryExists(paging) ? { ...paging } : {}
    );

    return res.json(
        ListResponse(paging, organizations.count, organizations.rows)
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

    return res.json(ListResponse(paging, users.count, users.rows));
};

export const getOrganization = async (req: Request, res: Response) => {
    const orgId = entityIdFromParameter(req, 'orgId');

    const organization = await Organization.findByPk(orgId);

    if (!organization) {
        return res.json(ENTITY_NOT_FOUND(OrganizationEntityName));
    } else {
        return res.json(organization);
    }
};

export const getByOrgName = async (req: Request, res: Response) => {
    const paramOrgName = req.params['orgName'];

    const org = await Organization.findOne({
        where: {
            name: paramOrgName,
        },
    });

    if (!org) {
        return res.json(ENTITY_NOT_FOUND(OrganizationEntityName));
    } else {
        return res.json(org);
    }
};

export const createOrganization = async (req: Request, res: Response) => {
    const newOrganization: OrganizationDto = {
        name: req.body.name as string,
    };

    const existingOrganization = await Organization.findOne({
        where: {
            name: newOrganization.name,
        },
    });

    if (existingOrganization) {
        return res
            .status(403)
            .json(ENTITY_ALREADY_EXIST(OrganizationEntityName));
    } else {
        const createdOrganization = await Organization.create({
            ...newOrganization,
        });

        await createdOrganization.save();

        return res.sendStatus(200);
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

        return res
            .status(200)
            .json(ENTITY_UPDATED(OrganizationEntityName, orgId));
    } else {
        return res.json(ENTITY_DOESNT_EXIST(OrganizationEntityName));
    }
};

export const deleteOrganization = async (req: Request, res: Response) => {
    const orgId = entityIdFromParameter(req, 'orgId');

    const organization = await Organization.findByPk(orgId);

    if (!organization) {
        return res.json(ENTITY_NOT_FOUND(OrganizationEntityName));
    } else {
        await organization.destroy();

        await organization.save();

        return res
            .status(200)
            .json(ENTITY_DELETED(OrganizationEntityName, orgId));
    }
};
