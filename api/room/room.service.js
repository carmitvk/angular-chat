const logger = require('../../services/logger.service');
const service = require('./room.by-file.service')

module.exports = {
    query,
}

function query() {
    try {
        return service.query();
    } catch (err) {
        logger.error('cannot find rooms!!!', err);
        throw err;
    }
}
