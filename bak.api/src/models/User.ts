import { DataTypes } from "sequelize";
import { sequelize } from "../configuration/Configuration";

export interface UserModel {
  username: string;
  password: string;
}

export const User = sequelize.define('User', {
    // Model attributes are defined here
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    // Other model options go here
  });
