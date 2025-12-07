import EmailTemplateModel from "../models/emailTemplate";

class EmailContent {
  getEmailContent(fullName: string, companyName: string) {
    const emailContent = {
      subject: `Potential fit for ${companyName}'s engineering team`,
      text: `Hi ${fullName},\n\nI'm a *software engineer at Amdocs* with experience in *backend systems*, *full-stack development*, and *AI-driven automation*. I've built production-ready features, including an internal *RAG-based AI system for Teams* and a complete *Jira plugin* as a *founding engineer*.\n\nIf my experience aligns with what you're building, happy to connect briefly this week. I've attached my resume for reference.\n\n— Harcharan\n+91-6283343351\nharcharansingh198400@gmail.com\nLinkedIn: https://www.linkedin.com/in/harcharanpreet-singh-9a245222a/`,

      html: `
        <p>Hi ${fullName},</p>
        <p>I'm a <strong>software engineer at Amdocs</strong> with experience in backend systems, full-stack development, and AI-driven automation. I've built production-ready features, including an internal RAG-based AI system for Teams and a complete Jira plugin as a <strong>Founding engineer</strong>.</p>
        <p>If my experience aligns with what you're building, happy to connect briefly this week. I've attached my resume for reference.</p>
        <p style="margin-top: 20px;">— Harcharan</p>
        <p style="line-height: 1.5; margin-top: 20px;">
          +91-6283343351<br>
          harcharansingh198400@gmail.com<br>
          <a href="https://www.linkedin.com/in/harcharanpreet-singh-9a245222a/">linkedin.com/in/harcharanpreet-singh</a><br>
        </p>
      `
    };
    return emailContent;
  }
async getEmailContentDynamic() {
    try {
      const defaultTemplate = await EmailTemplateModel.getDefaultTemplate();
      if (!defaultTemplate) {
        throw new Error('No default template found');
      }
      return {
        subject: defaultTemplate.subject,
        html: defaultTemplate.html,
        text: defaultTemplate.text
      };
    } catch (error) {
      console.error('Error getting email content:', error);
      throw error;
    }
  }

  async saveEmailContentDynamic(data: { subject: string; html: string; text: string }) {
    try {
      const defaultTemplate = await EmailTemplateModel.getDefaultTemplate();
      
      if (defaultTemplate) {
        // Update existing template
        return await EmailTemplateModel.updateTemplate(defaultTemplate.id, {
          ...data,
          isDefault: true
        });
      } else {
        // Create new default template
        return await EmailTemplateModel.saveTemplate({
          ...data,
          isDefault: true
        });
      }
    } catch (error) {
      console.error('Error saving email content:', error);
      throw error;
    }
  }
}

export const emailContent = new EmailContent();