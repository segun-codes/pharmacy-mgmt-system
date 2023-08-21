const dbOperation = require('../util/dbOperation');
const PoisonModel = require('../model/poisonSchema');

const isEmpty = require('../util/utilOperation').isEmpty;

const dbConnection = dbOperation.createConnection();

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */

const key = 'barcode'; 

//1.
const retrieveOnePoison = async (req, res) => {
    if (isNaN(req.params.barcode)) {
        console.log('Not a number');
        res.status(404).send({status: 'failed', code: 'iurl', details: 'unknown url'});
        return;
    }

    const poisonBarcode = +req.params.barcode;
    const poison = await dbOperation.retrieveItemFromStore(PoisonModel, key, poisonBarcode);

    if (!isEmpty(poison)) {
        res.status(200).send({status: 'success', poison });
    } else {
        console.log('2. Test control got here...');
        res.status(404).send({status: 'failed', code: 'ipni', details: `poison with barcode ${poisonBarcode} not in inventory.`});
    }
}; 

//2. 
const retrieveAllPoisons = async (req, res) => {
    const poisons = await dbOperation.retrieveItemsFromStore(PoisonModel);

    if (isEmpty(poisons)) {
        res.status(404).send({status: 'failed', code: 'npi', details: 'no poison in inventory'}); 
    }
    res.status(200).send(poisons);
};

//3. 
const savePoison = async (req, res) => {
    const itemData = req.body;
    itemData.expiryDate = new Date(itemData.expiryDate);

    try {
        await dbOperation.saveToStore(PoisonModel, itemData); // may use the returned object later
        res.status(201).send({status: 'success', details: 'poison posted to inventory'});
    } catch(err) {
        res.status(400).send(err.cause);
    }
};

//4.
const updatePoison = async (req, res) => {
    const poisonBarcode = +req.params.barcode;
    const updatedPoison = req.body;

    try {
        await dbOperation.updateStore(PoisonModel, key, poisonBarcode, updatedPoison);
        res.status(201).send({status: 'success', details: 'inventory upated'});
    } catch(err) {
        res.status(400).send({status: 'failed', code: 'ipf', details: 'inventory update failed'});
    }
};

//5.
const deletePoison = async (req, res) => {
    const poisonBarcode = +req.params.barcode;

    try {
        const poison = await dbOperation.deleteFromStore(PoisonModel, key, poisonBarcode);
        
        if (!poison.deletedCount) {
            return res.status(400).send({status: 'failed', code: 'ipni', cause: "no such poison to delete"});     
        } 
        return res.status(200).send({status: 'success', details: 'poison deleted'}); 
    } catch(err) {
        res.status(400).json(err.message);
    }
};

module.exports = { 
    retrieveOnePoison,
    retrieveAllPoisons,
    savePoison,
    updatePoison,
    deletePoison, 
};