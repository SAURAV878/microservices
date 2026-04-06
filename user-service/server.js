import app from "./app.js";
import database from "./src/core/database.js"
import logger from "./src/utils/logger.js";

const PORT = process.env.PORT || 8000;

const startServer = async () => {
    await database.connect();

    const server = app.listen(PORT, () => {
        logger.info(`User Service is  ruuning on port ${PORT}`);
    });

    process.on('SIGTERM', () => {
        logger.info('SIGTREM received, shutting down');
        server.close(() => {
            process.exit(0);
        });
    });
};

startServer();