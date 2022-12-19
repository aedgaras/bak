import cors from 'cors';
import express, { Express } from 'express';

/**
 * CORS and Json configured express application.
 * @returns express()
 */
export const configuredApp = (): Express => {
    const app: Express = express();

    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ limit: '50mb' }));
    app.use(
        cors({
            origin: 'http://localhost:3000',
            credentials: true,
        })
    );

    return app;
};
