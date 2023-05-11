import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();
const conn = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DATABASE,
    //default = false
    multipleStatements: false,
    // multipleStatements: true,
});

export default conn;
