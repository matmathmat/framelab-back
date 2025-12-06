import { Router } from "express";

import * as authController from "../controllers/authController.js";
import { uploadMiddleware } from "../middlewares/uploadMiddleware.js";
import * as challengeController from "../controllers/challengeController.js";

const challengeRouter = Router();

challengeRouter.get("/challenges", authController.authentification, challengeController.getChallenges);
challengeRouter.get("/challenges/:id", authController.authentification, challengeController.getChallenge);
challengeRouter.get("/challenges/current", authController.authentification, challengeController.getCurrentChallenge);
challengeRouter.post("/challenges", authController.authentification, uploadMiddleware, challengeController.postChallenge);

export default challengeRouter;