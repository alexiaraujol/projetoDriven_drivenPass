import { Router } from "express";
import userRouter from "./user-router";
import credentialRouter from "./credentials-router";
import eraseRouter from "./erase-router";
import safeNoteRouter from "./note-router";
import cardRouter from "./card-router";

const router = Router();


router.use("/user", userRouter);
router.use("/credentials", credentialRouter);
router.use("/safenote", safeNoteRouter);
router.use("/card", cardRouter);
router.use("/erase", eraseRouter);
export default router; 