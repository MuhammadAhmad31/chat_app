export const mysql = require("mysql2");
require("dotenv").config();
const dbPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
})

dbPool.getConnection((err: { message: any; }, connection: { release: () => void; }) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        return;
    }  
    console.log('Connected to the database!');
    connection.release();
});

module.exports =  dbPool.promise()