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
exports.MailSender = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
class MailSender {
    constructor() {
        // Initialize transporter in constructor
        this.transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER || '', // Use env variable or fallback
                pass: process.env.GMAIL_PASS || '' // Use env variable or fallback
            }
        });
    }
    getPersonalizedData(emailContent, currentName, currentCompany, senderName) {
        // Personalize email content
        let personalizedText = `Dear ${currentName},\n\nI am excited to apply for opportunities at ${currentCompany}. Please find my resume attached.\n\nBest regards,\n${senderName}`;
        if (emailContent.text) {
            personalizedText = emailContent.text
                .split('Dear Recruiter').join(`Dear ${currentName}`)
                .split('your company').join(currentCompany);
        }
        let personalizedHtml = `<p>Dear ${currentName},</p><p>I am excited to apply for opportunities at ${currentCompany}. Please find my resume attached.</p><p>Best regards,<br>${senderName}</p>`;
        if (emailContent.html) {
            personalizedHtml = emailContent.html
                .split('Dear Recruiter').join(`Dear ${currentName}`)
                .split('your company').join(currentCompany);
        }
        return { personalizedText, personalizedHtml };
    }
    // Method to send emails to multiple recruiters
    sendEmails(recipientEmails, emailContent) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validate inputs
            if (!recipientEmails || recipientEmails.emails.length === 0) {
                console.error('Error: No recipient emails provided');
                return;
            }
            if (!emailContent.text && !emailContent.html) {
                console.error('Error: At least one of text or html must be provided');
                return;
            }
            if (!process.env.GMAIL_USER) {
                console.error('Error: GMAIL_USER environment variable not set');
                return;
            }
            // Get sender name from env, with fallback
            const senderName = process.env.SENDER_NAME || '';
            const senderEmail = process.env.GMAIL_USER;
            // Loop through each email address using index
            const emails = recipientEmails.emails;
            const names = recipientEmails.names;
            const companies = recipientEmails.companies;
            for (let i = 0; i < emails.length; i++) {
                const reciever = emails[i];
                const currentName = names[i] || 'Recruiter'; // Fallback if name is undefined
                const currentCompany = companies[i] || 'your company'; // Fallback if company is undefined
                const { personalizedText, personalizedHtml } = this.getPersonalizedData(emailContent, currentName, currentCompany, senderName);
                // Define mail options for each recipient
                const mailOptions = {
                    from: `"${senderName}" <${senderEmail}>`, // Use env variables for from
                    to: reciever,
                    subject: emailContent.subject,
                    text: personalizedText,
                    html: personalizedHtml
                };
                try {
                    const info = yield this.transporter.sendMail(mailOptions);
                    console.log(`Email sent to ${reciever}: ${info.messageId}`);
                }
                catch (error) {
                    console.error(`Error sending email to ${reciever}:`, error);
                }
            }
        });
    }
}
exports.MailSender = MailSender;
