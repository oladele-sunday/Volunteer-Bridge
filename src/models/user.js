import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";
import bcrypt from "bcryptjs";
import Report from "./report.js";

class User extends Model {
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

User.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
        email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
        phone_number: { type: DataTypes.STRING, allowNull: true },
        password: { type: DataTypes.STRING, allowNull: false },
        isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
        isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
        role: {
            type: DataTypes.ENUM("volunteer", "admin", "superadmin", "project_manager", "finance", "donor"),
            defaultValue: "volunteer",
        },
        verifyToken: { type: DataTypes.STRING, allowNull: true },
        resetToken: { type: DataTypes.STRING, allowNull: true },
        resetTokenExpiry: { type: DataTypes.DATE, allowNull: true },
        lastLogin: { type: DataTypes.DATE, allowNull: true },
    },
    {
        timestamps: true,
        sequelize,
        modelName: "User",
        tableName: "users",
        hooks: {
            beforeCreate: async (user) => {
                if (user.password) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            },
            beforeUpdate: async (user) => {
                if (user.changed("password")) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            },
        },
    },
);


export default User;