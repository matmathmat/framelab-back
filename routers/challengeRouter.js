import { Router } from "express";

import { requireAdmin } from '../middlewares/authMiddleware.js';
import { uploadMiddleware } from "../middlewares/uploadMiddleware.js";

import * as authController from "../controllers/authController.js";
import * as challengeController from "../controllers/challengeController.js";

const challengeRouter = Router();

challengeRouter.get("/challenges", authController.authentification, challengeController.getChallenges);
challengeRouter.get("/challenges/current", authController.authentification, challengeController.getCurrentChallenge);
challengeRouter.get("/challenges/:id", authController.authentification, challengeController.getChallenge);
challengeRouter.post("/challenges", authController.authentification, requireAdmin, uploadMiddleware, challengeController.postChallenge);

export default challengeRouter;