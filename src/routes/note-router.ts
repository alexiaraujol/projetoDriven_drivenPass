import { createNote, getAllNotes, specificNote } from "../controllers/noteController";
import { Router } from "express";
import { authenticateToken } from "../middleware/tokenMiddleware";
import { validateSchema } from "../middleware/validateSchema";
import { deleteNote } from "../repositories/notesRepository";
import { registerNote } from "../schema/notesSchema";

const safeNoteRouter = Router();

safeNoteRouter.post('/', authenticateToken, validateSchema(registerNote), createNote);
safeNoteRouter.get("/", authenticateToken, getAllNotes);
safeNoteRouter.get("/:id", authenticateToken, specificNote);
safeNoteRouter.delete("/:id", authenticateToken, deleteNote);

export default safeNoteRouter;