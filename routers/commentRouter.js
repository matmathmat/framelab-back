import { Router } from "express";

import { authentification } from "../middlewares/authMiddleware.js";

import { getcomments, getcomment, postComment } from "../controllers/commentController.js";

const commentRouter = Router();

commentRouter.get("/comments", authentification, getcomments);
commentRouter.get("/comments/:id", authentification, getcomment);
commentRouter.post("/comments", authentification, postComment);

export default commentRouter;