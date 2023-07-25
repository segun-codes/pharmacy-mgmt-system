const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    role: String, // ph, asst   ph - pharmacist, asst - pharmacy assistant
    roleId: String,
    dateCreated: { type: Date, default: Date.now }
});

const UserModel = mongoose.model('Blog', userSchema);


module.exports = UserModel;

