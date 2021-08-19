const logger = require('../../services/logger.service');
const path = require("path");
const fileUtil = require('../../utils/file-reader-writer');

// let filePath = './data/chat-messages.json';
const  filePath = path.resolve(__dirname, './../../data/chat-messages.json');

module.exports = {
    query,
    // getById,
    // remove,
    add
}

function query(creatorId, roomId) {
    try {
        let chatMessages = fileUtil.readFromFile(filePath);
        chatMessages = chatMessages.filter(item => item.creatorId === creatorId && item.roomId === roomId);
        return chatMessages;
    } catch (err) {
        logger.error('cannot find chatMessages', err);
        throw err;
    }
}

// async function getById(chatMessageId, creatorId) {
//     try {
//         const chatMessages = query(creatorId);
//         const res = chatMessages.find(chatMessage => chatMessage.chatMessageId === chatMessageId);
//         return res ? { ...res } : undefined;
//     } catch (err) {
//         logger.error(`while finding chat-message ${chatMessageId}`, err);
//         throw err;
//     }
// }

// function remove(chatMessageId, creatorId) {
//     try {
//         let chatMessages = query(creatorId);
//         chatMessages = chatMessages.filter(item => item.chatMessageId === chatMessageId);
//         fileUtil.updateFile(filePath, chatMessages);
//     } catch (err) {
//         logger.error(`cannot remove chat-message ${chatMessageId}`, err);
//         throw err;
//     }
// }

function add(chatMessage, creatorId) {
    try {
        const chatMessageToAdd = { ...chatMessage };
        let chatMessages = fileUtil.readFromFile(filePath);
        chatMessages.push(chatMessageToAdd);
        fileUtil.updateFile(filePath, chatMessages);
        return chatMessageToAdd;
    } catch (err) {
        logger.error('cannot insert chat-message', err);
        throw err;
    }
}
