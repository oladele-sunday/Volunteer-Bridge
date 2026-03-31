// donor.model.js

import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Donor extends Model {}

Donor.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: { isEmail: true },
        },

        phone_number: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        modelName: "Donor",
        tableName: "donors",
        timestamps: true,
    }
);
export default Donor;