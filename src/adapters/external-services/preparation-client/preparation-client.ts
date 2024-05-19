
import axios from "axios";
import { PreparationClientAdapter } from "../../gateways/preparation-client-adapter";
import { OrderStatus } from "../../../core/entities/enums/order-status";

export class PreparationClient implements PreparationClientAdapter {
  constructor() { }
  async createOrderPreparation(orderId: number, status: string): Promise<void> {
    console.log("status:"+status)
    const basePath = process.env.PREPARATION_MS_HOST;
    await axios.post(`${basePath}/ms-preparation/api/v1/orders`, {
       data: { 
         idOrder: Number(orderId),
         status: String(OrderStatus.Created),
         createdAt: new Date()} 
      })
      .then(response => console.log("response status:" + response))
      .catch(error => console.log("error status:" + error));
  }
}