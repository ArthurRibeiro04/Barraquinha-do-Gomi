import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Manga } from "./Manga";
import { Comment } from "./Comment";

@Entity()
export class User {
  @PrimaryColumn("uuid")
  id: string;

  @Column("text")
  name: string;

  @Column("text", { unique: true })
  email: string;

  @Column("text")
  password: string; // hash

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Manga, (manga) => manga.user)
  mangas: Manga[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
