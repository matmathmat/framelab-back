import { Router } from "express";

import { authentification, requireAdmin } from "../middlewares/authMiddleware.js";
import { uploadMiddleware } from "../middlewares/uploadMiddleware.js";

import { getChallenges, getCurrentChallenge, getChallenge, postChallenge } from "../controllers/challengeController.js";

const challengeRouter = Router();

challengeRouter.get("/challenges", authentification, getChallenges);
challengeRouter.get("/challenges/current", authentification, getCurrentChallenge);
challengeRouter.get("/challenges/:id", authentification, getChallenge);
challengeRouter.post("/challenges", authentification, requireAdmin, uploadMiddleware, postChallenge);

export default challengeRouter;