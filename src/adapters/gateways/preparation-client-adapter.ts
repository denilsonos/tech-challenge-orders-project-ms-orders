export interface PreparationClientAdapter {
    updateStatus(idOrder: number, status: string): Promise<void>
}