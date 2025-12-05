import { Request, Response, RequestHandler } from 'express';
import emailTemplateModel from '../models/emailTemplate';

interface EmailTemplateBody {
  subject: string;
  html: string;
  text: string;
  isDefault?: boolean;
}

export const getEmailTemplate: RequestHandler = async (req, res) => {
  try {
    const defaultTemplate = emailTemplateModel.getDefaultTemplate();
    if (!defaultTemplate) {
      res.status(404).json({ message: 'No template found' });
      return;
    }
    res.json(defaultTemplate);
  } catch (error) {
    console.error('Error getting email template:', error);
    res.status(500).json({ message: 'Error retrieving email template' });
  }
  return;
};

export const saveEmailTemplate: RequestHandler = async (req, res, next) => {
  try {
    const { subject, html, text } = req.body as EmailTemplateBody;
    
    if (!subject || !html || !text) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    // Rest of the function remains the same
    const existingTemplate = emailTemplateModel.getDefaultTemplate();
    
    if (existingTemplate) {
      // Update existing template
      const updated = emailTemplateModel.updateTemplate(existingTemplate.id, {
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
    const newTemplate = emailTemplateModel.saveTemplate({
      subject,
      html,
      text,
      isDefault: true
    });

    res.status(201).json(newTemplate);
  } catch (error) {
    console.error('Error saving email template:', error);
    res.status(500).json({ message: 'Error saving email template' });
  }
};

export const resetToDefaultTemplate: RequestHandler = async (req, res) => {
  try {
    // This would reset to a system default template
    // For now, we'll just clear the custom template
    const defaultTemplate = emailTemplateModel.getDefaultTemplate();
    if (defaultTemplate) {
      emailTemplateModel.deleteTemplate(defaultTemplate.id);
    }
    
    res.json({ message: 'Template reset to default' });
  } catch (error) {
    console.error('Error resetting template:', error);
    res.status(500).json({ message: 'Error resetting template' });
  }
};
