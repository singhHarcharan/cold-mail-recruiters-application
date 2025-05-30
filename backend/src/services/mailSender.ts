import nodemailer from 'nodemailer';
import { EmailContent, Users } from '../types';

// Custom error for mail sending issues
class MailSenderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MailSenderError';
  }
}

class MailSender {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Validate environment variables
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS || !process.env.SENDER_NAME) {
      throw new MailSenderError('Missing required environment variables: GMAIL_USER, GMAIL_PASS, or SENDER_NAME');
    }

    // Initialize transporter
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });
  }

  private getPersonalizedData(emailContent: EmailContent, receiverName: string, companyName: string, senderName: string) {
    // Helper function to personalize content
    const personalize = (content: string) =>
      content
        .split('Dear Recruiter').join(`Dear ${receiverName}`)
        .split('your company').join(companyName);

    // Personalize provided content or use default
    const personalizedText = emailContent.text ? personalize(emailContent.text) : '';
    const personalizedHtml = emailContent.html ? personalize(emailContent.html) : '';

    return { personalizedText, personalizedHtml };
  }

  async sendOneEmail(email: string, fullName: string, companyName: string, emailContent: EmailContent): Promise<{success: boolean, message: string}> {
    console.log("Sending email to recruiter...");
    // Validate inputs
    if (!email || !fullName || !companyName) {
      throw new MailSenderError('Email, full name, and company name are required');
      return {success: false, message: 'Email, full name, and company name are required'};
    }
    if (!emailContent.text && !emailContent.html) {
      throw new MailSenderError('At least one of text or html must be provided');
      return {success: false, message: 'At least one of text or html must be provided'};
    }
    const senderName = process.env.SENDER_NAME!;
    const senderEmail = process.env.GMAIL_USER!;
    const resumeFilePath = process.env.RESUME_FILE_PATH;
    const receiverName = fullName;
    const { personalizedText, personalizedHtml } = this.getPersonalizedData(emailContent, receiverName, companyName, senderName);
    // If No message is there, no need to send mail.
    if (personalizedText.length === 0 && personalizedHtml.length === 0) return {success: false, message: 'No message to send'};
    const mailOptions = {
      from: `"${senderName}" <${senderEmail}>`,
      to: email,
      subject: emailContent.subject,
      text: personalizedText,
      html: personalizedHtml,
      attachments: [
        {
          fileName: senderName + "_Resume",
          path: resumeFilePath,
        }
      ],
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log(`Email sent to ${email}: ${info.messageId}`);
      return {success: true, message: 'Email sent successfully'};
    } catch (error) {
      console.error(`Error sending email to ${email}:`, error);
      return {success: false, message: 'Failed to send email'};
    }
  }

  // Send emails to multiple recruiters
  async sendEmails(recipientEmails: Users, emailContent: EmailContent): Promise<{success: boolean, message: string}> {

    console.log("Sending emails to recruiters...");

    // Validate inputs
    if (!recipientEmails || recipientEmails.emails.length === 0) {
      throw new MailSenderError('No recipient emails provided');
      return {success: false, message: 'No recipient emails provided'};
    }
    if (!emailContent.text && !emailContent.html) {
      throw new MailSenderError('At least one of text or html must be provided');
      return {success: false, message: 'At least one of text or html must be provided'};
    }

    const senderName = process.env.SENDER_NAME!;
    const senderEmail = process.env.GMAIL_USER!;
    const resumeFilePath = process.env.RESUME_FILE_PATH;

    // Loop through recipients
    for (let i = 0; i < recipientEmails.emails.length; i++) {
      const receiver = recipientEmails.emails[i];
      const receiverName = recipientEmails.names[i] || 'Recruiter';
      const companyName = recipientEmails.companies[i] || 'your company';

      const { personalizedText, personalizedHtml } = this.getPersonalizedData(emailContent, receiverName, companyName, senderName);

      // If No message is there, no need to send mail.
      if (personalizedText.length === 0 && personalizedHtml.length === 0) return {success: false, message: 'No message to send'};

      const mailOptions = {
        from: `"${senderName}" <${senderEmail}>`,
        to: receiver,
        subject: emailContent.subject,
        text: personalizedText,
        html: personalizedHtml,
        attachments: [
          {
            fileName: senderName + "_Resume",
            path: resumeFilePath,
          }
        ],
      };

      try {
        const info = await this.transporter.sendMail(mailOptions);
        console.log("Response after sending email  ", info);
        console.log(`Email sent to ${receiver}: ${info.messageId}`);
        return {success: true, message: 'Email sent successfully'};
      } catch (error) {
        console.error(`Error sending email to ${receiver}:`, error);
        return {success: false, message: 'Failed to send email'};
      }
    }
    return {success: true, message: 'Email sent successfully'};
  }
}
export const mailSender = new MailSender();
