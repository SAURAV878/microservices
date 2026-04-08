import rateLimit from "express-rate-limit";
import redis from "../core/redis.js";
import RedisStore from 'rate-limit-redis';

export const authLimiter = rateLimit ({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many requests, try again later",

    store: new RedisStore({
        sendCommand: (...args) => redis.sendCommand(args),
    }),
})