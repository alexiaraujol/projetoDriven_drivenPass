import { Router } from "express";
import userRouter from "./user-router";
import credentialRouter from "./credentials-router";
import safeNoteRouter from "./note-router";
import cardRouter from "./card-router";
import eraseRouter from "./erase-router";

const router = Router();


router.use("/user", userRouter);
router.use("/credentials", credentialRouter);
router.use("/safenote", safeNoteRouter);
router.use("/card", cardRouter);
router.use("/admin", eraseRouter);
export default router; 