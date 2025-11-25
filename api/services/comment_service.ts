import { AppDataSource } from "../data-source";
import { Comment } from "../entities/Comment";
import { Manga } from "../entities/Manga";
import { User } from "../entities/User";

const commentRepository = AppDataSource.getRepository(Comment);
const mangaRepository = AppDataSource.getRepository(Manga);
const userRepository = AppDataSource.getRepository(User);

export interface CreateCommentDTO {
  text: string;
  user_id: string;
  manga_id: string;
}

export async function createCommentService({
  text,
  user_id,
  manga_id,
}: CreateCommentDTO) {
  if (!text || !user_id || !manga_id) {
    throw { statusCode: 400, message: "text, user_id e manga_id são obrigatórios" };
  }

  const user = await userRepository.findOne({ where: { id: user_id } });
  if (!user) throw { statusCode: 404, message: "Usuário não encontrado" };

  const manga = await mangaRepository.findOne({ where: { id: manga_id } });
  if (!manga) throw { statusCode: 404, message: "Mangá não encontrado" };

  const comment = commentRepository.create({
    text,
    user,
    manga,
  });

  await commentRepository.save(comment);

  return comment;
}

export async function listCommentsByMangaService(manga_id: string) {
  if (!manga_id) throw { statusCode: 400, message: "manga_id é obrigatório" };

  return commentRepository.find({
    where: { manga: { id: manga_id } },
    order: { created_at: "DESC" },
  });
}

export async function deleteCommentService(id: string) {
  const comment = await commentRepository.findOne({ where: { id } });
  if (!comment) throw { statusCode: 404, message: "Comentário não encontrado" };

  await commentRepository.remove(comment);

  return { message: "Comentário removido com sucesso" };
}

export async function updateCommentService(id: string, text: string) {
  const comment = await commentRepository.findOne({ where: { id } });
  if (!comment) throw { statusCode: 404, message: "Comentário não encontrado" };

  comment.text = text;

  await commentRepository.save(comment);

  return comment;
}
