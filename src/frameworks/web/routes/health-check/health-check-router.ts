import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { healthCheck } from '../../swagger'

export const healthCheckRoute = async (fastify: FastifyInstance) => {
    fastify.get(
        '/health-check',
        healthCheck(),
        async (_request: FastifyRequest, reply: FastifyReply) =>  {
            return reply.status(200).send({
                message: 'Server is running!',
            })
        }
    )
}