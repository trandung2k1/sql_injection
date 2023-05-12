import sql from 'mssql';
import colors from 'colors';
const USER = process.env.USERMSSQL!;
const PASSWORD = process.env.PASSWORD!;
const SERVER = process.env.HOST!;
const DATABASE = process.env.DBMSSQL!;
const PORT = process.env.PORTDB!;
export const config = {
    user: USER,
    password: PASSWORD,
    server: SERVER,
    database: DATABASE,
    port: +PORT,
    options: {
        enableArithAbort: true,
        trustServerCertificate: true,
    },
};
export const connectDB = async () => {
    try {
        await sql.connect(config);
        console.log(colors.green('SQL Server connected successfully'));
    } catch (error) {
        console.log(colors.red(`Error: ${error}`));
    }
};
