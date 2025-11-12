import { Router } from "express";
import AuthRouter from "./auth/auth.router.js";
const router = Router();

router.use("/auth", AuthRouter);
export default router;
