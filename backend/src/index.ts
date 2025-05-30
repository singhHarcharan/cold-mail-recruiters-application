import 'dotenv/config';
const express = require('express');
const cors = require('cors');
import { Request, Response } from 'express';
import { helper } from './util/helper';

const app = express();
app.use(cors({
    origin: '*'  
}));
app.use(express.json());

app.post('/sendEmail', async (req: Request, res: Response) => {
    const { fullName, email, companyName } = req.body;
    const response: {success: boolean, message: string} = await helper.main(fullName, email, companyName);
    console.log("response before sending to frontend is", response, "---");
    return res.send(response);
});

app.listen(8000, () => {
    console.log(`Backend server running on http://localhost:8000`);
});














