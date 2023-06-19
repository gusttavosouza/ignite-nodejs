import { hash } from 'bcryptjs';

import { UserRepository } from '@/repositories/users.repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';
import { User } from 'prisma/prisma-client';

interface RegisterUseCaseRequest {
  email: string;
  name: string;
  password: string;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  private usersRepository: UserRepository;

  constructor(usersRepository: UserRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    return { user };
  }
}
