import { FastifyReply, FastifyRequest } from 'fastify'

export interface Controller {
  execute(request: FastifyRequest, reply: FastifyReply): Promise<any>
}
