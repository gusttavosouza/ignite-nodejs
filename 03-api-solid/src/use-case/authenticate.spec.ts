import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository';
import { AuthenticationUseCase } from './authenticate';
import { hash } from 'bcryptjs';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

describe('Authenticate Use Case', () => {
  let usersRepository: InMemoryUsersRepository;
  let sut: AuthenticationUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticationUseCase(usersRepository);
  });

  it('Should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    });

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('Should be not able to authenticate with wrong email', async () => {
    const promiseWrongEmail = sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(promiseWrongEmail).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('Should be not able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    });

    const promiseWrongEmail = sut.execute({
      email: 'johndoe@example.com',
      password: '123123',
    });

    expect(promiseWrongEmail).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
