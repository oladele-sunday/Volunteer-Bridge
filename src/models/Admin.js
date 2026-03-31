// admin.model.js

import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";
import bcrypt from "bcryptjs";

class Admin extends Model {
    async comparePassword(plain) {
        return await bcrypt.compare(plain, this.password);
    }

    toJSON() {
        const values = { ...this.get() };
        delete values.password;
        delete values.resetToken;
        delete values.verifyToken;
        return values;
    }
}

Admin.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

        name: { 
            type: DataTypes.STRING, 
            allowNull: false, 
            validate: { notEmpty: true } 
        },

        email: { 
            type: DataTypes.STRING, 
            allowNull: false, 
            unique: true, 
            validate: { isEmail: true } 
        },

        phone_number: { 
            type: DataTypes.STRING, 
            allowNull: true 
        },

        password: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },

        isActive: { 
            type: DataTypes.BOOLEAN, 
            defaultValue: true 
        },

        isVerified: { 
            type: DataTypes.BOOLEAN, 
            defaultValue: true // admins usually pre-verified
        },

        role: {
            type: DataTypes.ENUM("admin", "superadmin"),
            defaultValue: "admin",
        },

        verifyToken: { type: DataTypes.STRING, allowNull: true },
        resetToken: { type: DataTypes.STRING, allowNull: true },
        resetTokenExpiry: { type: DataTypes.DATE, allowNull: true },
        lastLogin: { type: DataTypes.DATE, allowNull: true },
    },
    {
        timestamps: true,
        sequelize,
        modelName: "Admin",
        tableName: "admins",

        hooks: {
            beforeCreate: async (admin) => {
                if (admin.password) {
                    const salt = await bcrypt.genSalt(10);
                    admin.password = await bcrypt.hash(admin.password, salt);
                }
            },
            beforeUpdate: async (admin) => {
                if (admin.changed("password")) {
                    const salt = await bcrypt.genSalt(10);
                    admin.password = await bcrypt.hash(admin.password, salt);
                }
            },
        },
    }
);

export default Admin;