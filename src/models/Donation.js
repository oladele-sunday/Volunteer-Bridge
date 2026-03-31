import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Donation = sequelize.define("Donation", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },

    donorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    reportId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    bankName: {         
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: "donations",
    timestamps: true,
});

export default Donation;