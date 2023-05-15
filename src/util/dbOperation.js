const mongoose = require('mongoose');
const PoisonModel = require('../model/poisonSchema');


const createConnection = async () => {
    try {
        const dbConnection = await mongoose.connect('mongodb://127.0.0.1/phms');
        console.log("Connection Mongodb established");
        return dbConnection;
    } catch(e) {
        console.log("Connection to MongoDB failed:", e);
    }
};

const retrieveItemFromInventory = () => {

};

const retrieveItemsFromInventory = () => {

};

const saveToInventory = async (item, itemCategory = 'poison') => { //cateory: poison or patient - each must be processed differently
    //1. only insert fresh document (applies only to poison) if similar does not exist in the collection 
    //2. Only update (residaul qty if such document pre-exist
    //3. I think front-end must send background query to confirm if the entered brand and generic name of a given poison already exist in the db;
    //   if it does existm then upon submitting the form, the front-end must send http Patch request and not POST.
    //   Front-end should onlly send HTTP POST request if no such poison pre-exist in the db; 
    //   I don't if the performance hit from this design is too negative
    //4. expiryDate should be entered by user and converted to ISODate on backend
    //5. use morgan for loggin

    const poisonInstance = new PoisonModel(item);
    console.log(poisonInstance.name);
    try {
        await poisonInstance.save();
        console.log(`New ${itemCategory} saved to MongoDb`);
    } catch(err) {
        console.log('Saving to db failed: ', err);
    }
};            

const deleteFromInventory = () => {

};

module.exports = {
    createConnection,
    retrieveItemFromInventory,
    retrieveItemsFromInventory,
    saveToInventory,
    deleteFromInventory
};