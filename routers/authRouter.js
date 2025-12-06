import { Router } from "express";

import { authentification } from "../middlewares/authMiddleware.js";

import { login, logout } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/auth/login", login);
authRouter.post("/auth/logout", authentification, logout);

export default authRouter;