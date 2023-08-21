const mongoose = require('mongoose');
const supertest = require('supertest');

const Poison = require('../model/poisonSchema');
const rigupServer = require('../helper/server');


describe('poisons endpoint test suite\n\n', () => {
    let conn;
    let db;
    const testPoisonData = {
        barcode: 100001,
        generic_name: 'Paracetamol',  
        type: 'Solid',
        qty: 1,  
        residualQty: 12,             		
        rate: { 
            unit_price: 115.16,                                                                                                             
            uom: 'card'                                      
        },
        brand: 'Emzor', 			 
        active_ingredient: [   		 
            { ingredient: 'Trylin', weight: 110.11 },  
            { ingredient: 'Bisnin', weight: 210.11 }, 
            { ingredient: 'Mesopotamin', weight: 10.34 }
        ],
        country_of_manufacture: 'Promasidor',
        expiryDate: '2025-12-12',
        minReorderQty: 10
    };

    const testPoisonData2 = {
        barcode: 100002,
        generic_name: 'Alabukun',  
        type: 'Liqud',
        qty: 10,  
        residualQty: 4,             		
        rate: { 
            unit_price: 115.16,                                                                                                             
            uom: 'card'                                      
        },
        brand: 'Emzor', 			 
        active_ingredient: [   		 
            { ingredient: 'Trylin', weight: 110.11 },  
            { ingredient: 'Bisnin', weight: 210.11 }, 
            { ingredient: 'Mesopotamin', weight: 10.34 }
        ],
        country_of_manufacture: 'Doyin',
        expiryDate: '2025-12-12',
        minReorderQty: 10
    };
    
    const app = rigupServer();

    // Setup
    beforeEach(async () => {
        conn = await mongoose.connect('mongodb://127.0.0.1/phms');
    });

    // Teardown
    afterEach(async () => {
        await conn.connection.db.dropDatabase();
        await mongoose.connection.close();
    });

    //1. Uses GET to test endpoint /api/poisons/:id
    it('GET /api/poisons/:id', async () => {
        const poison = await Poison.create(testPoisonData);

        await supertest(app)
            .get('/api/poisons/' + poison.barcode)
            .expect(200)
            .then((res) => {
                expect(res.body.poison.barcode).toEqual(poison.barcode);
                expect(res.body.poison.generic_name).toEqual(poison.generic_name);
                expect(res.body.poison.residualQty).toEqual(poison.residualQty);
            });
    });

    //2. Uses POST to test endpoint /api/poisons/
    it('POST /api/poisons/', async() => {
        await supertest(app)
            .post('/api/poisons/')
            .send(testPoisonData)
            .expect(201)
            .then(async (res) => {
                //check response
                expect(res.body.status).toEqual('success');

                //check data is in database
                const savedPoison = await Poison.findOne({barcode: 100001});
                expect(savedPoison.barcode).toEqual(testPoisonData.barcode);
                expect(savedPoison.generic_name).toEqual(testPoisonData.generic_name);
                expect(savedPoison.residualQty).toEqual(testPoisonData.residualQty);
            });
    });

    //3. Uses DELETE to test endpoint /api/poisons/:id
    it('DELETE /api/poisons/:id', async() => {
        const poison = await Poison.create(testPoisonData);

        await supertest(app)
            .delete('/api/poisons/' + poison.barcode)
            .expect(200)
            .then(async (res) => {
                //check response
                expect(res.body.status).toEqual('success');

                //check data is in database
                const deletedPoison = await Poison.findOne({barcode: 100001});
                expect(deletedPoison).toBeNull();
            });
    });

    //4. Uses PATCH to test endpoint /api/poisons/:id
    it('PATCH /api/poisons/:id', async() => {
        const poison = await Poison.create(testPoisonData);
        const poisonUpdateData = {
            generic_name: 'Instagram',
            brand: 'DarapemPharma'
        }
        
        await supertest(app)
            .patch('/api/poisons/' + testPoisonData.barcode)
            .send(poisonUpdateData)
            .expect(201)
            .then(async (res) => {
                //check response
                expect(res.body.status).toEqual('success');

                //check data is in database
                const updatedPoison = await Poison.findOne({barcode: 100001});
                expect(updatedPoison.generic_name).toEqual(poisonUpdateData.generic_name);
                expect(updatedPoison.brand).toEqual(poisonUpdateData.brand);
            });
    });

    //5. Uses GET to test endpoint /api/poisons/
    it('GET /api/poisons/', async() => {
        const poison1 = await Poison.create(testPoisonData);
        const poison2 = await Poison.create(testPoisonData2);

        await supertest(app)
            .get('/api/poisons/')
            .expect(200)
            .then((res) => {
                //console.log('res.body', res.body);
                expect(res.body.length).toEqual(2);
            })
    });
});
