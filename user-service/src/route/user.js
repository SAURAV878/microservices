import express from 'express';
import { protect } from '../middlewares/auth.js';
import { deleteUser, getUser, updateUser } from '../controller/user.js';

const router = express.Router();

router.get('/me', protect, getUser);

router.patch('/update/:id', protect, updateUser);

router.delete('/delete/:id', protect, deleteUser);

export default router;