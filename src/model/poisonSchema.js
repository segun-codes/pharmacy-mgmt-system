const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const poisonSchema = new Schema({
	barcode: { type: Number, required: true },
	generic_name: { type: String, required: true },  
	type: { type: String, required: true },  
	qty: { type: Number, min: 1, required: true }, // this should be removed as it should not be part of collection schema; only user will enter this value on a form 
	residualQty: { type: Number, min: 1, required: true }, // this will be computed on backend and not user-facing; User will only supply qty: { type: Number, min: 1} ,               		
	rate: { 
		unit_price: mongoose.Decimal128,               
		uom: { type: String, required: true }                                      
	},
	brand: { type: String, required: true }, 			 
	active_ingredient: [{ ingredient: String, weight: mongoose.Decimal128 }],
	country_of_manufacture: { type: String, required: true }, 
	expiryDate: { type: Date, required: true },
    entryDate: { type: Date, default: Date.now }, 
	minReorderQty: { type: Number, required: true }
});

const PoisonModel = mongoose.model('Poisons', poisonSchema); // "Poisons" is name of collection

module.exports = PoisonModel;
