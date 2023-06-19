import { hash } from 'bcryptjs';
import { expect, describe, it, beforeEach } from 'vitest';

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository';
import { GetUserProfileUseCase } from './get-user-profile';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

describe('Get User Profile Use Case', () => {
  let usersRepository: InMemoryUsersRepository;
  let sut: GetUserProfileUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it('Should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual('John Doe');
  });

  it('Should be not able to get user profile', async () => {
    const promiseWrongEmail = sut.execute({
      userId: 'non-existent-user',
    });

    expect(promiseWrongEmail).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
