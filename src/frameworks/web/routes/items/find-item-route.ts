import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { findItemSwagger } from '../../swagger'
import { Exception } from '../../../../core/entities/exceptions'
import { ItemController } from '../../../../adapters/controllers/item-controller'
import { DbConnectionImpl } from '../../../database/db-connection-impl'

export const findItemRoute = async (fastify: FastifyInstance) => {  
  fastify.get(
    '/items',
    findItemSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const dbConn = new DbConnectionImpl()
      const controller = new ItemController(dbConn);

      await controller.findByParams(request.query)
        .then((items) => {
          return reply.status(200).send({
            message: `${items.length} items found!`,
            items: items,
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