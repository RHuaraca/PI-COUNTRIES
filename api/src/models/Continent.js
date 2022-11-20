const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('continent', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, { timestamps: false });
};