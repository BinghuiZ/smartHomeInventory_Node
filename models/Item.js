const Sequelize = require('sequelize')
const db = require('../databbase/db')

module.exports = db.define(
    'items',
    {
        
        home_id:
        {
            type: 'INT(10)',
            allowNull: false,
            defaultValue: null,
            primaryKey: true,
            autoIncrement: true
        },
        address:
        {
            type: 'VARCHAR(255)',
            allowNull: false,
            defaultValue: null,
            primaryKey: false
        },
        district:
        {
            type: 'VARCHAR(255)',
            allowNull: false,
            defaultValue: null,
            primaryKey: false
        },
        latitude:
        {
            type: 'DECIMAL(19,0)',
            allowNull: false,
            defaultValue: null,
            primaryKey: false
        },
        longitude:
        {
            type: 'DECIMAL(19,0)',
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