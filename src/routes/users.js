var express = require('express');
const { retrieveOneUser } = require('../controllers/user-actions');


var userRouter = express.Router();


userRouter.get('/:roleId', function(req, res) {
  retrieveOneUser(req, res);
});

userRouter.get('/', function(req, res) {
  retrieveAllUsers(req, res);
});

userRouter.post('/', async (req, res) => {
  createUser(req, res);
});

module.exports = userRouter;
