import { Router } from "express";
import { Register } from "../../controllers/auth/register.controller";

const router = Router();

router.post("/register", Register());

export default router;
