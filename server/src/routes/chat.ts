import express from 'express';
import { createChatController, findChatController, getUserChatController } from '../controllers/chat';

const router = express.Router();

router.post('/chats', createChatController);
router.get('/chats/:userId', getUserChatController);
router.get('/chats/:member1/:member2', findChatController);

module.exports = router;
