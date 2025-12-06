import { Router } from "express";

import { authentification } from "../middlewares/authMiddleware.js";

import { getUsers, getMe, getUser, postUser } from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/users", authentification, getUsers);
userRouter.get("/users/me", authentification, getMe);
userRouter.get("/users/:id", authentification, getUser);
userRouter.post("/users", postUser);

export default userRouter;