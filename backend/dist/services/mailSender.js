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
exports.createMailSender = void 0;
const nodemailer = __importStar(require("nodemailer"));
// Custom error for mail sending issues
class MailSenderError extends Error {
    constructor(message) {
        super(message);
        this.name = 'MailSenderError';
    }
}
class MailSender {
    constructor(senderEmail, senderName) {
        if (!senderEmail || !senderName) {
            throw new MailSenderError('Sender email and name are required');
        }
        this.senderEmail = senderEmail;
        this.senderName = senderName;
        // Configure the transporter to use OAuth2
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: this.senderEmail,
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
                accessToken: process.env.GOOGLE_ACCESS_TOKEN
            }
        });
    }
    getPersonalizedData(emailContent, receiverName, companyName) {
        // Helper function to personalize content
        const personalize = (content = '') => {
            return content
                .replace(/\[Recipient's Name\]/g, receiverName)
                .replace(/\[Your Name\]/g, this.senderName)
                .replace(/\[Company Name\]/g, companyName);
        };
        // Personalize provided content
        const personalizedText = emailContent.text ? personalize(emailContent.text) : '';
        const personalizedHtml = emailContent.html ? personalize(emailContent.html) : '';
        return { personalizedText, personalizedHtml };
    }
    sendOneEmail(toEmail, fullName, companyName, emailContent) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            console.log(`Sending email from ${this.senderEmail} to ${toEmail}...`);
            // Validate inputs
            if (!toEmail || !fullName || !companyName) {
                throw new MailSenderError('Recipient email, full name, and company name are required');
            }
            const { personalizedText, personalizedHtml } = this.getPersonalizedData(emailContent, fullName, companyName);
            // If no message is there, no need to send mail
            if (!personalizedText && !personalizedHtml) {
                return {
                    success: false,
                    message: 'No message to send'
                };
            }
            const mailOptions = {
                from: `"${this.senderName}" <${this.senderEmail}>`,
                to: toEmail,
                subject: emailContent.subject || `Message from ${this.senderName}`,
                text: personalizedText,
                html: personalizedHtml
            };
            // Add attachments if any
            if ((_a = emailContent.attachments) === null || _a === void 0 ? void 0 : _a.length) {
                mailOptions.attachments = emailContent.attachments.map(attachment => ({
                    filename: attachment.filename || 'attachment',
                    path: attachment.path,
                    contentType: attachment.contentType
                }));
            }
            try {
                const info = yield this.transporter.sendMail(mailOptions);
                console.log(`Email sent to ${toEmail}: ${info.messageId}`);
                return {
                    success: true,
                    message: 'Email sent successfully',
                    messageId: info.messageId
                };
            }
            catch (error) {
                console.error(`Error sending email to ${toEmail}:`, error);
                return {
                    success: false,
                    message: `Failed to send email: ${error.message}`
                };
            }
        });
    }
    sendBulkEmails(users, emailContent) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!emailContent.text && !emailContent.html) {
                return {
                    success: false,
                    message: 'At least one of text or html must be provided'
                };
            }
            if (!users.length) {
                return {
                    success: false,
                    message: 'No recipients provided'
                };
            }
            const results = yield Promise.allSettled(users.map((user) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const result = yield this.sendOneEmail(user.email, user.fullName, user.companyName, emailContent);
                    return {
                        success: result.success,
                        email: user.email,
                        message: result.message
                    };
                }
                catch (error) {
                    console.error(`Error sending email to ${user.email}:`, error);
                    return {
                        success: false,
                        email: user.email,
                        message: error.message
                    };
                }
            })));
            const failed = results
                .filter((result) => result.status === 'rejected')
                .map(result => { var _a; return ((_a = result.reason) === null || _a === void 0 ? void 0 : _a.email) || 'unknown'; });
            const fulfilled = results
                .filter((result) => result.status === 'fulfilled' && !result.value.success)
                .map(result => result.value.email);
            const allFailed = [...failed, ...fulfilled];
            if (allFailed.length > 0) {
                const successCount = users.length - allFailed.length;
                return {
                    success: successCount > 0,
                    message: `Failed to send ${allFailed.length} out of ${users.length} emails`,
                    failedEmails: allFailed
                };
            }
            return {
                success: true,
                message: `Successfully sent ${users.length} emails`
            };
        });
    }
}
// Export a function to create a new MailSender instance with the authenticated user's email
const createMailSender = (userEmail, userName) => {
    return new MailSender(userEmail, userName);
};
exports.createMailSender = createMailSender;
