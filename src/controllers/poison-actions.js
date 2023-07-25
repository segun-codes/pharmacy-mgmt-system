const dbOperation = require('../util/dbOperation');
const PoisonModel = require('../model/poisonSchema');

const isEmpty = require('../util/utilOperation').isEmpty;

const dbConnection = dbOperation.createConnection();

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Note:
 *  IPNI - Indicated Poison Not in Inventory
 *  NPI - No Poison in Inventory
 */

const key = 'barcode'; 

//1.
const retrieveOnePoison = async (req, res) => {
    const poisonBarcode = +req.params.barcode;

    const poison = await dbOperation.retrieveItemFromStore(PoisonModel, key, poisonBarcode);

    if (!isEmpty(poison)) {
        res.send({ status: 'success', poison });
    } else {
        res.send({status: "failed-IPNI", details: `Poison with barcode ${poisonBarcode} unavailable in inventory.`});
    }
}; 

//2. 
const retrieveAllPoisons = async (req, res) => {
    const poisons = await dbOperation.retrieveItemsFromStore(PoisonModel);

    if (isEmpty(poisons)) {
        res.send({status: 'failed-NPI', details: 'No poison in inventory'}); 
    }
    res.send(poisons);
};


//3. 
const savePoison = (req, res) => {
    const itemData = req.body; // itemData: poisonData/patientData

    itemData.expiryDate = new Date(itemData.expiryDate);

    try {
        dbOperation.saveToStore(PoisonModel, itemData);
        res.send({status: 'success', details: 'Poison posted to inventory'});
    } catch(err) {
        res.status(500).send({status: 'failed', details: "Poison retrieval failed unexpectedly"});
    }
};

//4.
const updatePoison = async (req, res) => {
    const poisonBarcode = +req.params.barcode;
    const updatedPoison = req.body;

    try {
        await dbOperation.updateStore(PoisonModel, key, poisonBarcode, updatedPoison);
        res.status(200).send({status: 'success', details: 'In progress'});
    } catch(err) {
        res.status(500).send({status: 'wip', details: 'In progress'});
    }
};

//5.
const deletePoison = async (req, res) => {
    const poisonBarcode = +req.params.barcode;

    try {
        const poison = await dbOperation.deleteFromStore(PoisonModel, key, poisonBarcode);
        
        if (!poison.deletedCount) {
            return res.send({status: 'failed-IPNI', details: "No such poison to delete"});     
        } 
        return res.send({status: 'success', details: "Poison Deleted"}); 
    } catch(err) {
        res.status(500).json({status: 'failed', details: "Poison Deletion failed"});
    }
};

module.exports = { 
    retrieveOnePoison,
    retrieveAllPoisons,
    savePoison,
    updatePoison,
    deletePoison, 
};