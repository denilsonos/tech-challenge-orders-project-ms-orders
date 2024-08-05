import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { OrmAdapter } from '../../adapters/gateways/orm-adapter'
import { OrderDAO } from '../../base/dao/order'
import { ItemDAO } from '../../base/dao/item'
import { FakeQueue } from '../../adapters/external-services/fake-queue-service/fake-queue-service-adapter'
import { CustomerDAO } from '../../base/dao/customer'

export class MysqlOrmAdapter implements OrmAdapter {
  private static instance: MysqlOrmAdapter | undefined // eslint-disable-line no-use-before-define
  public database!: DataSource

  public static getInstance(): MysqlOrmAdapter {
    if (!MysqlOrmAdapter.instance) {
      MysqlOrmAdapter.instance = new MysqlOrmAdapter()
    }

    return MysqlOrmAdapter.instance
  }

  public async init(): Promise<void> {
    this.database = this.databaseConnection()

    if (this.database.isInitialized) {
      console.log('Database already connected')
    }
    await this.database
      .initialize()
      .then(() => {
        console.log('🚀 Connected to the database')
      })
      .catch((error) => {
        console.error('Error initialize to the database:', error)
        throw error
      })
  }

  private databaseConnection() {
    return new DataSource({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME_ORDERS,
      synchronize: true,
      logging: false,
      entities: [
        OrderDAO,
        ItemDAO,
        FakeQueue,
        CustomerDAO
      ],
      migrations: [],
      subscribers: [],
    })
  }
}
