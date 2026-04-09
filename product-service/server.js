import app from "./app.js";
import database from "./src/core/database.js"
import logger from "./src/utils/logger.js";

const PORT = process.env.PORT || 8001;

const startServer = async () => {
    

    const server = app.listen(PORT, () => {
        logger.info(`Product Service is  ruuning on port ${PORT}`);
    });

    await database.connect();

    process.on('SIGTERM', () => {
        logger.info('SIGTREM received, shutting down');
        server.close(() => {
            process.exit(0);
        });
    });
};

startServer();