import { Router } from "express";
import createUrlController from "../controllers/urls/createUrlController.js";
import deleteUrlController from "../controllers/urls/deleteUrlController.js";
import getByIdUrlController from "../controllers/urls/getByIdUrlController.js";
import openUrlController from "../controllers/urls/openUrlController.js";
import validateUser from "../middlewares/validateUser.js";

const urlRouter = Router();

urlRouter.post("/shorten", validateUser, createUrlController);
urlRouter.get("/:id",getByIdUrlController);
urlRouter.get("/open/:shortUrl",openUrlController);
urlRouter.delete("/:id", validateUser, deleteUrlController);

export default urlRouter;