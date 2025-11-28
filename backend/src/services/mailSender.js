"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailSender = void 0;
var nodemailer_1 = require("nodemailer");
// Custom error for mail sending issues
var MailSenderError = /** @class */ (function (_super) {
    __extends(MailSenderError, _super);
    function MailSenderError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = 'MailSenderError';
        return _this;
    }
    return MailSenderError;
}(Error));
var MailSender = /** @class */ (function () {
    function MailSender() {
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
    MailSender.prototype.getPersonalizedData = function (emailContent, receiverName, companyName, senderName) {
        // Helper function to personalize content
        var personalize = function (content) {
            return content
                .split('Hi Recruiter').join("Dear ".concat(receiverName))
                .split('your company').join(companyName);
        };
        // Personalize provided content or use default
        var personalizedText = emailContent.text ? personalize(emailContent.text) : '';
        var personalizedHtml = emailContent.html ? personalize(emailContent.html) : '';
        return { personalizedText: personalizedText, personalizedHtml: personalizedHtml };
    };
    MailSender.prototype.sendOneEmail = function (email, fullName, companyName, emailContent) {
        return __awaiter(this, void 0, void 0, function () {
            var senderName, senderEmail, resumeFilePath, receiverName, mailOptions, info, error_1;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        console.log("Sending email to recruiter...");
                        // Validate inputs
                        if (!email || !fullName || !companyName) {
                            throw new MailSenderError('Email, full name, and company name are required');
                            return [2 /*return*/, { success: false, message: 'Email, full name, and company name are required' }];
                        }
                        if (!emailContent.text && !emailContent.html) {
                            throw new MailSenderError('At least one of text or html must be provided');
                            return [2 /*return*/, { success: false, message: 'At least one of text or html must be provided' }];
                        }
                        senderName = process.env.SENDER_NAME;
                        senderEmail = process.env.GMAIL_USER;
                        resumeFilePath = process.env.RESUME_FILE_PATH;
                        receiverName = fullName;
                        // const { personalizedText, personalizedHtml } = this.getPersonalizedData(emailContent, receiverName, companyName, senderName);
                        // If No message is there, no need to send mail.
                        if (((_a = emailContent.text) === null || _a === void 0 ? void 0 : _a.length) === 0 && ((_b = emailContent.html) === null || _b === void 0 ? void 0 : _b.length) === 0)
                            return [2 /*return*/, { success: false, message: 'No message to send' }];
                        mailOptions = {
                            from: "\"".concat(senderName, "\" <").concat(senderEmail, ">"),
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
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.transporter.sendMail(mailOptions)];
                    case 2:
                        info = _c.sent();
                        console.log("Email sent to ".concat(email, ": ").concat(info.messageId));
                        return [2 /*return*/, { success: true, message: 'Email sent successfully' }];
                    case 3:
                        error_1 = _c.sent();
                        console.error("Error sending email to ".concat(email, ":"), error_1);
                        return [2 /*return*/, { success: false, message: 'Failed to send email' }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Send emails to multiple recruiters
    MailSender.prototype.sendEmails = function (recipientEmails, emailContent) {
        return __awaiter(this, void 0, void 0, function () {
            var senderName, senderEmail, resumeFilePath, i, receiver, receiverName, companyName, mailOptions, info, error_2;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        console.log("Sending emails to recruiters...");
                        // Validate inputs
                        if (!recipientEmails || recipientEmails.emails.length === 0) {
                            throw new MailSenderError('No recipient emails provided');
                            return [2 /*return*/, { success: false, message: 'No recipient emails provided' }];
                        }
                        if (!emailContent.text && !emailContent.html) {
                            throw new MailSenderError('At least one of text or html must be provided');
                            return [2 /*return*/, { success: false, message: 'At least one of text or html must be provided' }];
                        }
                        senderName = process.env.SENDER_NAME;
                        senderEmail = process.env.GMAIL_USER;
                        resumeFilePath = process.env.RESUME_FILE_PATH;
                        i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(i < recipientEmails.emails.length)) return [3 /*break*/, 6];
                        receiver = recipientEmails.emails[i];
                        receiverName = recipientEmails.names[i] || 'Recruiter';
                        companyName = recipientEmails.companies[i] || 'your company';
                        // const { personalizedText, personalizedHtml } = this.getPersonalizedData(emailContent, receiverName, companyName, senderName);
                        // If No message is there, no need to send mail.
                        if (((_a = emailContent.text) === null || _a === void 0 ? void 0 : _a.length) === 0 && ((_b = emailContent.html) === null || _b === void 0 ? void 0 : _b.length) === 0)
                            return [2 /*return*/, { success: false, message: 'No message to send' }];
                        mailOptions = {
                            from: "\"".concat(senderName, "\" <").concat(senderEmail, ">"),
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
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.transporter.sendMail(mailOptions)];
                    case 3:
                        info = _c.sent();
                        console.log("Response after sending email  ", info);
                        console.log("Email sent to ".concat(receiver, ": ").concat(info.messageId));
                        return [2 /*return*/, { success: true, message: 'Email sent successfully' }];
                    case 4:
                        error_2 = _c.sent();
                        console.error("Error sending email to ".concat(receiver, ":"), error_2);
                        return [2 /*return*/, { success: false, message: 'Failed to send email' }];
                    case 5:
                        i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/, { success: true, message: 'Email sent successfully' }];
                }
            });
        });
    };
    return MailSender;
}());
exports.mailSender = new MailSender();
