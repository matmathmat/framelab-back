import { Router } from "express";

import * as authController from "../controllers/authController.js";
import * as commentController from "../controllers/commentController.js";

const commentRouter = Router();

commentRouter.get("/comments", authController.authentification, commentController.getcomments);
// commentRouter.get("/comments/:id", authController.authentification, commentController.getcomment);
// commentRouter.post("/comments", authController.authentification, commentController.postComment);

export default commentRouter;