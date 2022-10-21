import { Request, Response } from 'express';
import { Organization } from '../models/Organization';
import { User } from '../models/User';
import { OrganizationEntityName } from '../utils/constants';
import { ENTITY_NOT_FOUND } from '../utils/response/ResponseTexts';
import { returnMessage } from '../utils/response/ResponseUtils';

export const getOrganizations = async (req: Request, res: Response) => {
    const organizations = await Organization.findAll();

    return res.json(organizations);
};

export const getOrganizationMembers = async (req: Request, res: Response) => {
    const orgId: number = Number(req.params['orgId']);

    const users = await User.findAll({
        where: {
            OrganizationId: orgId,
        },
    });

    return res.json(users);
};

export const getOrganization = async (req: Request, res: Response) => {
    const orgId: number = Number(req.params['orgId']);

    const organization = await Organization.findByPk(orgId);

    if (!organization) {
        return res.json(
            returnMessage(ENTITY_NOT_FOUND(OrganizationEntityName))
        );
    } else {
        return res.json(organization);
    }
};
