import { Router } from "express";
import { authenticateToken } from "../middleware/tokenMiddleware";
import { validateSchema } from "../middleware/validateSchema";
import { registerCard } from "../schema/cardSchema";
import { createCard, deleteCard, getAllCards, specificCard } from "../controllers/cardController";


const cardRouter = Router();

cardRouter.post('/', authenticateToken, validateSchema(registerCard), createCard);
cardRouter.get("/", authenticateToken, getAllCards);
cardRouter.get("/:id", authenticateToken, specificCard);
cardRouter.delete("/:id", authenticateToken, deleteCard);

export default cardRouter;