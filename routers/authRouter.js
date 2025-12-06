import { Router } from "express";

import { authentification } from "../middlewares/authMiddleware.js";

import { login, logout } from "../controllers/authController.js";

const authRouter = Router();

authRouter.get("/auth/login", login);
authRouter.get("/auth/logout", authentification, logout);

export default authRouter;