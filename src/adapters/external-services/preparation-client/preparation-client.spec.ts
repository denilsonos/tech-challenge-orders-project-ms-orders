

import { PreparationClient } from "./preparation-client";
import nock from "nock";

describe('OrderClient', () => {

    let preparationClient: PreparationClient;
    
    beforeAll(() => {
        process.env.PREPARATION_MS_HOST = "http://localhost"
        preparationClient = new PreparationClient();
    });

    beforeEach(() => {
        jest.clearAllMocks();
        
    });

    describe('Create Preparation', () => {
       it('should create preparation with success', async () => {
            const url = process.env.PREPARATION_MS_HOST as string;
            nock(url).post('/ms-preparation/api/v1/orders').reply(201)

            await preparationClient.createOrderPreparation(1, 'status')     
        });
    });
})