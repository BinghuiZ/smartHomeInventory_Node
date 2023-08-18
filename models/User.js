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
        first_name:
        {
            type: 'VARCHAR(255)',
            allowNull: false,
            defaultValue: null,
            primaryKey: false
        },
        last_name:
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
            defaultValue: 2,
            primaryKey: false
        },
        home_id:
        {
            type: 'VARCHAR(255)',
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