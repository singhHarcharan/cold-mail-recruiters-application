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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
// Create the transporter using Gmail SMTP
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'singhharcharanpreet81@gmail.com', // Your Gmail address
        pass: 'bcamtxddwiklkiwt' // App password (NOT your real password)
    }
});
// Function to send emails to multiple recruiters
function sendEmails(recipientEmails, emailOptions) {
    return __awaiter(this, void 0, void 0, function* () {
        // Validate inputs
        if (!recipientEmails || recipientEmails.length === 0) {
            console.error('Error: No recipient emails provided');
            return;
        }
        // Loop through each email address
        for (const email of recipientEmails) {
            // Define mail options for each recipient
            const mailOptions = {
                from: '"Harcharan Singh 👨‍💻" <singhharcharanpreet81@gmail.com>',
                to: email,
                subject: emailOptions.subject,
                text: emailOptions.text,
                // html: emailOptions.html
            };
            try {
                const info = yield transporter.sendMail(mailOptions);
                console.log(`Email sent to ${email}: ${info.messageId}`);
            }
            catch (error) {
                console.error(`Error sending email to ${email}:`, error);
            }
        }
    });
}
// Example usage
const recruiters = [
    'gurcharansinghkhalsa262@gmail.com',
    'harcharansingh198400@gmail.com' // Example email
];
const emailContent = {
    subject: 'Job Application from Harcharan Singh',
    text: 'Dear Recruiter,\n\nI am excited to apply for opportunities at your company. Please find my resume attached.\n\nBest regards,\nHarcharan Singh',
    // html: '<p>Dear Recruiter,</p><p>I am excited to apply for opportunities at your company. Please find my resume attached.</p><p>Best regards,<br>Harcharan Singh</p>'
};
function mainFunction() {
    sendEmails(recruiters, emailContent).then(() => {
        console.log('Email sending process completed');
    });
}
// Call the mainFunction
mainFunction();
