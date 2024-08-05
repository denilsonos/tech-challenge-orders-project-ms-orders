import { CustomerDTO } from "../../../base/dto/customer";

export interface Customer {
    create(bodyParams: unknown): Promise<CustomerDTO>;
    remove(id: number): Promise<void>;
}