
import axios from "axios";
import { PreparationClientAdapter } from "../../gateways/preparation-client-adapter";

export class PreparationClient implements PreparationClientAdapter {
  constructor() { }
  async createOrderPreparation(orderId: number, status: string): Promise<void> {

    const basePath = process.env.PREPARATION_MS_HOST;
    await axios.post(`${basePath}/ms-preparation/api/v1/orders`, {
       data: JSON.stringify({ 
         idOrder: orderId,
         status: status,
         createdAt: new Date()}) 
      })
      .then(response => console.log("response status:" + response))
      .catch(error => console.log("error status:" + error));
  }
}