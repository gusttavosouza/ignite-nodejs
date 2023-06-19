import { UserRepository } from '@/repositories/users.repository';
import { User } from 'prisma/prisma-client';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface GetUserProfileUseCaseRequest {
  userId: string;
}

interface GetUserProfileUseCaseResponse {
  user: User;
}

export class GetUserProfileUseCase {
  private usersRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.usersRepository = userRepository;
  }

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new ResourceNotFoundError();
    }

    return {
      user,
    };
  }
}
