const mongoose = require('mongoose');

const errorProcessor = require('./errorProcessor');


const createConnection = async () => {
    try {
        const dbConnection = await mongoose.connect('mongodb://127.0.0.1/phms');
        console.log("Connection to Mongodb established");
        return dbConnection;
    } catch(e) {
        console.log("Connection to MongoDB failed:", e);
    }
};

const clearDbAndEndConnection = async () => {
    mongoose.connection.close();
}; 

const retrieveItemFromStore = async (Model, key, id) => {
    try {
        console.log("About to query the database");
        const poison = await Model.findOne({[key]: id});
        return poison;
    } catch(err) {
        console.log('Retrieving poison failed: ', err); // for use by server admin
    }
};

const retrieveItemsFromStore = async (Model) => {
    try {
        console.log("About to query the database");
        const poisons = await Model.find();
        //console.log('Poisons: ', poisons);
        return poisons;
    } catch(err) {
        console.log('Retrieving poisons from inventory failed: ', err); // for use by server admin
    }
};
           
const saveToStore = async (Model, item, itemCategory = 'poison') => { //category: poison or patient - each must be processed differently
    //1. only insert fresh document (applies only to poison) if similar does not exist in the collection 
    //2. Only update (residaul qty if such document pre-exist
    //3. I think front-end must send background query to confirm if the entered brand and generic name of a given poison already exist in the db;
    //   if it does existm then upon submitting the form, the front-end must send http Patch request and not POST.
    //   Front-end should onlly send HTTP POST request if no such poison pre-exist in the db; 
    //   I don't if the performance hit from this design is too negative
    //4. expiryDate should be entered by user and converted to ISODate on backend
    //5. use morgan for loggin
    const itemInstance = new Model(item);

    try {
        return await itemInstance.save();
    } catch(err) {        
        // check for duplicate entry
        if (err.code === 11000) {
            console.log('duplicate entry error'); // for use by server admin
            throw new Error('Error Occurred', {cause: {status: 'failed',  code: 'de', details: 'duplicate entry, poison not saved'}}); 
        } else {
            console.log('missing field error'); // for use by server admin

            //check if value for any "required" field is missing 
            if (itemCategory === 'poison') {
                const missingProperty = await errorProcessor.getMissingPoisonProperty(err);
                if (missingProperty != 'none')
                    throw new Error('Error Occurred', {cause: {status: 'failed', code: missingProperty, details: "the field '" + missingProperty + "' is missing"}});
            } else if (itemCategory === 'patient') {
                //....
            } else if(itemCategory === 'user') {
                //...
            } else {
                // saving to db failed (sf) for other reasons
                throw new Error({status: 'failed', code: 'sf', cause: 'item not saved due to unknown error!'}); 
            }      
        } 
    }
};            

const deleteFromStore = async (Model, key, id) => {
    try {
        const deletedPoison = await Model.deleteOne({[key]: id});
        return deletedPoison;
    } catch(err) {
        console.log('Deletion failed', err);  // for use by server admin
        //throw err;  
    }
};

const updateStore = async (Model, key, id, updateData) => {
    try {
        await Model.updateOne({[key]: id}, {...updateData});
    } catch(err) {
        console.log('Update failed', err);
        //throw err;
    }
};

module.exports = {
    createConnection,
    retrieveItemFromStore,
    retrieveItemsFromStore,
    saveToStore,
    deleteFromStore,
    updateStore,
};