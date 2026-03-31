// volunteer.model.js

import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";
import bcrypt from "bcryptjs";

class Volunteer extends Model {
    async comparePassword(plain) {
        return await bcrypt.compare(plain, this.password);
    }

    toJSON() {
        const values = { ...this.get() };
        delete values.password;
        return values;
    }
}

Volunteer.init(
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

        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        skills: {
            type: DataTypes.STRING,
        },

        availability: {
            type: DataTypes.STRING,
        },

        status: {
            type: DataTypes.ENUM("active", "inactive"),
            defaultValue: "active",
        },

        isVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        sequelize,
        modelName: "Volunteer",
        tableName: "volunteers",
        timestamps: true,
        underscored: true,

        hooks: {
            beforeCreate: async (volunteer) => {
                if (volunteer.password) {
                    const salt = await bcrypt.genSalt(10);
                    volunteer.password = await bcrypt.hash(volunteer.password, salt);
                }
            },
            beforeUpdate: async (volunteer) => {
                if (volunteer.changed("password")) {
                    const salt = await bcrypt.genSalt(10);
                    volunteer.password = await bcrypt.hash(volunteer.password, salt);
                }
            },
        },
    }
);

export default Volunteer;