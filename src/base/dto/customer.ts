import { CustomerEntity } from "../../core/entities/customer"

export class CustomerDTO {
    public id: number
    public cpf: string
    public email: string
    public name: string
    public address: string
    public phone: string

    constructor(cpf: string, name: string, email: string, address: string, phone: string, id?: number) {
        this.id = id!;
        this.cpf = cpf;
        this.email = email;
        this.name = name;
        this.address = address;
        this.phone = phone;
    }

    public toEntity(): CustomerEntity {
        return new CustomerEntity(
            this.cpf,
            this.name,
            this.email,
            this.address,
            this.phone,
            this.id,
        )
      }
}