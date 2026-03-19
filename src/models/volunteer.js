import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./user.js";

const Volunteer = sequelize.define(
    "Volunteer",
    {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "user_id",
            unique: true, // One volunteer per user
        },
        skills: DataTypes.STRING,
        availability: DataTypes.STRING,
        status: {
            type: DataTypes.ENUM("active", "inactive"),
            defaultValue: "active",
        },
    },
    {
        tableName: "volunteers",
        timestamps: true,
        underscored: true,
    }
);

export default Volunteer;