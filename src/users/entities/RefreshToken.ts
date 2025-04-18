import { v7 as uuid } from 'uuid';
import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('refresh_tokens')
export class RefreshToken {
  @PrimaryColumn()
  id?: string;

  @Column()
  token: string;

  @Column()
  valid: boolean;

  @Column()
  user_id: string;

  @Column()
  expires: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
