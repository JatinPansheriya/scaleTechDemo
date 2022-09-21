const mysql = require("mysql");
const config = require("./config");

const dbConfig = config.database;

const connection = mysql.createConnection({
    host: dbConfig.DB_HOST,
    user:dbConfig.DB_USER,
    port:dbConfig.DB_PORT,
    password: dbConfig.DB_PASSWORD,
    database: dbConfig.DB_NAME
})

connection.connect((err) => {
    if(err) throw err;
    console.log("Database server connected");
})

module.exports = connection;
