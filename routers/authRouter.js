import { Router } from "express";

import { login, logout } from "../controllers/authController.js";

const authRouter = Router();

authRouter.get("/auth/login", login);
authRouter.get("/auth/logout", logout);

export default authRouter;