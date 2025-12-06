import { Router } from "express";

import { authentification } from "../middlewares/authMiddleware.js";

import { getVotes, getVote, postVote } from "../controllers/voteController.js";

const voteRouter = Router();

voteRouter.get("/votes", authentification, getVotes);
voteRouter.get("/votes/:id", authentification, getVote);
voteRouter.post("/votes", authentification, postVote);

export default voteRouter;