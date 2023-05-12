import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import sql from 'mssql';
import conn from './config/mysql';
import { config, connectDB } from './config/db';
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
    const string = 'users';
    const query: string = `SELECT * FROM ${string}`;
    const [rows] = await promisePool.query(query);
    return res.status(200).json(rows);
});

//sql injection
app.post('/login', async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
        const promisePool = conn.promise();
        const query: string = `SELECT * FROM users WHERE email=` + email;
        console.log(query);
        const [rows] = await promisePool.query(query);
        return res.status(200).json(rows);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }
    }
});
//test sql injection
app.post('/register', async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
        const promisePool = conn.promise();
        const query: string = `SELECT * FROM users WHERE email=${email}`;
        console.log(query);
        const [rows] = await promisePool.query(query);
        return res.status(200).json(rows);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }
    }
});

//mssql server test
app.get('/blogs', async (req: Request, res: Response) => {
    try {
        const pool = await sql.connect(config);
        const query = `SELECT * FROM blogs`;
        const rs = await pool.request().query(query);
        return res.status(200).json(rs.recordset);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }
    }
});

app.post('/blogs', async (req: Request, res: Response) => {
    const { id } = req.body;
    try {
        const pool = await sql.connect(config);
        const query = `SELECT * FROM blogs WHERE id =` + id;
        const rs = await pool.request().query(query);
        return res.status(200).json(rs.recordset);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }
    }
});
app.listen(port, async () => {
    await connectDB();
    console.log(`Server listening on http://localhost:${port}`);
}).on('error', (err: Error) => {
    console.log(err);
});
