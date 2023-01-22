import express from 'express';
import {
    addUsers,
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
import {
    validateBodySchema,
    validateParamsId,
} from '../middleware/Validation.Middleware';
import { organizationSchema, usersOrganizationSchema } from '../objects/dtos';
import { deleteFormSchema } from '../objects/Schema';

export const organizationRouter = express.Router();

organizationRouter.get('/', [authenticateToken], getOrganizations);

organizationRouter.get(
    '/members/:orgId',
    [authenticateToken, validateParamsId('orgId')],
    getOrganizationMembers
);

organizationRouter.get(
    '/:orgId',
    [authenticateToken, validateParamsId('orgId')],
    getOrganization
);
organizationRouter.get(
    '/getByName/:orgName',
    [authenticateToken],
    getByOrgName
);

organizationRouter.post(
    '/',
    [
        authenticateToken,
        authenticateRole(['admin']),
        validateBodySchema(organizationSchema),
    ],
    createOrganization
);

organizationRouter.put(
    '/:orgId',
    [
        authenticateToken,
        authenticateRole(['admin']),
        validateParamsId('orgId'),
        validateBodySchema(organizationSchema),
    ],
    updateOrganization
);

organizationRouter.delete(
    '/',
    [
        authenticateToken,
        authenticateRole(['admin']),
        validateBodySchema(deleteFormSchema),
    ],
    deleteOrganization
);

organizationRouter.post(
    '/:orgId/addUsers',
    [
        authenticateToken,
        authenticateRole(['admin']),
        validateParamsId('orgId'),
        validateBodySchema(usersOrganizationSchema),
    ],
    addUsers
);
