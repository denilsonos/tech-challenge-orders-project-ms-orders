import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Exception } from '../../../../core/entities/exceptions'
import { deleteItemSwagger } from '../../swagger'
import { ItemController } from '../../../../adapters/controllers/item-controller'
import { DbConnectionImpl } from '../../../database/db-connection-impl'

export const deleteItemRoute = async (fastify: FastifyInstance) => {  
  fastify.delete(
    '/items/:id',
    deleteItemSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const dbConn = new DbConnectionImpl()
      const controller = new ItemController(dbConn);
      
      await controller.delete(request.params)
        .then(() => {
          return reply.status(200).send({
            message: 'Item deleted successfully!'
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
