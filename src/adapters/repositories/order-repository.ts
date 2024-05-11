import { OrderRepository } from '../gateways/repositories/order-repository'
import { OrderDAO } from '../../base/dao/order'
import { DbConnection } from '../gateways/db/db-connection'
import { In, Raw } from 'typeorm'
import { OrderStatus } from '../../core/entities/enums/order-status'

export class OrderRepositoryImpl implements OrderRepository {
  constructor(private readonly database: DbConnection) { }

  async save(order: OrderDAO): Promise<OrderDAO> {
    const repository = this.database.getConnection().getRepository(OrderDAO)
    return await repository.save(order)
  }

  async getById(orderId: number): Promise<OrderDAO | null> {
    const repository = this.database.getConnection().getRepository(OrderDAO)
    return await repository.findOne({ where: { id: orderId }, relations: ['items'] })    
  }

  async findByParams(clientId?: number | undefined, status?: string | undefined): Promise<OrderDAO[] | []> {
    const repository = this.database.getConnection().getRepository(OrderDAO)
    return await repository.find({
      order: {
        createdAt: 'DESC'
      },
      where: {
        clientId: clientId,
        status: status
      },
      relations: ['items'],

    })
  }

  async getAll(): Promise<OrderDAO[] | []> {
    const repository = this.database.getConnection().getRepository(OrderDAO);

    return await repository.createQueryBuilder('order')
      .addOrderBy('order.createdAt', 'DESC')
      .orderBy(`(case when order.status = '${OrderStatus.Ready}' then 1 when order.status = '${OrderStatus.InPreparation}' then 2 when order.status = '${OrderStatus.Received}' then 3 else 4 end)`)
      .where('order.status IN(:...status)', { status: [OrderStatus.Ready, OrderStatus.InPreparation, OrderStatus.Received] })
      .leftJoinAndSelect('order.items', 'item').getMany();
  }

  async update(orderId: number, status: string): Promise<void> {
    const repository = this.database.getConnection().getRepository(OrderDAO)
    await repository.update(orderId, { status })
  }
}
