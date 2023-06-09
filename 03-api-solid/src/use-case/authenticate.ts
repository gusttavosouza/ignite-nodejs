import { UserRepository } from '@/repositories/users.repository';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';
import { compare } from 'bcryptjs';
import { User } from 'prisma/prisma-client';

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  user: User;
}

export class AuthenticationUseCase {
  private usersRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.usersRepository = userRepository;
  }

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordsMatch = await compare(password, user.password_hash);
    if (!doesPasswordsMatch) {
      throw new InvalidCredentialsError();
    }

    return {
      user,
    };
  }
}
