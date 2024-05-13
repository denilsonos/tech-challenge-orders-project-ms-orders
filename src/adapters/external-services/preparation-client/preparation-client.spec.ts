

import { PreparationClient } from "./preparation-client";
import nock from "nock";

describe('OrderClient', () => {

    let preparationClient: PreparationClient;
    
    beforeAll(() => {
        process.env.PREPARATION_MS_HOST = "http://localhost/test"
        preparationClient = new PreparationClient();
    });

    beforeEach(() => {
        jest.clearAllMocks();
        
    });

    describe('updateStatus', () => {
       it('should update status with success', async () => {
            const url = process.env.PREPARATION_MS_HOST as string;
            nock(url).post('/orders/1').reply(200)

            await preparationClient.updateStatus(1, 'status')     
        });
    });
})