
import axios from "axios";
import { PreparationClientAdapter } from "../../gateways/preparation-client-adapter";

export class PreparationClient implements PreparationClientAdapter {
  constructor() {}
  async updateStatus(orderId: number, status: string): Promise<void> {

    const basePath = process.env.PREPARATION_MS_HOST;
    await axios.post(`${basePath}/orders/${orderId}`, { data: JSON.stringify({ idOrder: orderId, status })})
      .then(response => `Status Code - ${response.status}`)
      .catch(error => `Error Code - ${error.status}`);
  }
}