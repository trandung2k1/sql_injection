import express, { Express, Request, Response } from 'express';
import conn from './config/mysql';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const port: number = parseInt(process.env.PORT!) || 4000;
const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.disable('x-powered-by');
app.get('/', (req: Request, res: Response) => {
    return res.status(200).json({
        message: 'Welcome to the server 👋👋',
    });
});
app.get('/users', async (req: Request, res: Response) => {
    const promisePool = conn.promise();
    const query: string = `SELECT * FROM users`;
    const [rows] = await promisePool.query(query);
    conn.end();
    return res.status(200).json(rows);
});
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
}).on('error', (err: Error) => {
    console.log(err);
});
