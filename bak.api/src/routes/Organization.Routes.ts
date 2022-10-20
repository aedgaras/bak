import express from 'express';
import { getOrganization, getOrganizationMembers, getOrganizations } from '../controllers/Organization.Controller';
import { authenticateToken } from '../middleware/Auth.Middleware';

export const organizationRouter = express.Router();

organizationRouter.get('/', [authenticateToken], getOrganizations);

organizationRouter.get('/members/:orgId', [authenticateToken], getOrganizationMembers);

organizationRouter.get('/:orgId', [authenticateToken], getOrganization);

