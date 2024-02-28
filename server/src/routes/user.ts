const express = require("express");
const router = express.Router();
import { Request, Response } from "express";
import { Register } from "../controllers/user";


router.post('/register', Register);

module.exports = router;