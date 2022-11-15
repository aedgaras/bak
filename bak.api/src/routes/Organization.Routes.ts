import express from 'express';
import {
    createOrganization,
    deleteOrganization,
    getByOrgName,
    getOrganization,
    getOrganizationMembers,
    getOrganizations,
    updateOrganization,
} from '../controllers/Organization.Controller';
import {
    authenticateRole,
    authenticateToken,
} from '../middleware/Auth.Middleware';

export const organizationRouter = express.Router();

organizationRouter.get('/', [authenticateToken], getOrganizations);

organizationRouter.get(
    '/members/:orgId',
    [authenticateToken],
    getOrganizationMembers
);

organizationRouter.get('/:orgId', [authenticateToken], getOrganization);
organizationRouter.get(
    '/getByName/:orgName',
    [authenticateToken],
    getByOrgName
);

organizationRouter.post(
    '/',
    [authenticateToken, authenticateRole(['admin'])],
    createOrganization
);

organizationRouter.put(
    '/:orgId',
    [authenticateToken, authenticateRole(['admin'])],
    updateOrganization
);

organizationRouter.delete(
    '/',
    [authenticateToken, authenticateRole(['admin'])],
    deleteOrganization
);
