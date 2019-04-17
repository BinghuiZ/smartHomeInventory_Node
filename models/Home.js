const Sequelize = require('sequelize')
const db = require('../databbase/db')

module.exports = db.define(
    'home',
    {
        
        home_id:
        {
            type: 'VARCHAR(255)',
            allowNull: false,
            defaultValue: null,
            primaryKey: true
        },
        address:
        {
            type: 'VARCHAR(255)',
            allowNull: false,
            defaultValue: null,
            primaryKey: false
        },
        latitude:
        {
            type: 'DOUBLE(19,15)',
            allowNull: true,
            defaultValue: null,
            primaryKey: false
        },
        longitude:
        {
            type: 'DOUBLE(19,15)',
            allowNull: true,
            defaultValue: null,
            primaryKey: false
        }
        
    },
    {
        tableName: 'home',
        freezeTableName: true,
        timestamps: false
    }
)