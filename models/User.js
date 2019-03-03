const Sequelize = require('sequelize')
const db = require('../databbase/db')

module.exports = db.define(
    'user',
    {
        id:
        {
            type: 'INT(10)',
            allowNull: false,
            defaultValue: null,
            primaryKey: true,
            autoIncrement: true
        },
        name:
        {
            type: 'VARCHAR(255)',
            allowNull: false,
            defaultValue: null,
            primaryKey: false
        },
        email:
        {
            type: 'VARCHAR(255)',
            allowNull: false,
            defaultValue: null,
            primaryKey: false
        },
        password:
        {
            type: 'VARCHAR(255)',
            allowNull: false,
            defaultValue: null,
            primaryKey: false
        },
        permission_id:
        {
            type: 'INT(10)',
            allowNull: true,
            defaultValue: null,
            primaryKey: false
        },
        home_id:
        {
            type: 'INT(10)',
            allowNull: true,
            defaultValue: null,
            primaryKey: false
        }
    },
    {
        tableName: 'user',
        freezeTableName: true,
        timestamps: false
    }
)