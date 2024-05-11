import { ItemRepositoryImpl } from "../../../adapters/repositories/item-repository";
import { ItemDAO } from "../../../base/dao/item";
import { ItemDTO } from "../../../base/dto/item";
import { DbConnectionImpl } from "../../../frameworks/database/db-connection-impl";
import { ItemUseCaseImpl } from "./item-use-case";

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

jest.mock('../../../frameworks/database/db-connection-impl', () => {
    return {
        DbConnectionImpl: jest.fn().mockImplementation(() => {
            return {
                getConnection: jest.fn().mockReturnValue({
                    getRepository: jest.fn().mockReturnValue({
                        findOneBy: jest.fn().mockResolvedValue(new ItemDAO()),
                        save: jest.fn().mockResolvedValue(new ItemDAO()),
                        delete: jest.fn().mockReturnThis(),
                        update: jest.fn().mockReturnThis(),
                    })
                })
            }
        })
    }
});

describe('ItemUseCase', () => {

    let database: DbConnectionImpl;
    let itemUseCase: ItemUseCaseImpl;
    let itemRepository: ItemRepositoryImpl;

    beforeAll(() => {
        database = new DbConnectionImpl();
        itemRepository = new ItemRepositoryImpl(database);
        itemUseCase = new ItemUseCaseImpl(itemRepository);
    });

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    it('should create item', async () => {
        // Arrange
        const itemDTO = new ItemDTO(
            'name',
            'description',
            'category',
            10,
            0,
            Buffer.from('image')
        );

        const itemDAO = new ItemDAO();
        itemDAO.name = itemDTO.name;
        itemDAO.description = itemDTO.description;
        itemDAO.category = itemDTO.category;
        itemDAO.value = itemDTO.value;
        itemDAO.image = itemDTO.image!;
        itemDAO.quantity = itemDTO.quantity;

        jest.spyOn(itemRepository, 'getByName').mockResolvedValue(null);
        jest.spyOn(itemRepository, 'save').mockResolvedValue(itemDAO);
        
        // Act
        const result = await itemUseCase.create(itemDTO);
        
        // Assert
        expect(itemRepository.save).toHaveBeenCalledTimes(1);
        expect(itemRepository.getByName).toHaveBeenCalledTimes(1);
        expect(result).toEqual(ItemDAO.daoToEntity(itemDAO));
        
    });

    it('should fail to create item', async () => {
        // Arrange
        const itemDTO = new ItemDTO(
            'name',
            'description',
            'category',
            10,
            0,
            Buffer.from('image')
        );

        const itemDAO = new ItemDAO();
        itemDAO.name = itemDTO.name;
        itemDAO.description = itemDTO.description;
        itemDAO.category = itemDTO.category;
        itemDAO.value = itemDTO.value;
        itemDAO.image = itemDTO.image!;
        itemDAO.quantity = itemDTO.quantity;

        jest.spyOn(itemRepository, 'getByName').mockResolvedValue(itemDAO);
        
        // Act
        try {
            await itemUseCase.create(itemDTO);
        } catch (error) {
            // Assert
            expect(itemRepository.getByName).toHaveBeenCalledTimes(1);
            expect(itemRepository.save).toHaveBeenCalledTimes(0);
            expect((error as any).message).toBe('Item already exists!');
        }
    });

    it('should get by params', async () => {
        // Arrange
        const itemDTO = new ItemDTO(
            'name',
            'description',
            'category',
            10,
            0,
            Buffer.from('image')
        );

        const itemDAO = new ItemDAO();
        itemDAO.name = itemDTO.name;
        itemDAO.description = itemDTO.description;
        itemDAO.category = itemDTO.category;
        itemDAO.value = itemDTO.value;
        itemDAO.image = itemDTO.image!;
        itemDAO.quantity = itemDTO.quantity;

        jest.spyOn(itemRepository, 'findByParams').mockResolvedValue([itemDAO]);
        
        // Act
        const result = await itemUseCase.findByParams({ category: 'category' });
        
        // Assert
        expect(itemRepository.findByParams).toHaveBeenCalledTimes(1);
        expect(result).toEqual([itemDAO]);
    });

    it('should get by id', async () => {
        // Arrange
        const itemDTO = new ItemDTO(
            'name',
            'description',
            'category',
            10,
            0,
            Buffer.from('image')
        );

        const itemDAO = new ItemDAO();
        itemDAO.id = 1;
        itemDAO.name = itemDTO.name;
        itemDAO.description = itemDTO.description;
        itemDAO.category = itemDTO.category;
        itemDAO.value = itemDTO.value;
        itemDAO.image = itemDTO.image!;
        itemDAO.quantity = itemDTO.quantity;

        jest.spyOn(itemRepository, 'getById').mockResolvedValue(itemDAO);
        
        // Act
        const result = await itemUseCase.getById(1);
        
        // Assert
        expect(result).toEqual(itemDAO);
        expect(result.id).toEqual(itemDAO.id);
    });

    it('should fail to get by id', async () => {
        // Arrange
        jest.spyOn(itemRepository, 'getById').mockResolvedValue(null);
        
        // Act
        try {
            await itemUseCase.getById(1);
        } catch (error) {
            // Assert
            expect(itemRepository.getById).toHaveBeenCalledTimes(1);
            expect((error as any).message).toBe('Item not found!');
        }
    });

    it('should delete item', async () => {
        // Arrange
        jest.spyOn(itemRepository, 'getById').mockResolvedValue(new ItemDAO());
        jest.spyOn(itemRepository, 'deleteById').mockResolvedValue();
        
        // Act
        await itemUseCase.delete(1);
        
        // Assert
        expect(itemRepository.deleteById).toHaveBeenCalledTimes(1);
    });

    it('should fail to delete item', async () => {
        // Arrange
        jest.spyOn(itemRepository, 'getById').mockResolvedValue(null);
        
        // Act
        try {
            await itemUseCase.delete(1);
        } catch (error) {
            // Assert
            expect(itemRepository.getById).toHaveBeenCalledTimes(1);
            expect(itemRepository.deleteById).toHaveBeenCalledTimes(0);
            expect((error as any).message).toBe('Item not found!');
        }
    });

    it('should update item', async () => {
        // Arrange
        const itemDTO = new ItemDTO(
            'name',
            'description 2',
            'category',
            20,
            10,
            Buffer.from('image')
        );

        jest.spyOn(itemRepository, 'getById').mockResolvedValue(new ItemDAO());
        jest.spyOn(itemRepository, 'update').mockResolvedValue();
        
        // Act
        await itemUseCase.update(1, itemDTO);
        
        // Assert
        expect(itemRepository.getById).toHaveBeenCalledTimes(1);
        expect(itemRepository.update).toHaveBeenCalledTimes(1);
    });

    it('should fail to update item', async () => {
        // Arrange
        const itemDTO = new ItemDTO(
            'name',
            'description 2',
            'category',
            20,
            10,
            Buffer.from('image')
        );
        jest.spyOn(itemRepository, 'getById').mockResolvedValue(null);
        
        // Act
        try {
            await itemUseCase.update(1, itemDTO);
        } catch (error) {
            // Assert
            expect(itemRepository.getById).toHaveBeenCalledTimes(1);
            expect(itemRepository.update).toHaveBeenCalledTimes(0);
            expect((error as any).message).toBe('Item not found!');
        }
    });
    
    it('should get all by ids', async () => {
        // Arrange
        const itemDAO = new ItemDAO();
        itemDAO.quantity = 1;
        jest.spyOn(itemRepository, 'getById').mockResolvedValue(itemDAO);

        // Act
        const result = await itemUseCase.getAllByIds([{ itemId: 1, quantity: 1 }]);
        
        // Assert
        expect(itemRepository.getById).toHaveBeenCalledTimes(1);
        expect(result).toEqual([ItemDAO.daoToEntity(itemDAO)]);
    });
});
