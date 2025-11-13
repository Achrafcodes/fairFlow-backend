import { Router } from 'express';
import { verifyTokens } from '../../middlewares/refreshaccess.controller.js';
import { UserRoute } from '../../controllers/user/user.controller.js';
const router = Router();

router.get('/user', verifyTokens, UserRoute);
export default router;
