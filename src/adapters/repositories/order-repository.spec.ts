import { SelectQueryBuilder } from "typeorm";
import { OrderDAO } from "../../base/dao/order"
import { DbConnectionImpl } from "../../frameworks/database/db-connection-impl";
import { OrderRepositoryImpl } from "./order-repository";

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
                        save: jest.fn().mockResolvedValue(new OrderDAO()),
                        findOne: jest.fn().mockResolvedValue(new OrderDAO()),
                        find: jest.fn().mockResolvedValue(new OrderDAO()),
                        update: jest.fn().mockResolvedValue(new OrderDAO()),
                        delete: jest.fn().mockResolvedValue(new OrderDAO()),
                        createQueryBuilder: jest.fn().mockReturnThis(),
                        addOrderBy: jest.fn().mockReturnThis(),
                        orderBy: jest.fn().mockReturnThis(),
                        where: jest.fn().mockReturnThis(),
                        leftJoinAndSelect: jest.fn().mockReturnThis(),
                        getMany: jest.fn().mockResolvedValue([new OrderDAO()]),
                    })
                })
            }
        })
    }
});

describe('OrderRepository', () => {
    let database: DbConnectionImpl;
    let orderRepository: OrderRepositoryImpl;

    beforeAll(() => {
        database = new DbConnectionImpl();
        orderRepository = new OrderRepositoryImpl(database);
    });

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    it('should save order', async () => {
        // Arrange
        const orderDAO = new OrderDAO();
        jest.spyOn(database.getConnection().getRepository(OrderDAO), 'save').mockResolvedValue(orderDAO);

        // Act
        const result = await orderRepository.save(orderDAO);

        // Assert
        expect(database.getConnection().getRepository(OrderDAO).save).toHaveBeenCalledTimes(1);
        expect(result).toEqual(orderDAO);
    });

    it('should get order by id', async () => {
        // Arrange
        const orderDAO = new OrderDAO();
        jest.spyOn(database.getConnection().getRepository(OrderDAO), 'findOne').mockResolvedValue(orderDAO);

        // Act
        const result = await orderRepository.getById(1);

        // Assert
        expect(database.getConnection().getRepository(OrderDAO).findOne).toHaveBeenCalledTimes(1);
        expect(result).toEqual(orderDAO);
    });

    it('should get order by params', async () => {
        // Arrange
        const orderDAO = new OrderDAO();
        jest.spyOn(database.getConnection().getRepository(OrderDAO), 'find').mockResolvedValue([orderDAO]);

        // Act
        const result = await orderRepository.findByParams(1, 'status');

        // Assert
        expect(database.getConnection().getRepository(OrderDAO).find).toHaveBeenCalledTimes(1);
        expect(result).toEqual([orderDAO]);
    });

    it('should get all orders', async () => {
        // Arrange
        const orderDAO = new OrderDAO();
        jest.spyOn(database.getConnection().getRepository(OrderDAO), 'createQueryBuilder').mockReturnThis();

        // Act
        const result = await orderRepository.getAll();

        // Assert
        expect(database.getConnection().getRepository(OrderDAO).createQueryBuilder).toHaveBeenCalledTimes(1);
        expect(result).toEqual([orderDAO]);
    });

    it('should update order', async () => {
        // Arrange
        const orderDAO = new OrderDAO();
        jest.spyOn(database.getConnection().getRepository(OrderDAO), 'update').mockReturnThis();

        // Act
        await orderRepository.update(1, 'status');

        // Assert
        expect(database.getConnection().getRepository(OrderDAO).update).toHaveBeenCalledTimes(1);
    });
});