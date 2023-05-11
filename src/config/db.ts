const sql = require('mssql');
const colors = require('colors');
export const config = {
    user: process.env.USERMSSQL,
    password: process.env.PASSWORD,
    server: process.env.HOST,
    database: process.env.DBMSSQL,
    options: {
        enableArithAbort: true,
        trustServerCertificate: true,
    },
    port: +process.env.PORTDB!,
};
export const connectDB = async () => {
    try {
        let pool = await sql.connect(config);
        console.log(colors.green('SQL Server connected successfully'));
    } catch (error) {
        console.log(colors.red(`Error: ${error}`));
    }
};
