const logger = require('../../services/logger.service');
const path = require("path");
const fileUtil = require('../../utils/file-reader-writer');

const  filePath = path.resolve(__dirname, './../../data/rooms.json');

module.exports = {
    query,
}

function query(creatorId, roomId) {
    try {
        let rooms = fileUtil.readFromFile(filePath);
        return rooms;
    } catch (err) {
        logger.error('cannot find rooms in files', err);
        throw err;
    }
}

