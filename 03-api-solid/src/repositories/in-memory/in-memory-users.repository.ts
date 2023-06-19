import { Prisma, User } from 'prisma/prisma-client';
import { UserRepository } from '../users.repository';
import { randomUUID } from 'node:crypto';

export class InMemoryUsersRepository implements UserRepository {
  public items: User[] = [];

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: randomUUID(),
      email: data.email,
      name: data.name,
      password_hash: data.password_hash,
      created_at: new Date(),
    };
    this.items.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((user) => user.email === email);
    if (!user) {
      return null;
    }
    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((user) => user.id === id);
    if (!user) {
      return null;
    }
    return user;
  }
}
