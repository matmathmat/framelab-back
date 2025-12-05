import { Router } from "express";

import * as authController from "../controllers/authController.js";
import * as voteController from "../controllers/voteController.js";

const voteRouter = Router();

voteRouter.get("/votes", authController.authentification, voteController.getVotes);
voteRouter.get("/votes/:id", authController.authentification, voteController.getVote);
voteRouter.post("/votes", authController.authentification, voteController.postVote);

export default voteRouter;