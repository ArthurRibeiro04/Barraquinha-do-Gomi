import { Router, Request, Response } from "express";
import userRoutes from "./user_route";
import mangaRoutes from "./manga_routes";
import commentRoutes from "./comment_routes";

const router = Router();

router.use(userRoutes);
router.use(mangaRoutes)
router.use(commentRoutes)

export default router;
