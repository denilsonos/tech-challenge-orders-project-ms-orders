import { ItemUseCaseImpl } from "../../core/use-cases/item/item-use-case";
import { ItemRepository } from "../gateways/repositories/item-repository";
import { ItemUseCase } from "../gateways/use-cases/item-use-case";
import { ItemRepositoryImpl } from "../repositories/item-repository";
import { Item } from "../gateways/interfaces/item";
import { z } from "zod";
import { ItemCategory } from "./validators/enums/item-category";
import { isBase64 } from "./validators/base64-validator";
import { BadRequestException } from "../../core/entities/exceptions";
import { ItemDTO } from "../../base/dto/item";
import { ItemPresenter } from "../presenters/item";
import { ItemEntity } from "../../core/entities/item";
import { validateId } from "./validators/identifier-validator";
import { nonemptyObject } from "./validators/nonempty-object-validator";
import { DbConnection } from "../gateways/db/db-connection";


export class ItemController implements Item {
    private itemUseCase: ItemUseCase;
    private itemRepository: ItemRepository;

    constructor(readonly database: DbConnection) {
        this.itemRepository = new ItemRepositoryImpl(database);
        this.itemUseCase = new ItemUseCaseImpl(this.itemRepository);
    }
    async create(bodyParams: unknown): Promise<number> {
        const schema = z.object({
            name: z.string(),
            description: z.string(),
            category: z.nativeEnum(ItemCategory),
            value: z.number(),
            image: z.string().refine(value => isBase64(value), {
                message: 'Invalid base64 format',
            }),
        })

        const result = schema.safeParse(bodyParams);
        if (!result.success) {
            throw new BadRequestException('Validation error!', result.error.issues)
        }

        const { name, description, category, value, image } = result.data;
        const itemDTO = new ItemDTO(name, description, category, value, 0, Buffer.from(image));
        const item: ItemEntity = await this.itemUseCase.create(itemDTO);
        return ItemPresenter.EntityToDto(item).id!;
    }

    public async delete(params: unknown): Promise<void> {
        
        const result = validateId(params)
        
        if (!result.success) {
            throw new BadRequestException('Validation error!', result.error.issues)
        }
        const itemId = Number(result.data.id);

        await this.itemUseCase.delete(itemId)
    }

    public async update(params: unknown, body: unknown): Promise<void> {
        const bodySchema = z.object({
            name: z.string().optional(),
            description: z.string().optional(),
            category: z.nativeEnum(ItemCategory).optional(),
            value: z.number().optional(),
            image: z.string().refine(value => isBase64(value), {
                message: 'Invalid base64 format',
            }).optional(),
        }).refine(value => nonemptyObject(value), {
            message: 'At least one is required'
        })

        const result = {
            params: validateId(params),
            body: bodySchema.safeParse(body)
        }

        if (!result.params.success) {
            throw new BadRequestException('Validation error!', result.params.error.issues)
        }

        if (!result.body.success) {
            throw new BadRequestException('Validation error!', result.body.error.issues)
        }
        const { name, description, category, value, image } = result.body.data;
        const itemDTO = new ItemDTO(
            name!,
            description!,
            category!,
            value!,
            0,
            Buffer.from(image!)
        )

        await this.itemUseCase.update(Number(result.params.data.id), itemDTO);
    }

    public async getById(params: unknown): Promise<ItemDTO> {
        const result = validateId(params)
        if (!result.success) {
          throw new BadRequestException('Validation error!', result.error.issues)
        }
    
        const item = await this.itemUseCase.getById(Number(result.data.id))
        return ItemPresenter.EntityToDto(item);
    }

    public async findByParams(query: unknown): Promise<[] | ItemDTO[]> {
        
        const schema = z.object({
            category: z.nativeEnum(ItemCategory).optional()
        })
        const result = schema.safeParse(query)

        if (!result.success) {
          throw new BadRequestException('Validation error!', result.error.issues)
        }
    
        const items: ItemEntity[] = await this.itemUseCase.findByParams(result.data)
        return ItemPresenter.EntitiesToDto(items);
      }
}