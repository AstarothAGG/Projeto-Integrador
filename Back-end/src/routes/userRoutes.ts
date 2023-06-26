// routes/userRoutes.ts
import express from 'express';
import { registerUser } from '../controllers/UserController';

const router = express.Router();

router.post('/', registerUser);

export default router;
