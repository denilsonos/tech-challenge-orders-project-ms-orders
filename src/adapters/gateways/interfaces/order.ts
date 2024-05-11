import { OrderDTO } from "../../../base/dto/order";

export interface Order {
    create(bodyParams: unknown): Promise<OrderDTO>;
    findByParams(bodyParams: unknown): Promise<[] | OrderDTO[]>;
    get(identifier: any): Promise<OrderDTO>;
    update(identifier: any, params: unknown): Promise<void>;
}