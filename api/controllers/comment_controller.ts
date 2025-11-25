import { Request, Response } from "express";
import {
  createCommentService,
  listCommentsByMangaService,
  deleteCommentService,
  updateCommentService,
} from "../services/comment_service";

export async function createCommentController(req: Request, res: Response) {
  try {
    const comment = await createCommentService(req.body);
    return res.status(201).json(comment);
  } catch (err: any) {
    const status = err.statusCode || 400;
    return res.status(status).json({ error: err.message });
  }
}

export async function listCommentsByMangaController(req: Request, res: Response) {
  try {
    const { manga_id } = req.params;
    const comments = await listCommentsByMangaService(manga_id);
    return res.json(comments);
  } catch (err: any) {
    const status = err.statusCode || 400;
    return res.status(status).json({ error: err.message });
  }
}

export async function deleteCommentController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const result = await deleteCommentService(id);
    return res.json(result);
  } catch (err: any) {
    const status = err.statusCode || 400;
    return res.status(status).json({ error: err.message });
  }
}

export async function updateCommentController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const comment = await updateCommentService(id, text);
    return res.json(comment);
  } catch (err: any) {
    const status = err.statusCode || 400;
    return res.status(status).json({ error: err.message });
  }
}
