import 'reflect-metadata'
import { FastifyAppAdapter } from './frameworks/web/fastify-app-adapter'
import { MysqlOrmAdapter } from './frameworks/database/mysql-orm-adapter'
import { Server } from './frameworks/web/server'

const main = async () => {
  const app = new FastifyAppAdapter()
  const database = MysqlOrmAdapter.getInstance()
  const server = new Server(app, database)
  await server.start()
}

main()
