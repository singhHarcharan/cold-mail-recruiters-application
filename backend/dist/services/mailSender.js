"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.mailSender = void 0;
const nodemailer = __importStar(require("nodemailer"));
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
        this.transporter = nodemailer.createTransport({
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
            .split('Hi Recruiter').join(`Dear ${receiverName}`)
            .split('your company').join(companyName);
        // Personalize provided content or use default
        const personalizedText = emailContent.text ? personalize(emailContent.text) : '';
        const personalizedHtml = emailContent.html ? personalize(emailContent.html) : '';
        return { personalizedText, personalizedHtml };
    }
    sendOneEmail(email, fullName, companyName, emailContent) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            console.log("Sending email to recruiter...");
            // Validate inputs
            if (!email || !fullName || !companyName) {
                throw new MailSenderError('Email, full name, and company name are required');
                return { success: false, message: 'Email, full name, and company name are required' };
            }
            if (!emailContent.text && !emailContent.html) {
                throw new MailSenderError('At least one of text or html must be provided');
                return { success: false, message: 'At least one of text or html must be provided' };
            }
            const senderName = process.env.SENDER_NAME;
            const senderEmail = process.env.GMAIL_USER;
            const resumeFilePath = process.env.RESUME_FILE_PATH;
            const receiverName = fullName;
            // const { personalizedText, personalizedHtml } = this.getPersonalizedData(emailContent, receiverName, companyName, senderName);
            // If No message is there, no need to send mail.
            if (((_a = emailContent.text) === null || _a === void 0 ? void 0 : _a.length) === 0 && ((_b = emailContent.html) === null || _b === void 0 ? void 0 : _b.length) === 0)
                return { success: false, message: 'No message to send' };
            const mailOptions = {
                from: `"${senderName}" <${senderEmail}>`,
                to: email,
                subject: emailContent.subject,
                text: emailContent.text,
                html: emailContent.html,
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
                return { success: true, message: 'Email sent successfully' };
            }
            catch (error) {
                console.error(`Error sending email to ${email}:`, error);
                return { success: false, message: 'Failed to send email' };
            }
        });
    }
    // Send emails to multiple recruiters
    sendEmails(recipientEmails, emailContent) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            console.log("Sending emails to recruiters...");
            // Validate inputs
            if (!recipientEmails || recipientEmails.emails.length === 0) {
                throw new MailSenderError('No recipient emails provided');
                return { success: false, message: 'No recipient emails provided' };
            }
            if (!emailContent.text && !emailContent.html) {
                throw new MailSenderError('At least one of text or html must be provided');
                return { success: false, message: 'At least one of text or html must be provided' };
            }
            const senderName = process.env.SENDER_NAME;
            const senderEmail = process.env.GMAIL_USER;
            const resumeFilePath = process.env.RESUME_FILE_PATH;
            // Loop through recipients
            for (let i = 0; i < recipientEmails.emails.length; i++) {
                const receiver = recipientEmails.emails[i];
                const receiverName = recipientEmails.names[i] || 'Recruiter';
                const companyName = recipientEmails.companies[i] || 'your company';
                // const { personalizedText, personalizedHtml } = this.getPersonalizedData(emailContent, receiverName, companyName, senderName);
                // If No message is there, no need to send mail.
                if (((_a = emailContent.text) === null || _a === void 0 ? void 0 : _a.length) === 0 && ((_b = emailContent.html) === null || _b === void 0 ? void 0 : _b.length) === 0)
                    return { success: false, message: 'No message to send' };
                const mailOptions = {
                    from: `"${senderName}" <${senderEmail}>`,
                    to: receiver,
                    subject: emailContent.subject,
                    text: emailContent.text,
                    html: emailContent.html,
                    attachments: [
                        {
                            fileName: senderName + "_Resume",
                            path: resumeFilePath,
                        }
                    ],
                };
                try {
                    const info = yield this.transporter.sendMail(mailOptions);
                    console.log("Response after sending email  ", info);
                    console.log(`Email sent to ${receiver}: ${info.messageId}`);
                    return { success: true, message: 'Email sent successfully' };
                }
                catch (error) {
                    console.error(`Error sending email to ${receiver}:`, error);
                    return { success: false, message: 'Failed to send email' };
                }
            }
            return { success: true, message: 'Email sent successfully' };
        });
    }
}
exports.mailSender = new MailSender();
