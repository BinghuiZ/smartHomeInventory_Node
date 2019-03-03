const Sequelize = require('sequelize')
const db = {}
const sequelize = new Sequelize("fyp", "root", "root", {
    host: 'localhost',
    dialect: 'mysql',
    port: '8889',
    operatorsAliases: false,
    timezone: '+08:00',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    
    storage: 'path/to/database.sqlite'
})

sequelize
    .authenticate()
    .then(() => {
        result = {
            status: "success",
            message: "Connection has been established successfully."
        };
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        result = {
            status: "fail",
            message: "Unable to connect to the database: \n " + err
        };
        console.log('Unable to connect to the database: \n ' , err);
    });

// db.sequelize = sequelize
// db.Sequelize = Sequelize

module.exports = sequelize 