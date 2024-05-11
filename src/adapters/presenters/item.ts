import { ItemDAO } from "../../base/dao/item";
import { ItemDTO } from "../../base/dto/item";
import { ItemEntity } from "../../core/entities/item";


export class ItemPresenter {

    static EntityToDto(itemEntity: ItemEntity): ItemDTO {
        return new ItemDTO(
            itemEntity.name,
            itemEntity.description,
            itemEntity.category,
            Number(itemEntity.value),
            itemEntity.quantity,
            Buffer.from(itemEntity.image),
            itemEntity?.id
        );
    }

    static EntitiesToDto(itemEntities: ItemEntity[]): ItemDTO[] {
        const listDtos: ItemDTO[] = [];

        itemEntities.forEach(itemEntity => {
            listDtos.push(ItemPresenter.EntityToDto(itemEntity));
        });

        return listDtos;
    }

    static DTOToDAO(itemDTO: ItemDTO): ItemDAO {
        const itemDAO = new ItemDAO()
        itemDAO.name = itemDTO.name
        itemDAO.description = itemDTO.description
        itemDAO.category = itemDTO.category
        itemDAO.value = Number(itemDTO.value!)
        itemDAO.image = Buffer.from(itemDTO.image!)
        itemDAO.id = itemDTO.id
        itemDAO.quantity = itemDTO.quantity
        return itemDAO
    }

    static DTOsToDAOs(itemsDTO: ItemDTO[]): ItemDAO[] {
        const listDaos: ItemDAO[] = [];

        itemsDTO.forEach(itemDTO => {
            listDaos.push(ItemPresenter.DTOToDAO(itemDTO));
        });

        return listDaos;
    }

}