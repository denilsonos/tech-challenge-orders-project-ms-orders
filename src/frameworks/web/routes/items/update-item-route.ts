import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { updateItemSwagger } from '../../swagger'
import { Exception } from '../../../../core/entities/exceptions'
import { ItemController } from '../../../../adapters/controllers/item-controller'
import { DbConnectionImpl } from '../../../database/db-connection-impl'

export const updateItemRoute = async (fastify: FastifyInstance) => {  
  fastify.patch(
    '/items/:id',
    updateItemSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const dbConn = new DbConnectionImpl()
      const controller = new ItemController(dbConn);

      await controller.update(request.params, request.body)
      .then(() => {
        return reply.status(200).send({
          message: 'Item updated successfully!',
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