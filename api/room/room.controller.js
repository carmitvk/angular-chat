const roomService = require('./room.service');
const logger = require('../../services/logger.service');

async function getRooms(req, res) {
    try {
        const rooms = await roomService.query();
        res.send(rooms);
    } catch (err) {
        logger.error('Failed to get rooms', err);
        res.status(500).send({ err: 'Failed to get rooms', msg: err  });
    }
}

module.exports = {
    getRooms,
}