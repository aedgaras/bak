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
import {
    validateParamsId,
    validateSchema,
} from '../middleware/Validation.Middleware';
import { organizationSchema } from '../objects/dtos';
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
        validateSchema(organizationSchema),
    ],
    createOrganization
);

organizationRouter.put(
    '/:orgId',
    [
        authenticateToken,
        authenticateRole(['admin']),
        validateParamsId('orgId'),
        validateSchema(organizationSchema),
    ],
    updateOrganization
);

organizationRouter.delete(
    '/',
    [
        authenticateToken,
        authenticateRole(['admin']),
        validateSchema(deleteFormSchema),
    ],
    deleteOrganization
);
