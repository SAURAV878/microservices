import express from 'express';
import { signUp } from '../controller/auth.js';
import { validate} from '../middlewares/validate.js';
import { signValidate } from '../validate/validate.js';
import { authLimiter } from '../middlewares/ratelimit.js';

const router = express.Router();

router.post('/', validate(signValidate), authLimiter, signUp);

export default router;