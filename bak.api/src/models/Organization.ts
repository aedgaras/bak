import { DataTypes, Model } from 'sequelize';
import { db } from '../db/Config';
import { OrganizationEntityName } from '../utils/constants';
import { User } from "./User";

export class Organization extends Model {}

Organization.init(
    { name: { type: DataTypes.STRING, allowNull: false, unique: true } },
    { sequelize: db, modelName: OrganizationEntityName }
);

Organization.hasMany(User);