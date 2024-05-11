import { FastifyRequest } from "fastify";
import { z } from "zod";

export const validateId = (params: FastifyRequest['params']) => {
  const schema = z.object({
    id: z.number().min(1).refine(value => {
      const parsedNumber = Number(value);
      return !isNaN(parsedNumber);
    }, {
      message: 'Invalid number format',
    })
  })
  return schema.safeParse(params)
}