import { createMessageController, getAllMessagesController } from "../controllers/message";

const express = require("express");
const router = express.Router();


router.post('/messages', createMessageController);
router.get('/messages/:chatId', getAllMessagesController);

module.exports = router;
