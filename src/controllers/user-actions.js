const dbOperation = require('../util/dbOperation');
const isEmpty = require('../util/utilOperation').isEmpty;

const dbConnection = dbOperation.createConnection();

const retrieveOneUser = (req, res) => {
    const userId = req.params.roleId;

    console.log('userId: ', userId);
};

module.exports = {
    retrieveOneUser
};