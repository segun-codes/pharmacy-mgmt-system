const express = require('express');
const mainRouter = express.Router();

// Home Page
mainRouter.get('/', (req, res) => {
  res.send({ 
    title: 'Welcome to Darapem Pharmacy Backend', 
    Description: 'Provides API backend support for Darapem Pharmacy and Stores',
  });
});

// Info for Developers
mainRouter.get('/info', (req, res) => {
  res.send([
    {
      task: 'retrieve list of all drugs',
      endpoint: '[hostname]/drugs',
      returnFormat: '[{name: ..., expiryDate: ...}, {..}, {..}]'
    },
    {
      task: 'retrieve a specific',
      endpoint: '[hostname]/drugs',
      returnFormat: '{name: ..., expiryDate: ...}'
    }
  ]);
});

module.exports = mainRouter;
