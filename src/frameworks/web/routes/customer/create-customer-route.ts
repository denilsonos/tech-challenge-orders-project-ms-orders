import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Exception } from '../../../../core/entities/exceptions'
import { createCustomerSwagger, createOrderSwagger } from '../../swagger'
import { DbConnectionImpl } from '../../../database/db-connection-impl'
import { CustomerController } from '../../../../adapters/controllers/customers-controller'

export const createCustomerRoute = async (fastify: FastifyInstance) => {
  fastify.post(
    '/customers',
    createCustomerSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const dbConn = new DbConnectionImpl()
      const controller = new CustomerController(dbConn);

      await controller.create(request.body)
      .then((customer) => {
        return reply.status(201).send({
          message: 'Customer successfully registered!',
          customerId: customer.id,
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
