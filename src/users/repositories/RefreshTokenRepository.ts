import { RefreshToken } from '@users/entities/RefreshToken';
import { CreateRefreshTokenDTO, IRefreshTokenRepository } from './IrefreshTokenRepository';
import { Repository } from 'typeorm';
import { dataSource } from '@shared/typeorm';
import { AppError } from '@shared/errors/AppError';
export class RefreshTokenRepository implements IRefreshTokenRepository {
  private repository: Repository<RefreshToken>;

  constructor() {
    this.repository = dataSource.getRepository(RefreshToken);
  }

  async create({ user_id, token, expires, valid }: CreateRefreshTokenDTO): Promise<RefreshToken> {
    const refreshToken = this.repository.create({ user_id, token, expires, valid });

    return this.repository.save(refreshToken);
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    return this.repository.findOneBy({ token });
  }

  async invalidate(refresh_token: RefreshToken): Promise<void> {
    const refreshToken = await this.findByToken(refresh_token.token);

    if (!refreshToken) {
      throw new AppError('Refresh token not found', 404);
    }

    refreshToken.valid = false;

    await this.repository.save(refreshToken);
  }
}
