const express = require('express');
const poisonRouter = express.Router();
const dbOperation = require('../util/dbOperation');
const isEmpty = require('../util/utilOperation').isEmpty;

// Rig-up db connection
const dbConnection = dbOperation.createConnection();

/**
 * Return all poisons 
 */
poisonRouter.get('/', async (req, res) => {
    const poisons = await dbOperation.retrieveItemsFromInventory();    
    // res.send({details: "Retrieved list of all poisons from inventory..."});
    res.send(poisons);
});

// return specific poisons 
poisonRouter.get('/:barcode', async (req, res) => {
    const poisonBarcode = req.params.barcode;
    const poison = await dbOperation.retrieveItemFromInventory(poisonBarcode);
    // console.log('Poison retrieved: ', poison);
    if (!isEmpty(poison)) {
        res.send({ status: 'success', details: poison });
    } else {
        res.send({status: "Failed", details: `Poison with barcode ${poisonBarcode} unavailable in inventory.`});
    }
});


/**  
 * Writes poison to inventory
 */ 
poisonRouter.post('/', async (req, res) => {
    const itemData = req.body; // itemData: poisonData/patientData

    itemData.expiryDate = new Date(itemData.expiryDate);

    dbOperation.saveToInventory(itemData);
    res.send({details: `Posted poison to inventory...`});
});


/**
 * Remove single poison
 */
poisonRouter.delete('/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);

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