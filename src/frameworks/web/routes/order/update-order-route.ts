import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { OrderController } from '../../../../adapters/controllers/orders-controller'
import { Exception } from '../../../../core/entities/exceptions'
import { updateOrderSwagger } from '../../swagger'
import { DbConnectionImpl } from '../../../database/db-connection-impl'

export const updateOrderRoute = async (fastify: FastifyInstance) => {
  
  fastify.patch(
    '/orders/:id',
    updateOrderSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const dbConn = new DbConnectionImpl()
      const controller = new OrderController(dbConn);

      await controller.update(request.body, request.params).then(() => {
        return reply.status(200).send({ 
          message: "Order updated!"
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
