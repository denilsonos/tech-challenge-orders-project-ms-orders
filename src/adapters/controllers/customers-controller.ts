import { z } from "zod";
import { Customer } from "../gateways/interfaces/customer";
import { CustomerDTO } from "../../base/dto/customer";
import { BadRequestException } from "../../core/entities/exceptions";
import { CustomerRepository } from "../gateways/repositories/customer-repository";
import { CustomerUseCase } from "../gateways/use-cases/customer-use-case";
import { CustomerRepositoryImpl } from "../repositories/customer-repository";
import { DbConnection } from "../gateways/db/db-connection";
import { CustomerUseCaseImpl } from "../../core/use-cases/customer/customer-use-case";
import { CustomerPresenter } from "../presenters/customer";

export class CustomerController implements Customer {
  private customerRepository: CustomerRepository
  private customerUseCase: CustomerUseCase

  constructor(readonly database: DbConnection) {
    this.customerRepository = new CustomerRepositoryImpl(database)
    this.customerUseCase = new CustomerUseCaseImpl(this.customerRepository)
  }
  async create(bodyParams: unknown): Promise<CustomerDTO> {
    const schema = z.object({
      cpf: z.string(),
      name: z.string(),
      email: z.string(),
      phone: z.string(),
      address: z.string(),
    })

    const result = schema.safeParse(bodyParams)
    if (!result.success) {
      throw new BadRequestException('Validation error!', result.error.issues)
    }

    const { cpf, name, email, address, phone } = result.data

    const customerDTO = new CustomerDTO(
      cpf,
      name,
      email,
      address,
      phone,
    )
    const customerEntity = await this.customerUseCase.create(customerDTO)

    return CustomerPresenter.EntityToDto(customerEntity)
  }

  async remove(id: any): Promise<void> {
    const schema = z.object({
      id: z.number()
    })

    const result = schema.safeParse({
      id: id
    })
    if (!result.success) {
      throw new BadRequestException('Validation error!', result.error.issues)
    }

    await this.customerUseCase.remove(id)
  }

}