import express from 'express';
import morgan from 'morgan';
import errorHandler from './src/middlewares/error.js';
import logger from './src/utils/logger.js';
import singRoute  from './src/route/singup.js';
import loginRoute from './src/route/login.js';
import userRoute from './src/route/user.js';

const app = express();

app.use(morgan('combined', {
    stream: {
        write: (message) => logger.info(message.trim())
    }
}))

app.use(express.json());


app.use('/singup', singRoute);
app.use('/login', loginRoute);
app.use('/user', userRoute);


app.use(errorHandler);

export default app;