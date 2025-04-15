import { v7 as uuid } from 'uuid';
import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Role } from '@roles/entities/Role';
import { Exclude, Expose } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  isAdmin: boolean;

  @Column()
  avatar?: string;

  @ManyToOne(() => Role, {
    cascade: true,
  })
  role: Role;

  @CreateDateColumn()
  created_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }

    return `${process.env.API_URL}:${process.env.PORT}${process.env.AVATAR_URL}/${this.avatar}`;
  }

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
