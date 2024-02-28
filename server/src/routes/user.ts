const express = require("express");
const router = express.Router();
import { Login, Register, getAllUsers, getUserById } from "../controllers/user";


router.post('/register', Register);
router.post('/login', Login);
router.get('/user/:id', getUserById);
router.get('/users', getAllUsers);

module.exports = router;