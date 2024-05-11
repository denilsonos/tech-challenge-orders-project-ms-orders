export interface QueueServiceAdapter {
    toqueue(order: any): Promise<void>
    dequeue(order: any): Promise<void>
}