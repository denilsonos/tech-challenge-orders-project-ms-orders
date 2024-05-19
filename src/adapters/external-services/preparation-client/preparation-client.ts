
import axios from "axios";
import { PreparationClientAdapter } from "../../gateways/preparation-client-adapter";
import { OrderStatus } from "../../../core/entities/enums/order-status";

export class PreparationClient implements PreparationClientAdapter {
  constructor() { }
  async createOrderPreparation(orderId: number, status: string): Promise<void> {
    const basePath = process.env.PREPARATION_MS_HOST;
    await axios.post(`${basePath}/ms-preparation/api/v1/orders`, {
         idOrder: Number(orderId),
         status: String(OrderStatus.Created),
         createdAt: new Date()
      })
      .then(response => `Status Code - ${response.status}`)
      .catch(error => `Error Code - ${error.status}`);
  }
}