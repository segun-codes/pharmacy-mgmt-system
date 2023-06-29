const mongoose = require("mongoose");


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const poisonSchema = new Schema({
	generic_name: String,  
	type: String,  
	qty: { type: Number, min: 1}, // this should be removed as it should not be part of collection schema; only user will enter this value on a form 
	residualQty: { type: Number, min: 1}, // this will be computed on backend and not user-facing; User will only supply qty: { type: Number, min: 1} ,               		
	rate: { 
		unit_price:mongoose.Decimal128,               
		uom: String                                      
	},
	brand: String, 			 
	active_ingredient: {type: Array, default: []},
	country_of_manufacture: String,
	expiryDate: { type: Date },
    entryDate: { type: Date, default: Date.now }, 
	minReorderQty: Number
});

const PoisonModel = mongoose.model('Poisons', poisonSchema); // "Poisons" is name of collection


module.exports = PoisonModel;
// Ref: https://mongoosejs.com/docs/guide.html
// Ref: https://www.npmjs.com/package/mongoose