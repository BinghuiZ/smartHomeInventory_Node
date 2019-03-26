const Sequelize = require('sequelize')
const db = require('../databbase/db')

module.exports = db.define(
    'items',
    {
        name:
        {
            type: 'VARCHAR(255)',
            allowNull: false,
            defaultValue: null,
            primaryKey: false
        },
        barcode:
        {
            type: 'VARCHAR(255)',
            allowNull: false,
            defaultValue: null,
            primaryKey: true
        },
        image:
        {
            type: 'VARCHAR(255)',
            allowNull: true,
            defaultValue: null,
            primaryKey: false
        },
        type_id:
        {
            type: 'INT(10)',
            allowNull: false,
            defaultValue: null,
            primaryKey: false
        }
    },
    {
        tableName: 'items',
        freezeTableName: true,
        timestamps: false
    }
)