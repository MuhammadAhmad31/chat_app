const express = require("express");
import { Request, Response } from "express";

const app = express();
const cors = require('cors');
require("dotenv").config();

const port = process.env.PORT || 4000;

app.use(cors());

app.use(express.json());

app.use(cors({
  origin: "*",
  credentials: true,
}));

app.use((req: Request, res: Response, err: any) => {
    res.status(500).json({
      message: err.message,
    });
  });


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
