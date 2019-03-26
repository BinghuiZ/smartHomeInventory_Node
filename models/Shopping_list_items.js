const Sequelize = require('sequelize')
const db = require('../databbase/db')

module.exports = db.define(
    'shopping_list_items',
    {
        list_id:
        {
            type: 'INT(10)',
            allowNull: false,
            defaultValue: null,
            primaryKey: false
        },
        purchase_quantity:
        {
            type: 'INT(10)',
            allowNull: false,
            defaultValue: null,
            primaryKey: false
        },
        resupplyNo:
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
        }
    },
    {
        tableName: 'shopping_list_items',
        freezeTableName: true,
        timestamps: false
    }
)