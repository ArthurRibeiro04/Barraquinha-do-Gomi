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
  image?: string;   
  user_id: string;
}

export interface UpdateMangaDTO {
  name?: string;
  volume?: number;
  release_date?: string;
  type?: string;
  rating?: number;
  review?: string;
  image?: string;  
}

export async function createMangaService({
  name,
  volume,
  release_date,
  type,
  rating,
  review,
  image,
  user_id,
}: CreateMangaDTO) {
  const user = await userRepository.findOne({ where: { id: user_id } });

  if (!user) {
    throw { statusCode: 404, message: "Usuário não encontrado" };
  }

  const manga = mangaRepository.create({
    name,
    volume,
    release_date,
    type,
    rating,
    review,
    image, 
    user,
  });

  await mangaRepository.save(manga);

  return manga;
}

export async function listMangasService(type: string | undefined) {

  if (!type) {
    const mangas = await mangaRepository.find();
     return mangas;
  }

  const mangas = await mangaRepository.findBy({ type })
  return mangas
}

export async function getMangaByIdService(id: string) {
  const manga = await mangaRepository.findOne({ where: { id } });

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

  if (data.name !== undefined) manga.name = data.name;
  if (data.volume !== undefined) manga.volume = data.volume;
  if (data.release_date !== undefined) manga.release_date = data.release_date;
  if (data.type !== undefined) manga.type = data.type;
  if (data.rating !== undefined) manga.rating = data.rating;
  if (data.review !== undefined) manga.review = data.review;
  if (data.image !== undefined) manga.image = data.image; // 👉 aqui também

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
