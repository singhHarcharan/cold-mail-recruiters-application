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
exports.sendClientSideEmail = exports.sendAuthenticatedEmail = void 0;
const mailSender_1 = require("../services/mailSender");
const emailContent_1 = require("../context/emailContent");
const firebase_admin_1 = __importDefault(require("../firebase-admin"));
const sendAuthenticatedEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { to, fullName, companyName } = req.body;
        const user = req.user; // This comes from our auth middleware
        if (!(user === null || user === void 0 ? void 0 : user.email)) {
            return res.status(401).json({
                success: false,
                message: 'User email not found in authentication token'
            });
        }
        if (!to || !fullName || !companyName) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: to, fullName, companyName'
            });
        }
        try {
            // Get the user's custom token to use for Firebase client-side authentication
            const customToken = yield firebase_admin_1.default.auth().createCustomToken(user.uid);
            // Return the token and other necessary data to the client
            // The client will use this to sign in and send emails
            return res.status(200).json({
                success: true,
                message: 'Ready to send email',
                data: {
                    to,
                    fullName,
                    companyName,
                    customToken,
                    from: user.email,
                    displayName: user.displayName || ((_a = user.email) === null || _a === void 0 ? void 0 : _a.split('@')[0]) || '',
                    timestamp: new Date().toISOString()
                }
            });
        }
        catch (error) {
            console.error('Error in mail sending process:', error);
            throw error; // This will be caught by the outer catch
        }
    }
    catch (error) {
        console.error('Error in sendAuthenticatedEmail:', error);
        next(error);
    }
});
exports.sendAuthenticatedEmail = sendAuthenticatedEmail;
// New endpoint for client-side email sending
const sendClientSideEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract fields from request body with proper type checking
        const { email, fullName, companyName } = req.body;
        const user = req.user; // This comes from our auth middleware
        console.log("Received data:", { email, fullName, companyName, sender: user === null || user === void 0 ? void 0 : user.email });
        if (!(user === null || user === void 0 ? void 0 : user.email)) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated'
            });
        }
        // Validate required fields
        if (!email || !fullName || !companyName) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields',
                missing: {
                    email: !email,
                    fullName: !fullName,
                    companyName: !companyName
                }
            });
        }
        try {
            // Create a mail sender instance with the authenticated user's email and name
            const mailSender = (0, mailSender_1.createMailSender)(user.email, user.displayName || user.email.split('@')[0]);
            // Get the email template
            const template = yield emailContent_1.emailContent.getEmailContentDynamic();
            // Send the email
            const result = yield mailSender.sendOneEmail(email, fullName, companyName, template);
            // Log the email sending activity
            console.log(`User ${user.email} sent an email to ${email}`);
            return res.status(200).json({
                success: result.success,
                message: result.message || 'Email sent successfully',
                data: {
                    to: email,
                    from: user.email,
                    fullName,
                    companyName,
                    timestamp: new Date().toISOString(),
                    messageId: result.messageId
                }
            });
        }
        catch (error) {
            console.error('Error in mail sending process:', error);
            throw error;
        }
    }
    catch (error) {
        console.error('Error in sendClientSideEmail:', error);
        next(error);
    }
});
exports.sendClientSideEmail = sendClientSideEmail;
