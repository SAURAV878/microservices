import express from 'express';
import { signUp } from '../controller/auth.js';
import { validate} from '../middlewares/validate.js';
import { signValidate } from '../validate/validate.js';

const router = express.Router();

router.post('/signup', validate(signValidate), signUp);

export default router;