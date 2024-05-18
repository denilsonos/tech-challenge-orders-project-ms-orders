import { OrderDTO } from "../../base/dto/order";
import { OrderEntity } from "../../core/entities/order";
import { ItemPresenter } from "./item";

export class OrderPresenter {

    static EntityToDto(orderEntity: OrderEntity): OrderDTO {
        return new OrderDTO(orderEntity.status,
            orderEntity.clientId,
            orderEntity.createdAt,
            orderEntity.updatedAt,
            ItemPresenter.EntitiesToDto(orderEntity.items!),
            orderEntity.id,
            Number(orderEntity.total));
    }

    static EntitiesToDto(ordersEntities: OrderEntity[]): OrderDTO[] {

        const listDtos: OrderDTO[] = [];
        ordersEntities.forEach(orderEntity => {
            listDtos.push(OrderPresenter.EntityToDto(orderEntity));
        });

        return listDtos;
    }
}