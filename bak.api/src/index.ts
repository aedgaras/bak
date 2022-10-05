import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { PORT_API, sequelize } from './configuration/Configuration';

dotenv.config();

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
    const randomObj: { randomNumber: number; randomString: string } = {
        randomNumber: Math.random(),
        randomString: 'random' + Math.random(),
    };
    res.send(randomObj);
});

app.listen(PORT_API, async () => {
    console.log(
        `⚡️[server]: Server is running at http://localhost:${PORT_API}`
    );
    try {
        await sequelize.authenticate();
        console.log('aaa')
    } catch (e) {
        console.log('error' + e);
    }
});
