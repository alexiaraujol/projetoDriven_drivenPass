import { postSignIn } from "controllers/signIn-controller";
import { postSignUp } from "controllers/signUp-controller";
import { Router } from "express";

const userRouter = Router();

    userRouter.post("/signIn",postSignIn);
    userRouter.post("/signUp", postSignUp);

export default userRouter;