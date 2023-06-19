import { expect, describe, it, beforeEach } from 'vitest';

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from './check-in';

describe('Check In Use Case', () => {
  let checkInRepository: InMemoryCheckInsRepository;
  let sut: CheckInUseCase;

  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkInRepository);
  });

  it('Should be able to authenticate', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
