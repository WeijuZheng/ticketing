import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@wztickets/common';

import { createChargeRouter } from './routes/create';


const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(
    cookieSession({
        signed: false,
        // when running jest, process.env.NODE_ENV will be set to 'test
        // secure: process.env.NODE_ENV !== 'test'
        secure: false
    })
);

app.use(currentUser);

app.use(createChargeRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };