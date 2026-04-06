import express from 'express';
import morgan from 'morgan';
import errorHandler from './src/middlewares/error.js';
import logger from './src/utils/logger.js';

const app = express();

app.use(morgan('combined', {
    stream: {
        write: (message) => logger.info(message.trim())
    }
}))

app.use(express.json());

app.use(errorHandler);

export default app;