import { DataTypes, Model } from 'sequelize';
import { OrganizationEntityName } from '../../../utils/constants';
import { db } from '../Config';

export class Organization extends Model {}

Organization.init(
    { name: { type: DataTypes.STRING, allowNull: false, unique: true } },
    { sequelize: db, modelName: OrganizationEntityName }
);
