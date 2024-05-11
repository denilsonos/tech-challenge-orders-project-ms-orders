import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

import { ItemEntity } from "../../core/entities/item"
import { OrderDAO } from "./order"

@Entity('item')
export class ItemDAO {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    public id?: number

    @Column({ type: 'varchar', name: 'name' })
    public name!: string

    @Column({ type: 'varchar', name: 'description' })
    public description!: string

    @Column({ type: 'varchar', name: 'category' })
    public category!: string

    @Column({ type: 'decimal', precision: 5, scale: 2, name: 'value' })
    public value!: number | string

    @Column({ type: 'longblob', name: 'image' })
    public image!: Buffer

    @Column({ type: 'int', name: 'quantity', default: null })
    public quantity?: number

    @CreateDateColumn({ type: "datetime", name: 'createdAt' })
    public createdAt!: Date;

    @UpdateDateColumn({ type: 'datetime', name: 'updatedAt' })
    public updatedAt!: Date;

    @ManyToMany(() => OrderDAO, (order) => order.items)
    @JoinTable()
    public orders?: OrderDAO[]

    constructor() {}

    static daoToEntity(itemDao: ItemDAO): ItemEntity {
        return new ItemEntity(
            Number(itemDao.quantity),
            itemDao.name,
            itemDao.description,
            itemDao.category,
            itemDao.value,
            itemDao.image,
            itemDao.id
        )
    }

    static daosToEntities(itemDaos: ItemDAO[]): ItemEntity[] {
        const listEntities: ItemEntity[] = []; 

        if(itemDaos.length > 0) {
            itemDaos.forEach(itemDao => {
                listEntities.push(ItemDAO.daoToEntity(itemDao))
            });
        }
        
        return listEntities;
    }
}
