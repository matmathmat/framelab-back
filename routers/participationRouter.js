import { Router } from "express";

import { authentification } from "../middlewares/authMiddleware.js";
import { uploadMiddleware } from "../middlewares/uploadMiddleware.js";

import { getParticipations, getParticipation, postParticipation } from "../controllers/participationController.js";

const participationRouter = Router();

participationRouter.get("/participations", authentification, getParticipations);
participationRouter.get("/participations/:id", authentification, getParticipation);
participationRouter.post("/participations", authentification, uploadMiddleware, postParticipation);

export default participationRouter;