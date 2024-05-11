import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { getItemSwagger } from '../../swagger'
import { Exception } from '../../../../core/entities/exceptions'
import { ItemController } from '../../../../adapters/controllers/item-controller'
import { DbConnectionImpl } from '../../../database/db-connection-impl'
// import { AuthorizationService } from '../../../middlewares/authentication'

export const getItemRoute = async (fastify: FastifyInstance) => {
  // const authorizationService = new AuthorizationService();
  // fastify.addHook('preHandler', authorizationService.authenticate);
  
  fastify.get(
    '/items/:id',
    getItemSwagger(),
    async (request: FastifyRequest, reply: FastifyReply) => {
      const dbConn = new DbConnectionImpl()
      const controller = new ItemController(dbConn);

      await controller.getById(request.params)
        .then((item) => {
          return reply.status(200).send({
            message: 'Item found successfully!',
            item: item,
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