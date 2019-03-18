const Sequelize = require('sequelize')
const db = require('../databbase/db')

module.exports = db.define(
    'shopping_list',
    {
        list_id:
        {
            type: 'INT(10)',
            allowNull: false,
            defaultValue: null,
            primaryKey: true,
            autoIncrement: true
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
        tableName: 'shopping_list',
        freezeTableName: true,
        timestamps: false
    }
)