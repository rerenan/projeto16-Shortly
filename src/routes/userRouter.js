import { Router } from "express";
import signUpController from "../controllers/user/signUpController.js";
import signInController from "../controllers/user/signInController.js";

const userRouter = Router();

userRouter.post("/signup", signUpController);
userRouter.post("/signin", signInController);

export default userRouter;