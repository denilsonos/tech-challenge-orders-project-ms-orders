import { CustomerDAO } from "../../../base/dao/customer"

export interface CustomerRepository {
  create(customer: CustomerDAO): Promise<CustomerDAO>
  getByEmail(email: string): Promise<CustomerDAO | null>
  getById(id: number): Promise<CustomerDAO | null>
  remove(id: number): Promise<void>
}
