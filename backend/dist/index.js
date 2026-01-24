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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// # Run the compiled JavaScript
// node dist/index.js
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helper_1 = require("./util/helper");
const emailContent_1 = require("./context/emailContent");
const auth_1 = require("./middleware/auth");
const emailController_1 = require("./controllers/emailController");
const app = (0, express_1.default)();
// CORS configuration - allow frontend URL from environment or default to all origins in development
// const frontendUrl = process.env.FRONTEND_URL;
// const corsOptions = frontendUrl
//   ? {
//     origin: frontendUrl.includes(',')
//       ? frontendUrl.split(',').map(url => url.trim())
//       : frontendUrl.trim(),
//     credentials: true
//   }
//   : { origin: true }; // Allow all origins in development
const corsOpts = {
    origin: '*',
    methods: [
        'GET',
        'POST',
    ],
    allowedHeaders: [
        'Content-Type',
    ],
};
app.use((0, cors_1.default)(corsOpts));
app.use(express_1.default.json());
app.get('/testRoute', (req, res) => {
    console.log("Hi There");
    res.send({
        message: "Hello World"
    });
});
// Old endpoint (keep for backward compatibility)
app.post('/sendEmail', (req, res, next) => {
    const { fullName, email, companyName } = req.body;
    helper_1.helper.main(fullName, email, companyName)
        .then(response => {
        console.log("response before sending to frontend is", response, "---");
        return res.send(response);
    })
        .catch(next);
});
// Get email template
app.get('/api/email-template', (req, res, next) => {
    emailContent_1.emailContent.getEmailContentDynamic()
        .then(template => res.json(template))
        .catch(error => {
        console.error('Error getting email template:', error);
        res.status(500).json({ success: false, message: 'Failed to get email template' });
    });
});
// Protected email sending route (requires Firebase auth)
app.post('/api/send-email', (req, res, next) => {
    (0, auth_1.authenticate)(req, res, (err) => {
        if (err)
            return next(err);
        return (0, emailController_1.sendAuthenticatedEmail)(req, res, next);
    });
});
// Client-side email sending route (requires Firebase auth)
app.post('/api/send-client-email', (req, res, next) => {
    (0, auth_1.authenticate)(req, res, next);
}, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, emailController_1.sendClientSideEmail)(req, res, next);
    }
    catch (error) {
        console.error('Error sending client email:', error);
        next(error);
    }
}));
// Save email template
app.post('/api/email-template', (req, res, next) => {
    (0, auth_1.authenticate)(req, res, next);
}, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { subject, html, text } = req.body;
        if (!subject || !html || !text) {
            res.status(400).json({ success: false, message: 'Missing required fields' });
            return;
        }
        yield emailContent_1.emailContent.saveEmailContentDynamic({ subject, html, text });
        res.json({ success: true, message: 'Template saved successfully' });
    }
    catch (error) {
        console.error('Error saving email template:', error);
        res.status(500).json({ success: false, message: 'Failed to save email template' });
    }
}));
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});
