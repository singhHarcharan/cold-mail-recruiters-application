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
exports.mailSender = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
// Custom error for mail sending issues
class MailSenderError extends Error {
    constructor(message) {
        super(message);
        this.name = 'MailSenderError';
    }
}
class MailSender {
    constructor() {
        // Validate environment variables
        if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS || !process.env.SENDER_NAME) {
            throw new MailSenderError('Missing required environment variables: GMAIL_USER, GMAIL_PASS, or SENDER_NAME');
        }
        // Initialize transporter
        this.transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        });
    }
    getPersonalizedData(emailContent, receiverName, companyName, senderName) {
        // Helper function to personalize content
        const personalize = (content) => content
            .split('Dear Recruiter').join(`Dear ${receiverName}`)
            .split('your company').join(companyName);
        // Personalize provided content or use default
        const personalizedText = emailContent.text ? personalize(emailContent.text) : '';
        const personalizedHtml = emailContent.html ? personalize(emailContent.html) : '';
        return { personalizedText, personalizedHtml };
    }
    sendOneEmail(email, fullName, companyName, emailContent) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Sending email to recruiter...");
            // Validate inputs
            if (!email || !fullName || !companyName) {
                throw new MailSenderError('Email, full name, and company name are required');
            }
            if (!emailContent.text && !emailContent.html) {
                throw new MailSenderError('At least one of text or html must be provided');
            }
            const senderName = process.env.SENDER_NAME;
            const senderEmail = process.env.GMAIL_USER;
            const resumeFilePath = process.env.RESUME_FILE_PATH;
            const receiverName = fullName;
            const { personalizedText, personalizedHtml } = this.getPersonalizedData(emailContent, receiverName, companyName, senderName);
            // If No message is there, no need to send mail.
            if (personalizedText.length === 0 && personalizedHtml.length === 0)
                return;
            const mailOptions = {
                from: `"${senderName}" <${senderEmail}>`,
                to: email,
                subject: emailContent.subject,
                text: personalizedText,
                html: personalizedHtml,
                attachments: [
                    {
                        fileName: senderName + "_Resume",
                        path: resumeFilePath,
                    }
                ],
            };
            try {
                const info = yield this.transporter.sendMail(mailOptions);
                console.log(`Email sent to ${email}: ${info.messageId}`);
            }
            catch (error) {
                console.error(`Error sending email to ${email}:`, error);
            }
        });
    }
    // Send emails to multiple recruiters
    sendEmails(recipientEmails, emailContent) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Sending emails to recruiters...");
            // Validate inputs
            if (!recipientEmails || recipientEmails.emails.length === 0) {
                throw new MailSenderError('No recipient emails provided');
            }
            if (!emailContent.text && !emailContent.html) {
                throw new MailSenderError('At least one of text or html must be provided');
            }
            const senderName = process.env.SENDER_NAME;
            const senderEmail = process.env.GMAIL_USER;
            const resumeFilePath = process.env.RESUME_FILE_PATH;
            // Loop through recipients
            for (let i = 0; i < recipientEmails.emails.length; i++) {
                const receiver = recipientEmails.emails[i];
                const receiverName = recipientEmails.names[i] || 'Recruiter';
                const companyName = recipientEmails.companies[i] || 'your company';
                const { personalizedText, personalizedHtml } = this.getPersonalizedData(emailContent, receiverName, companyName, senderName);
                // If No message is there, no need to send mail.
                if (personalizedText.length === 0 && personalizedHtml.length === 0)
                    return;
                const mailOptions = {
                    from: `"${senderName}" <${senderEmail}>`,
                    to: receiver,
                    subject: emailContent.subject,
                    text: personalizedText,
                    html: personalizedHtml,
                    attachments: [
                        {
                            fileName: senderName + "_Resume",
                            path: resumeFilePath,
                        }
                    ],
                };
                try {
                    const info = yield this.transporter.sendMail(mailOptions);
                    console.log(`Email sent to ${receiver}: ${info.messageId}`);
                }
                catch (error) {
                    console.error(`Error sending email to ${receiver}:`, error);
                }
            }
        });
    }
}
exports.mailSender = new MailSender();
