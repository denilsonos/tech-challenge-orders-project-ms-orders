import { ItemEntity } from "../../core/entities/item"

export class ItemDTO {
  public id?: number
  public name: string
  public description: string
  public category: string
  public value: number
  public image?: Buffer
  public quantity: number

  constructor(name: string, description: string, category: string, value: number, quantity: number, image?: Buffer, id?: number) {
    this.name = name;
    this.description = description;
    this.category = category;
    this.value = value;
    this.image = image;
    this.quantity = quantity;
    this.id = id;
  }

  public fromEntity(): ItemEntity {
    return {
      id: this.id!,
      image: this.image!,
      name: this.name,
      description: this.description,
      category: this.category,
      value: this.value,
      quantity: this.quantity,
    }
  }


}

export class ItemOrderDTO {
  public itemId: number
  public quantity: number

  constructor(itemId: number, quantity: number) {
    this.itemId = itemId
    this.quantity = quantity
  }
}


