import { Router } from "express";
import signUpController from "../controllers/user/signUpController.js";
import signInController from "../controllers/user/signInController.js";
import getMeController from "../controllers/user/getMeController.js";
import getRankingController from "../controllers/user/getRankingController.js";
import validateUser from "../middlewares/validateUser.js";

const userRouter = Router();

userRouter.post("/signup", signUpController);
userRouter.post("/signin", signInController);
userRouter.get("/users/me",validateUser, getMeController);
userRouter.get("/ranking", getRankingController);

export default userRouter;