import { CheckIn, Prisma } from 'prisma/prisma-client';

export interface CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
}
