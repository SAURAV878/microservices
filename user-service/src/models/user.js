import { DataTypes } from "sequelize";
import bcrypt from 'bcrypt';
import database from '../core/database.js'


const User = database.sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true}
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('customer', 'seller', 'admin'),
        defaultValue: 'customer',
        allowNull: false
    }
}, {
    timestamps: true,
    hooks: {
        beforeCreate: async(user) => {
            if (user.password) {
                user.password = await bcrypt.hash(user.password, 12);
            }
        }
    }
});


export default User;
