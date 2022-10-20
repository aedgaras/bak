import { Request, Response } from 'express';
import { Organization } from '../models/Organization';
import { User } from '../models/User';

export const getOrganizations = async (req: Request, res: Response) => {
    const organizations = await Organization.findAll();

    return res.json(organizations);
};

export const getOrganizationMembers = async (req: Request, res: Response) => {
    const orgId: number = Number(req.params['orgId']);
    
    const users = await User.findAll({
        where: {
            OrganizationId: orgId,
        }
    })

    return res.json(users);
};

export const getOrganization = async (req: Request, res: Response) => {
    const orgId: number = Number(req.params['orgId']);
    
    const organization = await Organization.findByPk(orgId);

    return res.json(organization);
}
