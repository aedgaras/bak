import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { PORT_API } from './configuration/Configuration';
import cors from 'cors';
import { userRouter } from './routes/User.Routes';
import { authRouter } from './routes/Authentication.Routes';
import { db } from './db/Config';

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(
    cors({
        origin: '*',
    })
);

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

app.listen(PORT_API, async () => {
    await db.sync({ alter: true });
    console.log(
        `⚡️[server]: Server is running at http://localhost:${PORT_API}`
    );
});
