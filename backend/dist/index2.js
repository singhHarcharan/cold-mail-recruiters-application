"use strict";
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
require("dotenv/config");
const express = require('express');
const cors = require('cors');
const mailSender_1 = require("./services/mailSender");
const app = express();
app.use(cors());
app.use(express.json());
// app.options('/api/v1/send-email', cors()); // Enable pre-flight requests for all routes
app.get('/api', (req, res) => {
    console.log("Entered into backend router");
    return res.status(200).json({
        message: "Email request received",
    });
});
app.get('/test', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield main();
}));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
function getBodydata() {
    const names = ['Armaan', 'Harcharanpreet Singh', 'Gurcharan Singh'];
    const emails = ['armaanaurapvt@gmail.com', 'harcharansingh198400@gmail.com', 'gurcharansinghkhalsa262@gmail.com'];
    const companies = ['Microsoft', 'Amdocs', 'Google'];
    const jobProfiles = ['HR', 'Engineer', 'Analyst'];
    return { names, emails, companies, jobProfiles };
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mailSender = new mailSender_1.MailSender();
            const recruiters = getBodydata();
            const emailContent = {
                subject: 'Job Application for Software Engineer Role',
                text: 'Dear Recruiter,\n\nI am excited to apply for opportunities at your company. Please find my resume attached.\n\nBest regards,\nHarcharan Singh',
                html: '<p>Dear Recruiter,</p><p>I am excited to apply for opportunities at your company. Please find my resume attached.</p><p>Best regards,<br>Harcharan Singh</p>'
            };
            yield mailSender.sendEmails(recruiters, emailContent);
            console.log('Emails sent successfully from index.ts');
        }
        catch (error) {
            console.error('Failed to send emails:', error);
        }
    });
}
