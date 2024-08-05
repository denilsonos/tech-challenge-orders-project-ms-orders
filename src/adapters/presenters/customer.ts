import { CustomerDTO } from "../../base/dto/customer";
import { CustomerEntity } from "../../core/entities/customer";

export class CustomerPresenter {

    static EntityToDto(customerEntity: CustomerEntity): CustomerDTO {
        return new CustomerDTO(
            customerEntity.cpf,
            customerEntity.name,
            customerEntity.email,
            customerEntity.address,
            customerEntity.phone,
            customerEntity?.id
        );
    }

    static EntitiesToDto(customerEntities: CustomerEntity[]): CustomerDTO[] {
        return customerEntities.map(entity => CustomerPresenter.EntityToDto(entity))
    }
}