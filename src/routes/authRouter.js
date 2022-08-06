import { Router } from "express";
import signUpController from "../controllers/user/signUpController.js";
import signInController from "../controllers/user/signInController.js";

const authRouter = Router();

authRouter.post("/signup", signUpController);
authRouter.post("/signin", signInController);

export default authRouter;