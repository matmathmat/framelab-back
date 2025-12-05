import { Router } from "express";

import * as authController from "../controllers/authController.js";
import * as userController from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/users", authController.authentification, userController.getUsers);
userRouter.get("/users/me", authController.authentification, userController.getMe);
userRouter.get("/users/:id", authController.authentification, userController.getUser);
userRouter.post("/users", authController.authentification, userController.postUser);

export default userRouter;