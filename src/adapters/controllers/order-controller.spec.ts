import { ItemDAO } from "../../base/dao/item";
import { OrderDAO } from "../../base/dao/order";
import { OrderStatus } from "../../core/entities/enums/order-status";
import { OrderUseCaseImpl } from "../../core/use-cases/orders/order-use-case";
import { DbConnectionImpl } from "../../frameworks/database/db-connection-impl";
import { FakeQueueServiceAdapter } from "../external-services/fake-queue-service/fake-queue-service-adapter";
import { PreparationClient } from "../external-services/preparation-client/preparation-client";
import { PreparationClientAdapter } from "../gateways/preparation-client-adapter";
import { OrderPresenter } from "../presenters/order";
import { OrderRepositoryImpl } from "../repositories/order-repository";
import { OrderController } from "./orders-controller";
import { ItemCategory } from "./validators/enums/item-category";
import nock from 'nock';

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
                        findOneBy: jest.fn().mockResolvedValue(new OrderDAO()),
                        findOne: jest.fn().mockResolvedValue(null),
                        find: jest.fn().mockResolvedValue(new OrderDAO()),
                        save: jest.fn(),
                        delete: jest.fn(),
                        update: jest.fn().mockReturnThis(),
                    })
                })
            }
        })
    }
});

describe('OrderController', () => {

    let database: DbConnectionImpl;
    let orderControler: OrderController;
    let orderUseCase: OrderUseCaseImpl;
    let orderRepository: OrderRepositoryImpl;
    let queueService: FakeQueueServiceAdapter;
    let preparationClient: PreparationClientAdapter;

    beforeAll(() => {
        database = new DbConnectionImpl();
        preparationClient = new PreparationClient();
        orderControler = new OrderController(database);
        orderRepository = new OrderRepositoryImpl(database);
        orderUseCase = new OrderUseCaseImpl(orderRepository, queueService, preparationClient);
    });
    beforeEach(() => {
        jest.clearAllMocks();
    })

    it('should create a new order', async () => {
        // Arrange
        process.env.PREPARATION_MS_HOST = 'http://localhost:3001/api/v1';
        nock(process.env.PREPARATION_MS_HOST).post('/orders/1').reply(200)
        const bodyParams = {
            items: [{ itemId: 1, quantity: 1 }],
            clientId: 1
        };

        const itemDAO = new ItemDAO();
        itemDAO.id = 1;
        itemDAO.name = 'X Bacon',
            itemDAO.description = 'A hamburger is a sandwich made of a grilled or fried patty of ground meat, usually beef, served in a bun or roll.',
            itemDAO.category = ItemCategory.Snack
        itemDAO.value = 19
        itemDAO.quantity = 1
        itemDAO.image = Buffer.from('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')

        const orderDao = new OrderDAO();
        orderDao.id = 1;
        orderDao.items = [itemDAO];
        jest.spyOn(database.getConnection().getRepository(ItemDAO), 'findOneBy').mockResolvedValue(itemDAO);
        jest.spyOn(database.getConnection().getRepository(ItemDAO), 'findOne').mockResolvedValue(itemDAO);
        jest.spyOn(database.getConnection().getRepository(OrderDAO), 'save').mockResolvedValue(orderDao);
        
        // Act
        const result = await orderControler.create(bodyParams);

        // Assert
        expect(result.items![0].id).toEqual(bodyParams.items[0].itemId);
        expect(database.getConnection().getRepository(OrderDAO).save).toHaveBeenCalledTimes(1);
    });

    it('should fail to create a new order', async () => {
        // Arrange
        const bodyParams = {
            items: [{ itemId: 1, quantity: 1 }],
            clientId: null
        }
        jest.spyOn(orderUseCase, 'create').mockRejectedValue(null)
        // Act
        try {
            await orderControler.create(bodyParams);
        } catch (error) {
            // Assert
            expect((error as any).message).toEqual("Validation error!");
            expect(orderUseCase.create).toHaveBeenCalledTimes(0);
        }
    });

    it('should find an order by params', async () => {
        // Arrange
        const params = {
            clientId: "1",
            status: OrderStatus.Created
        }

        const itemDAO = new ItemDAO();
        itemDAO.id = 1;
        itemDAO.name = 'X Bacon',
            itemDAO.description = 'A hamburger is a sandwich made of a grilled or fried patty of ground meat, usually beef, served in a bun or roll.',
            itemDAO.category = ItemCategory.Snack
        itemDAO.value = 19
        itemDAO.quantity = 1
        itemDAO.image = Buffer.from('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')

        const orderDao = new OrderDAO();
        orderDao.id = 1;
        orderDao.items = [itemDAO];
        orderDao.status = OrderStatus.Created;
        jest.spyOn(database.getConnection().getRepository(OrderDAO), 'find').mockResolvedValue([orderDao]);

        // Act
        const result = await orderControler.findByParams(params);

        // Assert
        expect(result).toEqual([OrderPresenter.EntityToDto(OrderDAO.daoToEntity(orderDao))]);
    });

    it('should fail to find an order by params', async () => {
        // Arrange
        const params = {
            clientId: 1,
            status: OrderStatus.Created
        }

        jest.spyOn(orderUseCase, 'findByParams').mockRejectedValue(null)
        // Act
        try {
            await orderControler.findByParams(params);
        } catch (error) {
            // Assert
            expect((error as any).message).toEqual("Validation error!");
            expect(orderUseCase.findByParams).toHaveBeenCalledTimes(0);
        }
    });

    it('should get an order by id', async () => {
        // Arrange
        const identifier = { id: "1" }
        const itemDAO = new ItemDAO();
        itemDAO.id = 1;
        itemDAO.name = 'X Bacon',
            itemDAO.description = 'A hamburger is a sandwich made of a grilled or fried patty of ground meat, usually beef, served in a bun or roll.',
            itemDAO.category = ItemCategory.Snack
        itemDAO.value = 19
        itemDAO.quantity = 1
        itemDAO.image = Buffer.from('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')

        const orderDao = new OrderDAO();
        orderDao.id = 1;
        orderDao.items = [itemDAO];
        orderDao.status = OrderStatus.Created;

        jest.spyOn(database.getConnection().getRepository(OrderDAO), 'findOne').mockResolvedValue(orderDao);

        // Act
        const result = await orderControler.get(identifier);

        // Assert
        expect(result).toEqual(OrderPresenter.EntityToDto(OrderDAO.daoToEntity(orderDao)));
        expect(database.getConnection().getRepository(OrderDAO).findOne).toHaveBeenCalledTimes(1);
    });

    it('should fail to get an order by id and id is invalid', async () => {
        // Arrange
        const identifier = { id: 3 }

        // Act
        try {
            await orderControler.get(identifier);
        } catch (error) {
            // Assert
            expect((error as any).message).toEqual("Validation error!");
        }
    });

    it('should update an order', async () => {
        // Arrange
        const params = {
            status: OrderStatus.InPreparation
        }

        const itemDAO = new ItemDAO();
        itemDAO.id = 1;
        itemDAO.name = 'X Bacon',
            itemDAO.description = 'A hamburger is a sandwich made of a grilled or fried patty of ground meat, usually beef, served in a bun or roll.',
            itemDAO.category = ItemCategory.Snack
        itemDAO.value = 19
        itemDAO.quantity = 1
        itemDAO.image = Buffer.from('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')

        const orderDAO = new OrderDAO();
        orderDAO.id = 50;
        orderDAO.items = [itemDAO];
        orderDAO.status = OrderStatus.InPreparation;

        jest.spyOn(database.getConnection().getRepository(OrderDAO), 'findOne').mockResolvedValue(orderDAO);
        jest.spyOn(database.getConnection().getRepository(OrderDAO), 'update');
        // Act
        await orderControler.update(params, {id: "50"});

        // Assert
        expect(database.getConnection().getRepository(OrderDAO).update).toHaveBeenCalledTimes(1);
    });

    it('should fail to update an order and status is invalid', async () => {
        // Arrange
        const params = {
            status: null
        }
        // Act
        try {
            await orderControler.update(params, {id: null});
        } catch (error) {
            // Assert
            expect((error as any).message).toEqual("Validation error!");
        }
    });

    it('should fail to update an order and id is invalid', async () => {
        // Arrange
        const params = {
            status: OrderStatus.InPreparation
        }
        // Act
        try {
            await orderControler.update(params, {id: null});
        } catch (error) {
            // Assert
            expect((error as any).message).toEqual("Validation error!");
        }
    });
    // //TODO: fix
    // it('should fail to update an order not found', async () => {
    //     // Arrange
    //     const params = {
    //         status: OrderStatus.InPreparation
    //     }
    //     // jest.spyOn(orderRepository, 'getById').mockRejectedValue(null)
    //     // Act
    //     try {
    //         await orderControler.update(params, {id: "57"});
    //     } catch (error) {
    //         // Assert
    //         expect((error as any).message).toEqual("Order not found!");
    //     }
    // });
});