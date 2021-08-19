const express = require('express');
const {apiInfo} = require('./general.controller');
const router = express.Router();

router.get('/info', apiInfo);

module.exports = router;
