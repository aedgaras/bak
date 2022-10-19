import cors from 'cors';
import express, { Express } from 'express';

export const configuredApp = (): Express => {
    const app: Express = express();

    app.use(express.json());
    app.use(
        cors({
            origin: '*',
        })
    );

    return app;
};
