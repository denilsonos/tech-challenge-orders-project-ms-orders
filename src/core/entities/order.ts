
import { PaymentEntity } from './payment'
import { ItemEntity } from './item'

export class OrderEntity {
  public id?: number

  public status!: string

  public clientId: number | undefined

  public total!: number

  public createdAt!: Date;

  public updatedAt!: Date;

  public items?: ItemEntity[]

  public payment?: PaymentEntity

  constructor(status: string, clientId: number | undefined, total: number, createdAt: Date, updatedAt: Date, items: ItemEntity[], id?: number) {
    this.status= status
    this.clientId=clientId
    this.total = total
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.items = items
    this.id = id
  }
}
