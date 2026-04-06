import logger from "../utils/logger.js";

const errorHandler = (req, res, next, err) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    logger.error({
        message: err.message,
        statusCode: err.statusCode,
        stack: err.stack,
        path: req.originalUrl
    });

    if(process.env.NODE_ENV === 'development') {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            stack: err.stack,
            error: err
        });
    } else {
        if (err.isOperational) {
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message
            });
        } else {
            res.status(500).json ({
                status: 'error',
                message: 'Somethig went wrong, Please try again'
            })
        }
    }

}

export default errorHandler;


