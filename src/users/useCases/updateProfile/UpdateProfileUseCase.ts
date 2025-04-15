import { AppError } from '@shared/errors/AppError';
import { User } from '@users/entities/User';
import { IUsersRepository } from '@users/repositories/IUsersRepository';
import { compare, hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

type UpdateProfileDTO = {
  userId: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
};

@injectable()
export class UpdateProfileUseCase {
  constructor(@inject('UsersRepository') private usersRepository: IUsersRepository) {}

  async execute({ name, email, password, userId, old_password }: UpdateProfileDTO): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const userUpdateEmail = await this.usersRepository.findByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id !== userId) {
      throw new AppError('This email already in use by another person.', 400);
    }

    if (password && old_password) {
      const checkOldPassWord = await compare(old_password, user.password);

      if (!checkOldPassWord) {
        throw new AppError('Old password does not match', 400);
      }

      user.password = await hash(password, 10);
    }

    user.name = name;
    user.email = email;

    return this.usersRepository.save(user);
  }
}
