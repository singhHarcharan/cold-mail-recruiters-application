// # Compile TypeScript
// npx tsc

// # Run the compiled JavaScript
// node dist/index.js

import 'dotenv/config';
const express = require('express');
const cors = require('cors');
import { Request, Response } from 'express';
import { helper } from './util/helper';
import { emailContent } from './context/emailContent';
const app = express();

// CORS configuration - allow frontend URL from environment or default to all origins in development
const frontendUrl = process.env.FRONTEND_URL;
const corsOptions = frontendUrl 
  ? { 
      origin: frontendUrl.includes(',') 
        ? frontendUrl.split(',').map(url => url.trim())
        : frontendUrl.trim(),
      credentials: true 
    }
  : { origin: true }; // Allow all origins in development

app.use(cors(corsOptions));
app.use(express.json());

app.post('/sendEmail', async (req: Request, res: Response) => {
    const { fullName, email, companyName } = req.body;
    const response: {success: boolean, message: string} = await helper.main(fullName, email, companyName);
    console.log("response before sending to frontend is", response, "---");
    return res.send(response);
});

// Get email template
app.get('/api/email-template', async (req: Request, res: Response) => {
  try {
    const template = await emailContent.getEmailContentDynamic();
    res.json(template);
  } catch (error) {
    console.error('Error getting email template:', error);
    res.status(500).json({ success: false, message: 'Failed to get email template' });
  }
});

// Save email template
app.post('/api/email-template', async (req: Request, res: Response) => {
  try {
    const { subject, html, text } = req.body;
    if (!subject || !html || !text) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    
    await emailContent.saveEmailContentDynamic({ subject, html, text });
    res.json({ success: true, message: 'Template saved successfully' });
  } catch (error) {
    console.error('Error saving email template:', error);
    res.status(500).json({ success: false, message: 'Failed to save email template' });
  }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});














