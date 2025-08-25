import { Router } from "express";

import { eraseUsers } from "../controllers/eraseController";
import { authenticateToken } from "../middleware/tokenMiddleware";

const eraseRouter = Router();

eraseRouter.delete("/user/:id", authenticateToken, eraseUsers);

export default eraseRouter;