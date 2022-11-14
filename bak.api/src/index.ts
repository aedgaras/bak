import { Express } from 'express';
import { configuredApp } from './configuration/App';
import { db } from './db/Config';
import { seedInitialEntities } from './db/seed/InitialData';
import { authRouter } from './routes/Authentication.Routes';
import { organizationRouter } from './routes/Organization.Routes';
import { userRouter } from './routes/User.Routes';
import { API_PORT } from './utils/constants';

const app: Express = configuredApp();

/**
 * Routers with controllers.
 */
app.use('/api/organizations', organizationRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

/**
 * Active application.
 */
app.listen(API_PORT, async () => {
    await db.sync({ force: true });

    await seedInitialEntities();

    console.log(
        `⚡️[server]: Server is running at http://localhost:${API_PORT}`
    );
});
