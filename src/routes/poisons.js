const express = require('express');
const poisonRouter = express.Router();
const dbOperation = require('../util/dbOperation');


/**
 * Return all poisons 
 */
poisonRouter.get('/', (req, res) => {
    res.send({details: "Retrieved list of all poisons from inventory..."});
});

// return specific poisons 
poisonRouter.get('/:id', (req, res) => {
    const id = req.params.id;

    res.send({details: `Retrieved details of poison with id ${id} from inventory...`});
});


/**  
 * Writes poison to inventory
 */ 
poisonRouter.post('/', async (req, res) => {
    const itemData = req.body; // itemData: poisonData/patientData

    const dbConnection = dbOperation.createConnection();
    dbOperation.saveToInventory(itemData);
    
    res.send({details: `Posted details of bulk list of poisons to inventory...`});
});


/**
 * Remove single poison
 */
poisonRouter.delete('/:id', (req, res) => {
    const id = req.params.id;
    res.send({details: `Deleted posion with id ${id} from inventory...`});
});


/**
 * Update single poison 
 */
poisonRouter.patch('/:id', (req, res) => {
    const id = req.params.id;
    res.send({details: `Updated posion with id ${id} in inventory...`});
});

module.exports = poisonRouter;