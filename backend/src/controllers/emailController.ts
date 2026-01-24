import { Request, Response, NextFunction } from 'express';
import { createMailSender } from '../services/mailSender';
import { emailContent } from '../context/emailContent';
import admin from '../firebase-admin';

export const sendAuthenticatedEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { to, fullName, companyName } = req.body;
    const user = req.user; // This comes from our auth middleware

    if (!user?.email) {
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
      const customToken = await admin.auth().createCustomToken(user.uid);
      
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
          displayName: user.displayName || user.email?.split('@')[0] || '',
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error('Error in mail sending process:', error);
      throw error; // This will be caught by the outer catch
    }
  } catch (error) {
    console.error('Error in sendAuthenticatedEmail:', error);
    next(error);
  }
};

// New endpoint for client-side email sending
export const sendClientSideEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { to, fullName, companyName, from, displayName } = req.body;
    const user = req.user; // This comes from our auth middleware

    if (!user?.email) {
      return res.status(401).json({ 
        success: false, 
        message: 'User not authenticated' 
      });
    }

    if (!to || !fullName || !companyName || !from || !displayName) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }

    try {
      // Create a mail sender instance with the authenticated user's email and name
      const mailSender = createMailSender(from, displayName);
      
      // Get the email template
      const template = await emailContent.getEmailContentDynamic();
      
      // Send the email
      const result = await mailSender.sendOneEmail(to, fullName, companyName, template);

      // Log the email sending activity
      console.log(`User ${user.email} sent an email to ${to}`);

      return res.status(200).json({
        success: result.success,
        message: result.message,
        data: {
          to,
          from: user.email,
          timestamp: new Date().toISOString(),
          messageId: result.messageId
        }
      });
    } catch (error) {
      console.error('Error in mail sending process:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in sendClientSideEmail:', error);
    next(error);
  }
};