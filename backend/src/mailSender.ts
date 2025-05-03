import nodemailer from 'nodemailer';
import { EmailContent, Users } from './types';

// Custom error for mail sending issues
class MailSenderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MailSenderError';
  }
}

export class MailSender {
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

  private getPersonalizedData(emailContent: EmailContent, currentName: string, currentCompany: string, senderName: string) {
    // Helper function to personalize content
    const personalize = (content: string) =>
      content
        .split('Dear Recruiter').join(`Dear ${currentName}`)
        .split('your company').join(currentCompany);

    // Personalize provided content or use default
    const personalizedText = emailContent.text ? personalize(emailContent.text) : '';
    const personalizedHtml = emailContent.html ? personalize(emailContent.html) : '';

    return { personalizedText, personalizedHtml };
  }

  // Send emails to multiple recruiters
  async sendEmails(recipientEmails: Users, emailContent: EmailContent): Promise<void> {
    // Validate inputs
    if (!recipientEmails || recipientEmails.emails.length === 0) {
      throw new MailSenderError('No recipient emails provided');
    }
    if (!emailContent.text && !emailContent.html) {
      throw new MailSenderError('At least one of text or html must be provided');
    }

    const senderName = process.env.SENDER_NAME!;
    const senderEmail = process.env.GMAIL_USER!;

    // Loop through recipients
    for (let i = 0; i < recipientEmails.emails.length; i++) {
      const receiver = recipientEmails.emails[i];
      const currentName = recipientEmails.names[i] || 'Recruiter';
      const currentCompany = recipientEmails.companies[i] || 'your company';

      const { personalizedText, personalizedHtml } = this.getPersonalizedData(emailContent, currentName, currentCompany, senderName);

      // If No message is there, no need to send mail.
      if(personalizedText.length === 0 && personalizedHtml.length === 0) return ;

      const mailOptions = {
        from: `"${senderName}" <${senderEmail}>`,
        to: receiver,
        subject: emailContent.subject,
        text: personalizedText,
        html: personalizedHtml
      };

      try {
        const info = await this.transporter.sendMail(mailOptions);
        console.log(`Email sent to ${receiver}: ${info.messageId}`);
      } catch (error) {
        console.error(`Error sending email to ${receiver}:`, error);
      }
    }
  }
}
