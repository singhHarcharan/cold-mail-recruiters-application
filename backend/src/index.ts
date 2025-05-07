import 'dotenv/config';
const express = require('express');
const cors = require('cors');
import { Request, Response } from 'express';
import { helper } from './util/helper';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/testingApi', (req: Request, res: Response) => {
    console.log("Entered into backend router");
    return res.status(200).json({
        message: "Email request received",
    });
});

app.get('/test', async (req: Request, res: Response) => {
    await helper.main();
});

app.listen(5000, () => {
    console.log(`Backend server running on http://localhost:5000`);
});