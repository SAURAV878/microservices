import express from 'express';
import { login } from '../controller/auth.js';
import { loginValidate } from '../validate/validate.js';
import { validate } from '../middlewares/validate.js';

const router = express.Router();

router.post('/login', validate(loginValidate), login);

export default router;