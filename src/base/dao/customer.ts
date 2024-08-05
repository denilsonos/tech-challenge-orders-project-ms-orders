import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { CustomerEntity } from '../../core/entities/customer'

@Entity('customer')
export class CustomerDAO {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  public id?: number
  
  @Column({ type: 'varchar', name: 'cpf' })
  public cpf!: string
  
  @Column({ type: 'varchar', name: 'email' })
  public email!: string

  @Column({ type: 'varchar', name: 'name' })
  public name!: string

  @Column({ type: 'varchar', name: 'address' })
  public address!: string

  @Column({ type: 'varchar', name: 'phone' })
  public phone!: string

  @CreateDateColumn({ type: "datetime", name: 'createdAt' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updatedAt' })
  public updatedAt!: Date;
  
  static daoToEntity(customerDAO: CustomerDAO): CustomerEntity {
    return new CustomerEntity(
      customerDAO.cpf,
      customerDAO.name,
      customerDAO.email,
      customerDAO.address,
      customerDAO.phone,
      customerDAO.id!,
    )
  }

  static daosToEntities(customerDAOs: CustomerDAO[]): CustomerEntity[] {
    const listEntities: CustomerEntity[] = [];
    if(customerDAOs.length > 0) {
      customerDAOs.forEach(dao => {
        listEntities.push(CustomerDAO.daoToEntity(dao))
      });
    }
  
    return listEntities;
  }

}