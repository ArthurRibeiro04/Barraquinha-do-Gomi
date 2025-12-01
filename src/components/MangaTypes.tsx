import { User } from "../../api/entities/User";

export type Manga = {
  id: number;
  name: string;
  image: string;
  volume: number;
  type?: string;
  review?: string;
  rating?: number;
  release_date?: string;
  user_id?: string;
  user_name?: string;
  user: User
};

export type CreateMangaForm = {
  name: string;
  volume: number;
  release_date: string;
  type: string;
  rating: number;
  review: string;
  image: string;
};
