const express = require('express');
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware');
const {log} = require('../../middlewares/logger.middleware');
const chatMessageController = require('./chat-message.controller');
const router = express.Router();

// middleware that is specific to this router
router.use(requireAuth)

router.get('/:roomId', log, chatMessageController.getChatMessages);
// router.post('/',  requireAuth, requireAdmin, addChatMessage);
router.post('/', log,  chatMessageController.addChatMessage);
// router.post('/', requireAuth, addChatMessage);
// router.put('/:chatMessageId', updateChatMessage);

// router.delete('/:chatMessageId',  requireAuth, requireAdmin, deleteChatMessage);
// router.delete('/:chatMessageId', deleteChatMessage);

module.exports = router;