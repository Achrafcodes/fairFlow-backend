import { Router } from 'express';
import { Register } from '../../controllers/auth/register.controller.js';
import { Login } from '../../controllers/auth/login.controller.js';

const router = Router();

router.post('/register', Register);
router.post('/login', Login);
export default router;
