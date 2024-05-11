export class ItemEntity {
    public id?: number
    public quantity: number
    public name: string
    public description: string
    public category: string
    public value: number | string
    public image: Buffer
    public createdAt?: string
    public updatedAt?: string

    constructor(quantity: number, name: string, description: string, category: string, value: number | string, image: Buffer, id?: number) {
        this.quantity = quantity;
        this.name = name;
        this.description = description;
        this.category = category;
        this.value = value;
        this.image = image;
        this.id = id;
    }
}