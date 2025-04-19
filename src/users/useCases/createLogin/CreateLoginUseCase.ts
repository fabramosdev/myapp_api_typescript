import { jwt, expiresIn, refresh, refreshExpiresIn } from '@config/auth';
import { AppError } from '@shared/errors/AppError';
import { User } from '@users/entities/User';
import { IUsersRepository } from '@users/repositories/IUsersRepository';
import { IRefreshTokenRepository } from '@users/repositories/IRefreshTokenRepository';
import { inject, injectable } from 'tsyringe';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

type CreateLoginDTO = {
  email: string;
  password: string;
};

type IResponse = {
  user: User;
  acessToken: string;
  refreshToken: string;
};

@injectable()
export class CreateLoginUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('RefreshTokenRepository') private refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  async execute({ email, password }: CreateLoginDTO): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const acessToken = sign({}, jwt.secret, {
      subject: user.id,
      expiresIn,
    });

    const expires = new Date(Date.now() + refresh.duration);

    const refreshToken = sign({}, refresh.secret, {
      subject: user.id,
      expiresIn: refreshExpiresIn,
    });

    await this.refreshTokenRepository.create({
      token: refreshToken,
      expires,
      user_id: user.id,
      valid: true,
    });

    return {
      user,
      acessToken,
      refreshToken,
    };
  }
}
