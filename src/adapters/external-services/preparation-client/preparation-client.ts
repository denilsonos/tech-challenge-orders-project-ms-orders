
import axios from "axios";
import { PreparationClientAdapter } from "../../gateways/preparation-client-adapter";

export class PreparationClient implements PreparationClientAdapter {
  constructor() { }
  async createOrderPreparation(orderId: number, status: string): Promise<void> {

    const basePath = process.env.PREPARATION_MS_HOST;
    await axios.post(`${basePath}/ms-orders/api/v1/orders`, {
       data: JSON.stringify({ idOrder: orderId,
         status: status,
         createdAt: new Date()}) 
      })
      .then(response => `Status Code - ${response.status}`)
      .catch(error => `Error Code - ${error.status}`);
  }
}