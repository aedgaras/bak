import { Request, Response } from "express";
import { Organization } from "../models/Organization";

export const getOrganizations = async (req: Request, res: Response) => {
    const organizations = await Organization.findAll();

    return res.json(organizations);
};
