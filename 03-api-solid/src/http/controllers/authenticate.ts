import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { InvalidCredentialsError } from '@/use-case/errors/invalid-credentials-error';
import { makeAuthenticateUseCase } from '@/use-case/factories/make-authenticate-use-case';

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();

    await authenticateUseCase.execute({
      email,
      password,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof InvalidCredentialsError) {
      return reply.code(400).send({ message: error.message });
    }
    throw error;
  }

  return reply.status(200).send();
}
