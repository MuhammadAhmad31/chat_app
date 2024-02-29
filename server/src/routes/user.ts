import { LoginController, RegisterController, getAllUsersController, getUserByIdController } from "../controllers/user";

const express = require("express");
const router = express.Router();



router.post('/register', RegisterController);
router.post('/login', LoginController);
router.get('/user/:id', getUserByIdController);
router.get('/users', getAllUsersController);

module.exports = router;