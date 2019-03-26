const Sequelize = require('sequelize')
const db = require('../databbase/db')

module.exports = db.define(
    'house_stock',
    {

        stock_id:
        {
            type: 'INT(10)',
            allowNull: false,
            defaultValue: null,
            primaryKey: true,
            autoIncrement: true
        },
        home_id:
        {
            type: 'VARCHAR(255)',
            allowNull: false,
            defaultValue: null,
            primaryKey: false
        }

    },
    {
        tableName: 'house_stock',
        freezeTableName: true,
        timestamps: false
    }
)