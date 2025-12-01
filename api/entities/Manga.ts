import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./User";
import { Comment } from "./Comment";

@Entity()
export class Manga {
  @PrimaryColumn("uuid")
  id: string;

  @Column("text")
  name: string;

  @Column("int")
  volume: number;

  @Column("text")
  release_date: string;

  @Column("text")
  type: string;

  @Column("float", { nullable: true })
  rating?: number;

  @Column("text")
  review: string;

  @Column("text", { nullable: true })
  image?: string;

  @Column("int", { default: 0 })
  likes: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.mangas, {
    onDelete: "CASCADE",
    eager: true,
  })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.manga, {
    cascade: true,
  })
  comments: Comment[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
