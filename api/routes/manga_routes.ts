// api/routes/manga.routes.ts
import { Router } from "express";
import {
  createMangaController,
  listMangasController,
  getMangaByIdController,
  updateMangaController,
  deleteMangaController,
} from "../controllers/manga_controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const mangaRoutes = Router();

mangaRoutes.post("/mangas", authMiddleware, createMangaController);      
mangaRoutes.get("/mangas", listMangasController);        
mangaRoutes.get("/mangas/:id", getMangaByIdController);  
mangaRoutes.put("/mangas/:id", authMiddleware, updateMangaController); 
mangaRoutes.delete("/mangas/:id", authMiddleware, deleteMangaController);

export default mangaRoutes;
