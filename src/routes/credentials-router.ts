import { Router } from "express";

const credentialRouter = Router();

credentialRouter.post("/");
credentialRouter.get("/");
credentialRouter.put("/:id");
credentialRouter.delete("/:id");


export default credentialRouter;