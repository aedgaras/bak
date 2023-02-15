import cors from 'cors';
import express, { Express } from 'express';

/**
 * CORS and Json configured express application.
 * @returns express()
 */
export const configuredApp = (): Express => {
    const app: Express = express();

    app.use(express.json({ limit: 500000 }));
    app.use(express.urlencoded({ extended: true }));
    app.use(
        cors({
            origin: 'http://localhost:3000',
            credentials: true,
        })
    );

    return app;
};
