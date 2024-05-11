import { OrderDTO } from "../../../base/dto/order";
import { OrderEntity } from "../../../core/entities/order";

export interface OrderUseCase {
    create(order: OrderDTO): Promise<OrderEntity>;
    findByParams(clientId?: number, status?: string): Promise<OrderEntity[] | []>;
    getById(orderId: number): Promise<OrderEntity | null>
    update(order: OrderDTO, status: string): Promise<void>
}