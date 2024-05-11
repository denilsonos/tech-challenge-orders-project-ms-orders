import { ItemDAO } from "../../base/dao/item";
import { ItemDTO } from "../../base/dto/item";
import { DbConnectionImpl } from "../../frameworks/database/db-connection-impl";
import { ItemRepositoryImpl } from "./item-repository";

jest.mock('typeorm', () => {
    return {
        Entity: () => jest.fn(),
        PrimaryGeneratedColumn: () => jest.fn(),
        Column: () => jest.fn(),
        CreateDateColumn: () => jest.fn(),
        UpdateDateColumn: () => jest.fn(),
        ManyToMany: () => jest.fn(),
        JoinTable: () => jest.fn(),
        OneToOne: () => jest.fn(),
        JoinColumn: () => jest.fn(),
    }
});

jest.mock('../../frameworks/database/db-connection-impl', () => {
    return {
        DbConnectionImpl: jest.fn().mockImplementation(() => {
            return {
                getConnection: jest.fn().mockReturnValue({
                    getRepository: jest.fn().mockReturnValue({
                        save: jest.fn().mockResolvedValue(new ItemDAO()),
                        findOneBy: jest.fn().mockResolvedValue(new ItemDAO()),
                        find: jest.fn().mockResolvedValue(new ItemDAO()),
                        update: jest.fn().mockResolvedValue(new ItemDAO()),
                        delete: jest.fn().mockReturnThis(),
                    })
                })
            }
        })
    }
});

describe('ItemRepository', () => {
    let database: DbConnectionImpl;
    let itemRepository: ItemRepositoryImpl;

    beforeAll(() => {
        database = new DbConnectionImpl();
        itemRepository = new ItemRepositoryImpl(database);
    });

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    it('should save item', async () => {
        // Arrange
        const itemDAO = new ItemDAO();
        jest.spyOn(database.getConnection().getRepository(ItemDAO), 'save').mockResolvedValue(itemDAO);

        // Act
        const result = await itemRepository.save(itemDAO);

        // Assert
        expect(database.getConnection().getRepository(ItemDAO).save).toHaveBeenCalledTimes(1);
        expect(result).toEqual(itemDAO);
    });

    it('should get item by id', async () => {
        // Arrange
        jest.spyOn(database.getConnection().getRepository(ItemDAO), 'findOneBy').mockResolvedValue(new ItemDAO());

        // Act
        const result = await itemRepository.getById(1);

        // Assert
        expect(database.getConnection().getRepository(ItemDAO).findOneBy).toHaveBeenCalledTimes(1);
        expect(result).toEqual(new ItemDAO());
    });

    it('should get by name', async () => {
        // Arrange
        jest.spyOn(database.getConnection().getRepository(ItemDAO), 'findOneBy').mockResolvedValue(new ItemDAO());

        // Act
        const result = await itemRepository.getByName('item');

        // Assert
        expect(database.getConnection().getRepository(ItemDAO).findOneBy).toHaveBeenCalledTimes(1);
        expect(result).toEqual(new ItemDAO());
    });

    it('should find by params', async () => {
        // Arrange
        jest.spyOn(database.getConnection().getRepository(ItemDAO), 'find').mockResolvedValue([new ItemDAO()]);

        // Act
        const result = await itemRepository.findByParams({ category: 'snack' });

        // Assert
        expect(database.getConnection().getRepository(ItemDAO).find).toHaveBeenCalledTimes(1);
        expect(result).toEqual([new ItemDAO()]);
    });

    it('should update item', async () => {
        // Arrange
        jest.spyOn(database.getConnection().getRepository(ItemDAO), 'update');

        // Act
        await itemRepository.update(1, { value: 19.90 } as ItemDTO);

        // Assert
        expect(database.getConnection().getRepository(ItemDAO).update).toHaveBeenCalledTimes(1);
    });

    it('should delete item by id', async () => {
        // Arrange
        jest.spyOn(database.getConnection().getRepository(ItemDAO), 'delete');

        // Act
        await itemRepository.deleteById(1);

        // Assert
        expect(database.getConnection().getRepository(ItemDAO).delete).toHaveBeenCalledTimes(1);
    });
});
