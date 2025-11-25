// api/controllers/manga.controller.ts
import { Request, Response } from "express";
import {
  createMangaService,
  listMangasService,
  getMangaByIdService,
  updateMangaService,
  deleteMangaService,
} from "../services/manga_services";

export async function createMangaController(req: Request, res: Response) {
  try {
    const manga = await createMangaService(req.body);
    return res.status(201).json(manga);
  } catch (err: any) {
    const status = err.statusCode || 400;
    return res.status(status).json({ error: err.message || "Erro ao criar mangá" });
  }
}

export async function listMangasController(req: Request, res: Response) {
  try {
    const { type } = req.query;
    const mangas = await listMangasService(type ? String(type) : undefined);
    return res.json(mangas);
  } catch (err: any) {
    return res.status(500).json({ error: "Erro ao listar mangás" });
  }
}

export async function getMangaByIdController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const manga = await getMangaByIdService(id);
    return res.json(manga);
  } catch (err: any) {
    const status = err.statusCode || 400;
    return res.status(status).json({ error: err.message || "Erro ao buscar mangá" });
  }
}

export async function updateMangaController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const manga = await updateMangaService(id, req.body);
    return res.json(manga);
  } catch (err: any) {
    const status = err.statusCode || 400;
    return res.status(status).json({ error: err.message || "Erro ao atualizar mangá" });
  }
}

export async function deleteMangaController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const result = await deleteMangaService(id);
    return res.json(result);
  } catch (err: any) {
    const status = err.statusCode || 400;
    return res.status(status).json({ error: err.message || "Erro ao remover mangá" });
  }
}
