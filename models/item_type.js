const Sequelize = require('sequelize')
const db = require('../databbase/db')

module.exports = db.define(
    'item_type',
    {

        type_id:
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
        }

    },
    {
        tableName: 'ite,_type',
        freezeTableName: true,
        timestamps: false
    }
)