"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.get('/testingApi', (req, res) => {
    console.log("Entered into backend router");
    return res.status(200).json({
        message: "Email request received",
    });
});
app.listen(5000, () => {
    console.log(`Backend server running on http://localhost:5000`);
});
