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
exports.emailContent = void 0;
const emailTemplate_1 = __importDefault(require("../models/emailTemplate"));
class EmailContent {
    getEmailContent(fullName, companyName) {
        const emailContent = {
            subject: 'Potential fit for your engineering team',
            text: `Dear ${fullName},\n\nI'm Harcharanpreet Singh, a Software Engineer at Amdocs (1.5+ YOE) with experience in backend systems, full-stack development, and AI-driven automation. I've built production-ready features, including an internal RAG-based AI system at Amdocs and a complete Jira plugin as a <strong>Founding Engineer</strong>.\n\nI'm keen to be part of an engineering team like ${companyName} and contribute to building reliable, well-designed systems. I've attached my resume for your reference and would be glad to connect if you're hiring or open to a conversation.\n\nBest regards,\nHarcharanpreet Singh\n+91-6283343351\nharcharansingh198400@gmail.com\nLinkedIn: https://www.linkedin.com/in/harcharanpreet-singh-9a245222a/`,
            html: `
        <p>Dear ${fullName},</p>
        <p>I'm <strong>Harcharanpreet Singh</strong>, a <strong>Software Engineer at Amdocs (1.5+ YOE)</strong> with experience in backend systems, full-stack development, and AI-driven automation. I've built production-ready features, including an internal RAG-based AI system at Amdocs and a complete Jira plugin as a <strong>Founding Engineer</strong>.</p>
        <p>I'm keen to be part of an engineering team like <strong>${companyName}</strong> and contribute to building reliable, well-designed systems. I've attached my resume for your reference and would be glad to connect if you're hiring or open to a conversation.</p>
        <p>Best regards,</p>
        <p style="line-height: 1.5;">
          <strong>Harcharanpreet Singh</strong><br>
          +91-6283343351<br>
          harcharansingh198400@gmail.com<br>
          <a href="https://www.linkedin.com/in/harcharanpreet-singh-9a245222a/">linkedin.com/in/harcharanpreet-singh</a><br>
        </p>
      `
        };
        return emailContent;
    }
    getEmailContentDynamic() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const defaultTemplate = yield emailTemplate_1.default.getDefaultTemplate();
                if (!defaultTemplate) {
                    throw new Error('No default template found');
                }
                return {
                    subject: defaultTemplate.subject,
                    html: defaultTemplate.html,
                    text: defaultTemplate.text
                };
            }
            catch (error) {
                console.error('Error getting email content:', error);
                throw error;
            }
        });
    }
    saveEmailContentDynamic(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const defaultTemplate = yield emailTemplate_1.default.getDefaultTemplate();
                if (defaultTemplate) {
                    // Update existing template
                    return yield emailTemplate_1.default.updateTemplate(defaultTemplate.id, Object.assign(Object.assign({}, data), { isDefault: true }));
                }
                else {
                    // Create new default template
                    return yield emailTemplate_1.default.saveTemplate(Object.assign(Object.assign({}, data), { isDefault: true }));
                }
            }
            catch (error) {
                console.error('Error saving email content:', error);
                throw error;
            }
        });
    }
}
exports.emailContent = new EmailContent();
