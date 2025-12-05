"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const TEMPLATE_FILE = path_1.default.join(__dirname, '../../data/emailTemplates.json');
class EmailTemplateModel {
    constructor() {
        this.templates = [];
        this.loadTemplates();
    }
    static getInstance() {
        if (!EmailTemplateModel.instance) {
            EmailTemplateModel.instance = new EmailTemplateModel();
        }
        return EmailTemplateModel.instance;
    }
    loadTemplates() {
        try {
            if (fs_1.default.existsSync(TEMPLATE_FILE)) {
                const data = fs_1.default.readFileSync(TEMPLATE_FILE, 'utf-8');
                this.templates = JSON.parse(data);
            }
            else {
                // Create directory if it doesn't exist
                const dir = path_1.default.dirname(TEMPLATE_FILE);
                if (!fs_1.default.existsSync(dir)) {
                    fs_1.default.mkdirSync(dir, { recursive: true });
                }
                // Create a default template
                const defaultTemplate = {
                    id: 'tpl_default',
                    subject: 'Default Email Template',
                    html: '<p>Hello {fullName},</p><p>This is a default email template.</p>',
                    text: 'Hello {fullName},\n\nThis is a default email template.',
                    isDefault: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                };
                this.templates = [defaultTemplate];
                this.saveTemplates();
            }
            // Ensure there's always a default template
            if (!this.templates.some(t => t.isDefault) && this.templates.length > 0) {
                this.templates[0].isDefault = true;
                this.saveTemplates();
            }
        }
        catch (error) {
            console.error('Error loading email templates:', error);
            this.templates = [];
        }
    }
    saveTemplates() {
        try {
            const dir = path_1.default.dirname(TEMPLATE_FILE);
            if (!fs_1.default.existsSync(dir)) {
                fs_1.default.mkdirSync(dir, { recursive: true });
            }
            fs_1.default.writeFileSync(TEMPLATE_FILE, JSON.stringify(this.templates, null, 2), 'utf-8');
        }
        catch (error) {
            console.error('Error saving email templates:', error);
            throw new Error('Failed to save email templates');
        }
    }
    getDefaultTemplate() {
        return this.templates.find(t => t.isDefault) || null;
    }
    getTemplate(id) {
        return this.templates.find(t => t.id === id) || null;
    }
    saveTemplate(template) {
        const now = new Date();
        const newTemplate = Object.assign(Object.assign({}, template), { id: `tpl_${Date.now()}`, createdAt: now, updatedAt: now });
        if (template.isDefault) {
            // Remove default flag from other templates
            this.templates = this.templates.map(t => (Object.assign(Object.assign({}, t), { isDefault: false })));
        }
        this.templates.push(newTemplate);
        this.saveTemplates();
        return newTemplate;
    }
    updateTemplate(id, updates) {
        const index = this.templates.findIndex(t => t.id === id);
        if (index === -1)
            return null;
        const updatedTemplate = Object.assign(Object.assign(Object.assign({}, this.templates[index]), updates), { updatedAt: new Date() });
        if (updates.isDefault) {
            // Remove default flag from other templates
            this.templates = this.templates.map(t => (Object.assign(Object.assign({}, t), { isDefault: t.id === id })));
        }
        this.templates[index] = updatedTemplate;
        this.saveTemplates();
        return updatedTemplate;
    }
    deleteTemplate(id) {
        const initialLength = this.templates.length;
        this.templates = this.templates.filter(t => t.id !== id);
        if (this.templates.length < initialLength) {
            this.saveTemplates();
            return true;
        }
        return false;
    }
    listTemplates() {
        return [...this.templates];
    }
}
exports.default = EmailTemplateModel.getInstance();
