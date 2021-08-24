const express = require('express');
const {log} = require('../../middlewares/logger.middleware');
const roomController = require('./room.controller');
const router = express.Router();

router.get('/', log, roomController.getRooms);

module.exports = router;