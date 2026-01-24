// # Compile TypeScript
// npx tsc

// # Run the compiled JavaScript
// node dist/index.js

import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { helper } from './util/helper';
import { emailContent } from './context/emailContent';
import { authenticate } from './middleware/auth';
import { sendAuthenticatedEmail, sendClientSideEmail } from './controllers/emailController';

const app = express();

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
    'Authorization',
  ],
};

app.use(cors(corsOpts));
app.use(express.json());

app.get('/testRoute', (req: Request, res: Response) => {
  console.log("Hi There");
  res.send({
    message: "Hello World"
  });
});

// Old endpoint (keep for backward compatibility)
app.post('/sendEmail', (req: Request, res: Response, next: NextFunction) => {
  const { fullName, email, companyName } = req.body;
  helper.main(fullName, email, companyName)
    .then(response => {
      console.log("response before sending to frontend is", response, "---");
      return res.send(response);
    })
    .catch(next);
});

// Get email template
app.get('/api/email-template', (req: Request, res: Response, next: NextFunction) => {
  emailContent.getEmailContentDynamic()
    .then(template => res.json(template))
    .catch(error => {
      console.error('Error getting email template:', error);
      res.status(500).json({ success: false, message: 'Failed to get email template' });
    });
});

// Protected email sending route (requires Firebase auth)
app.post('/api/send-email', (req: Request, res: Response, next: NextFunction) => {
  authenticate(req, res, (err) => {
    if (err) return next(err);
    return sendAuthenticatedEmail(req, res, next);
  });
});

// Client-side email sending route (requires Firebase auth)
app.post('/api/send-client-email',
  (req: Request, res: Response, next: NextFunction) => {
    authenticate(req, res, next);
  },
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await sendClientSideEmail(req, res, next);
    } catch (error) {
      console.error('Error sending client email:', error);
      next(error);
    }
  }
);

// Save email template
app.post('/api/email-template',
  (req: Request, res: Response, next: NextFunction) => {
    authenticate(req, res, next);
  },
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { subject, html, text } = req.body as { subject: string; html: string; text: string };

      if (!subject || !html || !text) {
        res.status(400).json({ success: false, message: 'Missing required fields' });
        return;
      }

      await emailContent.saveEmailContentDynamic({ subject, html, text });
      res.json({ success: true, message: 'Template saved successfully' });
    } catch (error) {
      console.error('Error saving email template:', error);
      res.status(500).json({ success: false, message: 'Failed to save email template' });
    }
  }
);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});














