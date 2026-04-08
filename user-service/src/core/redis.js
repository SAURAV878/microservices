import { createClient } from "redis";
import logger from "../utils/logger.js";

const redis = createClient({
    url: "redis://localhost:6377"
});

redis.on('error', (err) => {
    logger.error('redis is not connected', err)
});

redis.on('connect', () => {
    logger.info('redis connected successfully')
})

await redis.connect();

export default redis;