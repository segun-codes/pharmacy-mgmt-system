var express = require('express');
var router = express.Router();

/* GET users listing. */
// Should return admin, pharmarcist, stockist, Other
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
