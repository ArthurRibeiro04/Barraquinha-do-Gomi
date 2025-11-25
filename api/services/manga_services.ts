import { AppDataSource } from "../data-source";
import { Manga } from "../entities/Manga";
import { User } from "../entities/User";

const mangaRepository = AppDataSource.getRepository(Manga);
const userRepository = AppDataSource.getRepository(User);

export interface CreateMangaDTO {
  name: string;
  volume: number;
  release_date: string;
  type: string;
  rating?: number;
  review: string;
  user_id: string;
}

export interface UpdateMangaDTO {
  name?: string;
  volume?: number;
  release_date?: string;
  type?: string;
  rating?: number;
  review?: string;
}

export async function createMangaService(data: CreateMangaDTO) {
  const { name, volume, release_date, type, review, rating, user_id } = data;

  if (!name || !volume || !release_date || !type || !review || !user_id) {
    throw {
      statusCode: 400,
      message: "name, volume, release_date, type, review e user_id são obrigatórios",
    };
  }

  const user = await userRepository.findOne({ where: { id: user_id } });

  if (!user) {
    throw { statusCode: 404, message: "Usuário não encontrado" };
  }

  const manga = mangaRepository.create({
    name,
    volume,
    release_date,
    type,
    review,
    rating: rating ?? 0,
    user,
  });

  await mangaRepository.save(manga);

  return manga;
}

export async function listMangasService(type?: string) {
  if (type) {
    return mangaRepository.find({
      where: { type },
      order: { created_at: "DESC" },
    });
  }

  return mangaRepository.find({
    order: { created_at: "DESC" },
  });
}

export async function getMangaByIdService(id: string) {
  if (!id) {
    throw { statusCode: 400, message: "id é obrigatório" };
  }

  const manga = await mangaRepository.findOne({
    where: { id },
    relations: ["comments"],
  });

  if (!manga) {
    throw { statusCode: 404, message: "Mangá não encontrado" };
  }

  return manga;
}

export async function updateMangaService(id: string, data: UpdateMangaDTO) {
  const manga = await mangaRepository.findOne({ where: { id } });

  if (!manga) {
    throw { statusCode: 404, message: "Mangá não encontrado" };
  }

  Object.assign(manga, data);

  await mangaRepository.save(manga);

  return manga;
}

export async function deleteMangaService(id: string) {
  const manga = await mangaRepository.findOne({ where: { id } });

  if (!manga) {
    throw { statusCode: 404, message: "Mangá não encontrado" };
  }

  await mangaRepository.remove(manga);

  return { message: "Mangá removido com sucesso" };
}
