const express = require('express');
const poisonRouter = express.Router();
const dbOperation = require('../util/dbOperation');
const isEmpty = require('../util/utilOperation').isEmpty;

const retrieveOnePoison = require('../controllers/poison-actions').retrieveOnePoison;
const retrieveAllPoisons = require('../controllers/poison-actions').retrieveAllPoisons;
const savePoison = require('../controllers/poison-actions').savePoison;
const updatePoison = require('../controllers/poison-actions').updatePoison;
const deletePoison = require('../controllers/poison-actions').deletePoison;


// Rig-up db connection
const dbConnection = dbOperation.createConnection();

//Retrieves all poisons - done
poisonRouter.get('/', async (req, res) => {
    retrieveAllPoisons(req, res);
});

//Retrieves one poison - done
poisonRouter.get('/:barcode', async (req, res) => {
    retrieveOnePoison(req, res);
})

//Writes poison to inventory - done 
poisonRouter.post('/', async (req, res) => {
    savePoison(req, res);
});

//Deletes single poison - done
poisonRouter.delete('/:barcode', async (req, res) => {
    deletePoison(req, res);
});

//Update single poison 
poisonRouter.patch('/:barcode', async (req, res) => {
    updatePoison(req, res);
});

module.exports = poisonRouter;