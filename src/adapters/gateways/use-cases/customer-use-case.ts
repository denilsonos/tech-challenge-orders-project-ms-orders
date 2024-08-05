import { CustomerDTO } from "../../../base/dto/customer";
import { CustomerEntity } from "../../../core/entities/customer";

export interface CustomerUseCase {
    create(customer: CustomerDTO): Promise<CustomerEntity>;
    remove(id: number): Promise<void>
}