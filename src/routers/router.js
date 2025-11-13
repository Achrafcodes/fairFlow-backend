import { Router } from 'express';
import AuthRouter from './auth/auth.router.js';
import UserRouter from './user/user.router.js';
const router = Router();

router.use('/auth', AuthRouter);
router.use('/user', UserRouter);
export default router;
