import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Exception } from '../../../../core/entities/exceptions'
import { deleteCustomerSwagger } from '../../swagger'
import { DbConnectionImpl } from '../../../database/db-connection-impl'
import { CustomerController } from '../../../../adapters/controllers/customers-controller'

export const deleteCustomerRoute = async (fastify: FastifyInstance) => {
  fastify.delete(
    '/customers/:id',
    deleteCustomerSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const dbConn = new DbConnectionImpl()
      const controller = new CustomerController(dbConn);
      const params = request.params as { id: number }

      await controller.remove(params.id)
      .then((customer) => {
        return reply.status(200).send({
          message: 'Customer successfully deleted!',
        });
      })
      .catch((error) => {
        if (error instanceof Exception) {
          return reply.status(error.statusCode).send(error.body)
        }
      });
    },
  )
}
