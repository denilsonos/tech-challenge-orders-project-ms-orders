import { CustomerRepository } from "../../../adapters/gateways/repositories/customer-repository";
import { CustomerUseCase } from "../../../adapters/gateways/use-cases/customer-use-case";
import { CustomerDAO } from "../../../base/dao/customer";
import { CustomerDTO } from "../../../base/dto/customer";
import { CustomerEntity } from "../../entities/customer";
import { NotFoundException } from "../../entities/exceptions";

export class CustomerUseCaseImpl implements CustomerUseCase {

    constructor(
        private readonly customerRepository: CustomerRepository
    ) { }

    async create(customer: CustomerDTO): Promise<CustomerEntity> {
        const customerExists: CustomerDAO | null = await this.customerRepository.getByEmail(customer.email)

        if (customerExists?.id) {
            throw new NotFoundException('E-mail already in use!')
        }

        const newCustomer = new CustomerDAO()
        newCustomer.cpf = customer.cpf
        newCustomer.name = customer.name
        newCustomer.email = customer.email
        newCustomer.address = customer.address
        newCustomer.phone = customer.phone

        const customerDAO = await this.customerRepository.create(newCustomer)

        return CustomerDAO.daoToEntity(customerDAO)
    }

    async remove(id: number): Promise<void> {
        const customer: CustomerDAO | null = await this.customerRepository.getById(id)

        if (!customer?.id) {
            throw new NotFoundException('Customer not found!')
        }

        await this.customerRepository.remove(customer.id)
    }

    
}