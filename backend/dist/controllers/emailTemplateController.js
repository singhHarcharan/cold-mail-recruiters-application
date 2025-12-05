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
exports.resetToDefaultTemplate = exports.saveEmailTemplate = exports.getEmailTemplate = void 0;
const emailTemplate_1 = __importDefault(require("../models/emailTemplate"));
const getEmailTemplate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const defaultTemplate = emailTemplate_1.default.getDefaultTemplate();
        if (!defaultTemplate) {
            res.status(404).json({ message: 'No template found' });
            return;
        }
        res.json(defaultTemplate);
    }
    catch (error) {
        console.error('Error getting email template:', error);
        res.status(500).json({ message: 'Error retrieving email template' });
    }
    return;
});
exports.getEmailTemplate = getEmailTemplate;
const saveEmailTemplate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { subject, html, text } = req.body;
        if (!subject || !html || !text) {
            res.status(400).json({ message: 'Missing required fields' });
            return;
        }
        // Rest of the function remains the same
        const existingTemplate = emailTemplate_1.default.getDefaultTemplate();
        if (existingTemplate) {
            // Update existing template
            const updated = emailTemplate_1.default.updateTemplate(existingTemplate.id, {
                subject,
                html,
                text,
                isDefault: true
            });
            if (!updated) {
                throw new Error('Failed to update template');
            }
            res.json(updated);
            return;
        }
        // Create new template
        const newTemplate = emailTemplate_1.default.saveTemplate({
            subject,
            html,
            text,
            isDefault: true
        });
        res.status(201).json(newTemplate);
    }
    catch (error) {
        console.error('Error saving email template:', error);
        res.status(500).json({ message: 'Error saving email template' });
    }
});
exports.saveEmailTemplate = saveEmailTemplate;
const resetToDefaultTemplate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // This would reset to a system default template
        // For now, we'll just clear the custom template
        const defaultTemplate = emailTemplate_1.default.getDefaultTemplate();
        if (defaultTemplate) {
            emailTemplate_1.default.deleteTemplate(defaultTemplate.id);
        }
        res.json({ message: 'Template reset to default' });
    }
    catch (error) {
        console.error('Error resetting template:', error);
        res.status(500).json({ message: 'Error resetting template' });
    }
});
exports.resetToDefaultTemplate = resetToDefaultTemplate;
