"use strict";
// # Compile TypeScript
// npx tsc
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// # Run the compiled JavaScript
// node dist/index.js
require("dotenv/config");
const express = require('express');
const cors = require('cors');
const helper_1 = require("./util/helper");
const emailContent_1 = require("./context/emailContent");
const app = express();
app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.post('/sendEmail', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, email, companyName } = req.body;
    const response = yield helper_1.helper.main(fullName, email, companyName);
    console.log("response before sending to frontend is", response, "---");
    return res.send(response);
}));
// Get email template
app.get('/api/email-template', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const template = yield emailContent_1.emailContent.getEmailContentDynamic();
        res.json(template);
    }
    catch (error) {
        console.error('Error getting email template:', error);
        res.status(500).json({ success: false, message: 'Failed to get email template' });
    }
}));
// Save email template
app.post('/api/email-template', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { subject, html, text } = req.body;
        if (!subject || !html || !text) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }
        yield emailContent_1.emailContent.saveEmailContentDynamic({ subject, html, text });
        res.json({ success: true, message: 'Template saved successfully' });
    }
    catch (error) {
        console.error('Error saving email template:', error);
        res.status(500).json({ success: false, message: 'Failed to save email template' });
    }
}));
app.listen(8000, () => {
    console.log(`Backend server running on http://localhost:8000`);
});
