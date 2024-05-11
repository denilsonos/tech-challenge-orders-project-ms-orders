import { FindItemParams } from "../../../base/dto/generic/find-item-params";
import { ItemRepository } from "../../../adapters/gateways/repositories/item-repository";
import { ItemUseCase } from "../../../adapters/gateways/use-cases/item-use-case";
import { ItemDAO } from "../../../base/dao/item";
import { ItemDTO, ItemOrderDTO } from "../../../base/dto/item";
import { ConflictException, NotFoundException } from "../../entities/exceptions";
import { ItemEntity } from "../../entities/item";

export class ItemUseCaseImpl implements ItemUseCase {
  constructor(private readonly itemRepository: ItemRepository) { }

  public async create(params: ItemDTO): Promise<ItemEntity> {      
      const item: ItemDAO | null = await this.itemRepository.getByName(params.name)

      if(item) {
        throw new ConflictException('Item already exists!');
      }

      const newItem = new ItemDAO();
      newItem.name = params.name
      newItem.description = params.description
      newItem.category = params.category
      newItem.value = params.value
      newItem.image = params.image!
      newItem.quantity = params.quantity
  
      const itemCreated = await this.itemRepository.save(newItem);
      return ItemDAO.daoToEntity(itemCreated);

  }

  public async getById(itemId: number): Promise<ItemEntity> {
    const item: ItemDAO | null = await this.itemRepository.getById(itemId)
    if (!item) {
      throw new NotFoundException('Item not found!')
    }
    return ItemDAO.daoToEntity(item);
  }

  public async findByParams(params: FindItemParams): Promise<ItemEntity[] | []> {
    const items: ItemDAO[] | null = await this.itemRepository.findByParams(params)
    return ItemDAO.daosToEntities(items);
  }

  public async delete(itemId: number): Promise<void> {
    const item = await this.itemRepository.getById(itemId)
    if (!item) {
      throw new NotFoundException('Item not found!')
    }
    await this.itemRepository.deleteById(itemId)
  }

  public async update(itemId: number, params: ItemDTO): Promise<void> {
    const item = await this.itemRepository.getById(itemId)
    if (!item) {
      throw new NotFoundException('Item not found!')
    }

    const { name, description, category, value, image } = params;
    const itemDTO = new ItemDTO(name, description, category, value, 0, Buffer.from(image!));
    await this.itemRepository.update(itemId, itemDTO);
  }

  public async getAllByIds(itemIds: ItemOrderDTO[]): Promise<ItemEntity[]> {
    let listItems: ItemEntity[] = [];

    listItems = await Promise.all(itemIds.map(async (item) => {
      const itemFound = await this.getById(item.itemId);
      itemFound.quantity = item.quantity
      return itemFound;
    }))
    return listItems;
  }

}
