import { Router } from "express";

import * as authController from "../controllers/authController.js";
import { uploadMiddleware } from "../middlewares/uploadMiddleware.js";
import * as participationController from "../controllers/participationController.js";

const participationRouter = Router();

participationRouter.get("/participations", authController.authentification, participationController.getParticipations);
participationRouter.get("/participations/:id", authController.authentification, participationController.getParticipation);
participationRouter.post("/participations", authController.authentification, uploadMiddleware, participationController.postParticipation);

export default participationRouter;