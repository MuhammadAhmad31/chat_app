const express = require("express");
const router = express.Router();
import { Request, Response } from "express";
import { getChat } from "../controllers/chat";

router.get('/', getChat);

module.exports = router;