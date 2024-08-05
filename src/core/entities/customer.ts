export class CustomerEntity {
    public id: number
    public cpf: string
    public name: string
    public email: string
    public address: string
    public phone: string

    constructor(cpf: string, name: string, email: string, address: string, phone: string, id: number) {
        this.cpf = cpf;
        this.name = name;
        this.email = email;
        this.address = address;
        this.phone = phone;
        this.id = id;
    }
}