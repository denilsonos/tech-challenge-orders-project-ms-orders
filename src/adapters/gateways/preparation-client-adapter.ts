export interface PreparationClientAdapter {
    createOrderPreparation(idOrder: number, status: string): Promise<void>
}