import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { PORT_API, sequelize } from './configuration/Configuration';
import { User } from './models/User';
import cors from 'cors';
import { userRouter } from './routes/User.Routes';

dotenv.config();

const app: Express = express();

app.use(
    cors({
        origin: '*',
    })
);

app.use('/api/users', userRouter);

app.get('/', async (req: Request, res: Response) => {
    const usersLength = (await User.findAll()).length;

    if (usersLength > 0) {
        res.send(await User.findAll());
    }
    const newUser = await User.create({
        username: 'username',
        password: 'password',
    });

    return res.send(newUser);
});

app.listen(PORT_API, async () => {
    console.log(
        `⚡️[server]: Server is running at http://localhost:${PORT_API}`
    );
});
