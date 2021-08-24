const chatMessageService = require('./chat-message.service');
const logger = require('../../services/logger.service');


function getChatMessages(req, res) {
    try {
        const creatorId = req.session.user?.id;
        const roomId = req.params.roomId;
        const chatMessages = chatMessageService.query(creatorId, roomId);
        res.send(chatMessages);
    } catch (err) {
        logger.error('Cannot get chatMessages', err);
        res.status(500).send({ err: 'Failed to get chatMessages', msg: err  });
    }
}

async function addChatMessage(req, res) {
    try {
        const creatorId = req.session.user?.id;
        var chatMessage = req.body;
        chatMessage.chatMessageId = chatMessage.chatMessageId ? chatMessage.chatMessageId : Date.now().toString();
        chatMessage.creatorId = req.session.user?.id;
        chatMessage = chatMessageService.add(chatMessage, creatorId);
        res.send({chatMessage});
    } catch (err) {
        logger.error('Failed to add chatMessage', err);
        res.status(500).send({ err: 'Failed to add chatMessage', msg: err  });
    }
}

// function updateChatMessage(req, res) {//update
//     try {
//         const creatorId = req.session.user?.id;
//         // const { id, description, tags, imgUrl } = req.body
//         // const chatMessage = { id, description, tags, imgUrl }
//         const chatMessage = req.body;

//         savedChatMessage = chatMessageService.update(chatMessage, creatorId);
//         res.send(savedChatMessage);
//     } catch (err) {
//         logger.error('Failed to update chatMessage', err);
//         res.status(500).send({ err: 'Failed to update chatMessage' });
//     }
// }


// function deleteChatMessage(req, res) {
//     try {
//         const creatorId = req.session.user?.id;
//         const chatMessageId = req.params.chatMessageId;
//         chatMessageService.remove(chatMessageId, creatorId);
//         res.send({ msg: 'Deleted successfully' });
//         // }
//     } catch (err) {
//         logger.error('Failed to delete chatMessage', err);
//         res.status(500).send({ err: 'Failed to delete chatMessage' });
//     }
// }


module.exports = {
    getChatMessages,
    // getChatMessage,
    // updateChatMessage,
    addChatMessage,
    // deleteChatMessage,
}