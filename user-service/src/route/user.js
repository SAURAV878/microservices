import express from 'express';
import { protect } from '../middlewares/auth.js';
import { deleteUser, getUser, updateUser } from '../controller/user.js';
import { authLimiter } from '../middlewares/ratelimit.js';


const router = express.Router();

router.get('/', protect, authLimiter, getUser);

router.patch('/:id', protect, authLimiter, updateUser);

router.delete('/:id', protect, authLimiter,  deleteUser);

export default router;