import express from "express";
import { getOrganizations } from "../controllers/Organization.Controller";
import { authenticateToken } from "../middleware/Auth.Middleware";

export const organizationRouter = express.Router();

organizationRouter.get('/', [authenticateToken], getOrganizations);