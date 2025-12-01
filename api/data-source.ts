import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Manga } from "./entities/Manga";
import { Comment } from "./entities/Comment";

export const AppDataSource =
  process.env.NODE_ENV === "test"
    ? new DataSource({
        type: "sqlite",
        database: ":memory:",
        entities: [User, Manga, Comment],
        synchronize: true,
      })
    : new DataSource({
        type: "sqlite",
        database: "database.sqlite",
        entities: [User, Manga, Comment],
        synchronize: true,
      });
