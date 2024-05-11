import { OrderEntity } from "../../core/entities/order";
import { PaymentEntity } from "../../core/entities/payment";
import { ItemDTO } from "./item";

export class OrderDTO {
  public id?: number

  public status!: string

  public clientId: number | undefined

  public total!: number

  public createdAt!: Date;

  public updatedAt!: Date;

  public items?: ItemDTO[]

  public payment?: PaymentEntity

  constructor(status: string, clientId: number | undefined, createdAt: Date, updatedAt: Date, items: ItemDTO[], id?: number, total?: number) { 
    this.status = status
    this.clientId = clientId
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.items = items
    this.id = id
    this.total = total?? this.calculateTotalDTO(items)
  }

  public fromEntity(): OrderEntity {
    
    const order = new OrderEntity(
      this.status,
      this.clientId,
      this.total,
      this.createdAt,
      this.updatedAt, 
      this.items!.map((item) => item.fromEntity()),
      this.id
    )
    return order
  }

  private calculateTotalDTO(items: ItemDTO[]): number {
    return items.reduce((total, item) => {
      return total + item.quantity! * Number(item.value)
    }, 0)
  }
}