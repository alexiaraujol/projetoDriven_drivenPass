import { Router } from "express";
import userRouter from "./user-router";
import credentialRouter from "./credentials-router";
import eraseRouter from "./erase-router";

const router = Router();
router.use("/user", userRouter);
router.use("/credentials", credentialRouter);
router.use("/erase", eraseRouter);
export default router; 