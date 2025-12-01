import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./User";
import { Manga } from "./Manga";

@Entity()
export class Comment {
  @PrimaryColumn("uuid")
  id: string;

  @Column("text")
  text: string;

  @Column("int", { default: 0 })
  likes: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Manga, (manga) => manga.comments, {
    onDelete: "CASCADE",
  })
  manga: Manga;

  @ManyToOne(() => User, (user) => user.comments, {
    onDelete: "CASCADE",
    eager: true,
  })
  user: User;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
