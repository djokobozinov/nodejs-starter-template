const express = require('express');
var router = express.Router();

router.use('/authentication', require('./authentication'));

module.exports = router;
