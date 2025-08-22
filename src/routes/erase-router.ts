import { Router } from "express";

import { eraseAllUsers } from "../controllers/eraseController";

const eraseRouter = Router();

eraseRouter.delete("/delete-all-users", eraseAllUsers);

export default eraseRouter;