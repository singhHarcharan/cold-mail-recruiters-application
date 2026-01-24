import * as nodemailer from 'nodemailer';

// Define the EmailContent interface
export interface EmailContent {
  subject?: string;
  text?: string;
  html?: string;
  attachments?: Array<{
    filename?: string;
    path: string;
    contentType?: string;
  }>;
}

// Custom error for mail sending issues
class MailSenderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MailSenderError';
  }
}

class MailSender {
  private transporter: nodemailer.Transporter;
  private senderEmail: string;
  private senderName: string;

  constructor(senderEmail: string, senderName: string) {
    if (!senderEmail || !senderName) {
      throw new MailSenderError('Sender email and name are required');
    }
    
    this.senderEmail = senderEmail;
    this.senderName = senderName;
    
    // Configure the transporter to use OAuth2
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: this.senderEmail,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: process.env.GOOGLE_ACCESS_TOKEN
      }
    });
  }

  private getPersonalizedData(
    emailContent: EmailContent, 
    receiverName: string, 
    companyName: string
  ): { personalizedText: string; personalizedHtml: string } {
    // Helper function to personalize content
    const personalize = (content: string = ''): string => {
      return content
        .replace(/\[Recipient's Name\]/g, receiverName)
        .replace(/\[Your Name\]/g, this.senderName)
        .replace(/\[Company Name\]/g, companyName);
    };

    // Personalize provided content
    const personalizedText = emailContent.text ? personalize(emailContent.text) : '';
    const personalizedHtml = emailContent.html ? personalize(emailContent.html) : '';

    return { personalizedText, personalizedHtml };
  }

  async sendOneEmail(
    toEmail: string, 
    fullName: string, 
    companyName: string, 
    emailContent: EmailContent
  ): Promise<{ success: boolean; message: string; messageId?: string }> {
    console.log(`Sending email from ${this.senderEmail} to ${toEmail}...`);
    
    // Validate inputs
    if (!toEmail || !fullName || !companyName) {
      throw new MailSenderError('Recipient email, full name, and company name are required');
    }
    
    const { personalizedText, personalizedHtml } = this.getPersonalizedData(
      emailContent,
      fullName,
      companyName
    );
    
    // If no message is there, no need to send mail
    if (!personalizedText && !personalizedHtml) {
      return { 
        success: false, 
        message: 'No message to send' 
      };
    }
    
    const mailOptions: nodemailer.SendMailOptions = {
      from: `"${this.senderName}" <${this.senderEmail}>`,
      to: toEmail,
      subject: emailContent.subject || `Message from ${this.senderName}`,
      text: personalizedText,
      html: personalizedHtml
    };
    
    // Add attachments if any
    if (emailContent.attachments?.length) {
      mailOptions.attachments = emailContent.attachments.map(attachment => ({
        filename: attachment.filename || 'attachment',
        path: attachment.path,
        contentType: attachment.contentType
      }));
    }

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log(`Email sent to ${toEmail}: ${info.messageId}`);
      return {
        success: true, 
        message: 'Email sent successfully',
        messageId: info.messageId
      };
    } catch (error) {
      console.error(`Error sending email to ${toEmail}:`, error);
      return {
        success: false, 
        message: `Failed to send email: ${(error as Error).message}`
      };
    }
  }

  async sendBulkEmails(
    users: Array<{email: string; fullName: string; companyName: string}>, 
    emailContent: EmailContent
  ): Promise<{success: boolean; message: string; failedEmails?: string[]}> {
    if (!emailContent.text && !emailContent.html) {
      return {
        success: false,
        message: 'At least one of text or html must be provided'
      };
    }
    
    if (!users.length) {
      return {
        success: false,
        message: 'No recipients provided'
      };
    }

    const results = await Promise.allSettled(
      users.map(async (user) => {
        try {
          const result = await this.sendOneEmail(
            user.email,
            user.fullName,
            user.companyName,
            emailContent
          );
          return {
            success: result.success,
            email: user.email,
            message: result.message
          };
        } catch (error) {
          console.error(`Error sending email to ${user.email}:`, error);
          return {
            success: false,
            email: user.email,
            message: (error as Error).message
          };
        }
      })
    );
    
    const failed = results
      .filter((result): result is PromiseRejectedResult => result.status === 'rejected')
      .map(result => (result.reason as any)?.email || 'unknown');
    
    const fulfilled = results
      .filter((result): result is PromiseFulfilledResult<{success: boolean; email: string; message: string}> => 
        result.status === 'fulfilled' && !result.value.success
      )
      .map(result => result.value.email);

    const allFailed = [...failed, ...fulfilled];
    
    if (allFailed.length > 0) {
      const successCount = users.length - allFailed.length;
      return {
        success: successCount > 0,
        message: `Failed to send ${allFailed.length} out of ${users.length} emails`,
        failedEmails: allFailed
      };
    }
    
    return {
      success: true,
      message: `Successfully sent ${users.length} emails`
    };
  }
}

// Export a function to create a new MailSender instance with the authenticated user's email
export const createMailSender = (userEmail: string, userName: string): MailSender => {
  return new MailSender(userEmail, userName);
};