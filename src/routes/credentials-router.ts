import { createCredential, deleteCredential, getAllCredential, specificCredentials } from "../controllers/credentialController";
import { Router } from "express";
import { authenticateToken } from "../middleware/tokenMiddleware";
import { validateSchema } from "../middleware/validateSchema";
import { registerCredential } from "../schema/credentialSchema";

const credentialRouter = Router();

credentialRouter.post("/",authenticateToken, validateSchema(registerCredential), createCredential);
credentialRouter.get("/", authenticateToken, getAllCredential);
credentialRouter.put("/:id",authenticateToken, specificCredentials);
credentialRouter.delete("/:id",authenticateToken,deleteCredential);


export default credentialRouter;