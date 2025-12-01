import { Router } from "express";
import {
  createCommentController,
  listCommentsByMangaController,
  deleteCommentController,
  updateCommentController,
} from "../controllers/comment_controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const commentRoutes = Router();

commentRoutes.post("/comments", authMiddleware, createCommentController);
commentRoutes.get("/comments/manga/:manga_id", listCommentsByMangaController);
commentRoutes.delete("/comments/:id", authMiddleware, deleteCommentController);
commentRoutes.put("/comments/:id", authMiddleware, updateCommentController);

export default commentRoutes;
