import express from 'express';
import { login } from '../controller/auth.js';
import { loginValidate } from '../validate/validate.js';
import { validate } from '../middlewares/validate.js';
import { authLimiter } from '../middlewares/ratelimit.js';

const router = express.Router();

router.post('/', validate(loginValidate), authLimiter, login);

export default router;