import { QueueServiceAdapter } from "../../../adapters/gateways/queue-service-adapter";
import { OrderRepository } from "../../../adapters/gateways/repositories/order-repository";
import { OrderUseCase } from "../../../adapters/gateways/use-cases/order-use-case";
import { ItemPresenter } from "../../../adapters/presenters/item";
import { OrderDAO } from "../../../base/dao/order";
import { OrderDTO } from "../../../base/dto/order";
import { NotFoundException } from "../../entities/exceptions";
import { OrderEntity } from "../../entities/order";

export class OrderUseCaseImpl implements OrderUseCase {

    constructor(private readonly orderRepository: OrderRepository,
        private readonly queueService: QueueServiceAdapter) { }

    async create(order: OrderDTO): Promise<any> {

        const orderItems = ItemPresenter.DTOsToDAOs(order.items!)
        const orderDAO = new OrderDAO()
        orderDAO.status = order.status
        orderDAO.clientId = order.clientId
        orderDAO.total = order.total
        orderDAO.createdAt = order.createdAt
        orderDAO.updatedAt = order.updatedAt
        orderDAO.items = orderItems

        const orderSaved = await this.orderRepository.save(orderDAO)
        return OrderDAO.daoToEntity(orderSaved);
    }

    async findByParams(clientId?: number | undefined, status?: string | undefined): Promise<[] | OrderEntity[]> {
        let order: OrderDAO[] = (!clientId && !status) ?
            await this.orderRepository.getAll() :
            await this.orderRepository.findByParams(clientId, status)

        return OrderDAO.daosToEntities(order)
    }

    async getById(orderId: number): Promise<OrderEntity | null> {
        const order: OrderDAO | null = await this.orderRepository.getById(orderId)        
        if (!order?.id) {
            throw new NotFoundException('Order not found!')
        }

        return OrderDAO.daoToEntity(order)
    }
    
    async update(order: OrderDTO, status: string): Promise<void> {
        await this.queueService.dequeue(order)
        await this.orderRepository.update(order.id!, status)
    }
}