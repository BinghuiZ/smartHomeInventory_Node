const Sequelize = require('sequelize')
const db = require('../databbase/db')

module.exports = db.define(
    'house_stock_items',
    {

        id:
        {
            type: 'INT(10)',
            allowNull: false,
            defaultValue: null,
            primaryKey: true,
            autoIncrement: true
        },
        stock_id:
        {
            type: 'INT(10)',
            allowNull: false,
            defaultValue: null,
            primaryKey: false
        },
        barcode:
        {
            type: 'VARCHAR(255)',
            allowNull: false,
            defaultValue: null,
            primaryKey: false
        },
        quantity:
        {
            type: 'INT(10)',
            allowNull: false,
            defaultValue: null,
            primaryKey: false
        }

    },
    {
        tableName: 'house_stock_items',
        freezeTableName: true,
        timestamps: false
    }
)