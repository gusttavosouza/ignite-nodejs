import { CheckIn } from 'prisma/prisma-client';
import { CheckInsRepository } from '@/repositories/check-ins-repository';

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  private checkInsRepository: CheckInsRepository;

  constructor(checkInsRepository: CheckInsRepository) {
    this.checkInsRepository = checkInsRepository;
  }

  async execute({
    userId,
    gymId,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return { checkIn };
  }
}
