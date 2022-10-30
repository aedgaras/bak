import express from 'express';
import {
    createOrganization,
    deleteOrganization,
    getOrganization,
    getOrganizationMembers,
    getOrganizations,
    updateOrganization,
} from '../controllers/Organization.Controller';
import { authenticateToken } from '../middleware/Auth.Middleware';

export const organizationRouter = express.Router();

organizationRouter.get('/', [authenticateToken], getOrganizations);

organizationRouter.get(
    '/members/:orgId',
    [authenticateToken],
    getOrganizationMembers
);

organizationRouter.get('/:orgId', [authenticateToken], getOrganization);

organizationRouter.post('/', [authenticateToken], createOrganization);

organizationRouter.put('/:orgId', [authenticateToken], updateOrganization);

organizationRouter.delete('/:orgId', [authenticateToken], deleteOrganization);
