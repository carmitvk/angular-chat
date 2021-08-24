const logger = require('../../services/logger.service');
const service = require('./chat-message.by-file.service')

module.exports = {
    query,
    add,
    // getById,
    // remove,
    // update
}

function query(creatorId, roomId) {
    try {
        return service.query(creatorId, roomId);
    } catch (err) {
        logger.error('cannot find chat messages', err);
        throw err;
    }
}

// function getById(chatMessageId, creatorId) {
//     try {
//         return service.getById(chatMessageId, creatorId);
//     } catch (err) {
//         logger.error(`while finding chat-message ${chatMessageId}`, err);
//         throw err;
//     }
// }

// async function remove(chatMessageId, creatorId) {
//     try {
//         return service.remove(chatMessageId, creatorId);
//     } catch (err) {
//         logger.error(`cannot remove chat-message ${chatMessageId}`, err);
//         throw err;
//     }
// }

// async function update(chatMessage) {
//     try {
//         return service.update(chatMessage);
//     } catch (err) {
//         logger.error(`cannot update chat-message ${chatMessage.chatMessageId}`, err);
//         throw err;
//     }
// }

function add(chatMessage, creatorId) {
    try {
        return service.add(chatMessage,creatorId);
    } catch (err) {
        logger.error('cannot insert chat message', err);
        throw err;
    }
}
