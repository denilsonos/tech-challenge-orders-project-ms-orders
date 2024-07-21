import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { createItemSwagger } from '../../swagger'
import { Exception } from '../../../../core/entities/exceptions'
import { ItemController } from '../../../../adapters/controllers/item-controller'
import { DbConnectionImpl } from '../../../database/db-connection-impl'

export const createItemRoute = async (fastify: FastifyInstance) => { 
  fastify.post(
    '/items',
    createItemSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const dbConn = new DbConnectionImpl()
      const controller = new ItemController(dbConn);

      await controller.create(request.body)
        .then((itemId) => {
          return reply.status(201).send({
            message: 'Item created successfully!',
            itemId: itemId,
          })
        })
        .catch((error) => {
          if (error instanceof Exception) {
            return reply.status(error.statusCode).send(error.body)
          }
        })
    },
  )
}
