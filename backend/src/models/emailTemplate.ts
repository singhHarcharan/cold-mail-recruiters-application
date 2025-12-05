import fs from 'fs';
import path from 'path';

const TEMPLATE_FILE = path.join(__dirname, '../../data/emailTemplates.json');

interface EmailTemplate {
  id: string;
  subject: string;
  html: string;
  text: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

class EmailTemplateModel {
  private templates: EmailTemplate[] = [];
  private static instance: EmailTemplateModel;

  private constructor() {
    this.loadTemplates();
  }

  public static getInstance(): EmailTemplateModel {
    if (!EmailTemplateModel.instance) {
      EmailTemplateModel.instance = new EmailTemplateModel();
    }
    return EmailTemplateModel.instance;
  }

  private loadTemplates() {
    try {
      if (fs.existsSync(TEMPLATE_FILE)) {
        const data = fs.readFileSync(TEMPLATE_FILE, 'utf-8');
        this.templates = JSON.parse(data);
      } else {
        // Create directory if it doesn't exist
        const dir = path.dirname(TEMPLATE_FILE);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        
        // Create a default template
        const defaultTemplate: EmailTemplate = {
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
    } catch (error) {
      console.error('Error loading email templates:', error);
      this.templates = [];
    }
  }

  private saveTemplates() {
    try {
      const dir = path.dirname(TEMPLATE_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(TEMPLATE_FILE, JSON.stringify(this.templates, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error saving email templates:', error);
      throw new Error('Failed to save email templates');
    }
  }

  public getDefaultTemplate(): EmailTemplate | null {
    return this.templates.find(t => t.isDefault) || null;
  }

  public getTemplate(id: string): EmailTemplate | null {
    return this.templates.find(t => t.id === id) || null;
  }

  public saveTemplate(template: Omit<EmailTemplate, 'id' | 'createdAt' | 'updatedAt'>): EmailTemplate {
    const now = new Date();
    const newTemplate: EmailTemplate = {
      ...template,
      id: `tpl_${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };

    if (template.isDefault) {
      // Remove default flag from other templates
      this.templates = this.templates.map(t => ({
        ...t,
        isDefault: false
      }));
    }

    this.templates.push(newTemplate);
    this.saveTemplates();
    return newTemplate;
  }

  public updateTemplate(id: string, updates: Partial<Omit<EmailTemplate, 'id' | 'createdAt'>>): EmailTemplate | null {
    const index = this.templates.findIndex(t => t.id === id);
    if (index === -1) return null;

    const updatedTemplate = {
      ...this.templates[index],
      ...updates,
      updatedAt: new Date()
    };

    if (updates.isDefault) {
      // Remove default flag from other templates
      this.templates = this.templates.map(t => ({
        ...t,
        isDefault: t.id === id
      }));
    }

    this.templates[index] = updatedTemplate;
    this.saveTemplates();
    return updatedTemplate;
  }

  public deleteTemplate(id: string): boolean {
    const initialLength = this.templates.length;
    this.templates = this.templates.filter(t => t.id !== id);
    if (this.templates.length < initialLength) {
      this.saveTemplates();
      return true;
    }
    return false;
  }

  public listTemplates(): EmailTemplate[] {
    return [...this.templates];
  }
}

export default EmailTemplateModel.getInstance();
