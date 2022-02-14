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

// const sequelize = new Sequelize("heroku_af94489beda5846", "b0cf461c9b8d87", "46f23291", {
//     host: 'us-cdbr-iron-east-02.cleardb.net',
//     dialect: 'mysql',
//     port: '3306',
//     operatorsAliases: false,
//     timezone: '+08:00',

//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     },
    
//     storage: 'path/to/database.sqlite'
// })

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