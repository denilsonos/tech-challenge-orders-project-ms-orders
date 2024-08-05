import { DbConnection } from '../gateways/db/db-connection'
import { CustomerRepository } from '../gateways/repositories/customer-repository'
import { CustomerDAO } from '../../base/dao/customer'

export class CustomerRepositoryImpl implements CustomerRepository {
  constructor(private readonly database: DbConnection) { }

  async create(customer: CustomerDAO): Promise<CustomerDAO> {
    const repository = this.database.getConnection().getRepository(CustomerDAO)
    return await repository.save(customer)
  }

  async getByEmail(email: string): Promise<CustomerDAO | null> {
    const repository = this.database.getConnection().getRepository(CustomerDAO)
    return await repository.findOne({ where: { email }})
  }

  async getById(id: number): Promise<CustomerDAO | null> {
    const repository = this.database.getConnection().getRepository(CustomerDAO)
    return await repository.findOne({ where: { id }})
  }

  async remove(id: number): Promise<void> {
    const repository = this.database.getConnection().getRepository(CustomerDAO)

    repository.delete(id)
  }

  
}
