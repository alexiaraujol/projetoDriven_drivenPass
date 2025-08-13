import { Router } from "express";
import { validateSchema } from "../middleware/validateSchema";
import * as authController from "../schema/userSchema";
import { signIn, signUp } from "../controllers/authController";

const userRouter = Router();

    userRouter.post("/signIn",validateSchema(authController.signInSchema), signIn);
    userRouter.post("/signUp",validateSchema(authController.signUpSchema), signUp);

export default userRouter;